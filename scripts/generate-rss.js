/*
Big kudos to https://github.com/scottnonnenberg/blog
 */

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const frontMatter = require('front-matter');
const markdownIt = require('markdown-it');
const moment = require('moment');
const toml = require('toml');
const Feed = require('feed');

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: false,
});

const postsPath = path.join(__dirname, '../pages/articles/');
const postDirs = fs.readdirSync(postsPath);

const posts = _.chain(postDirs)
  .sortBy()
  .reverse()
  .map(dir => {
    const dirPath = path.join(postsPath, dir),
          filename = fs.readdirSync(dirPath).filter(file => /.md$/.test(file))[0],
          filePath = path.join(dirPath, filename),
          contents = fs.readFileSync(filePath).toString(),
          metaData = frontMatter(contents);

    return {
      path: filePath,
      contents,
      body: md.render(metaData.body),
      data: metaData.attributes
    }
  })
  .value();

const configPath = path.join(__dirname, '../config.toml');
const config = toml.parse(fs.readFileSync(configPath).toString());

const author = {
  name: config.siteAuthor,
  email: config.siteAuthorEmail,
  link: config.siteAuthorUrl
};

const now = moment(new Date());

const feed = new Feed({
  title: config.siteTitle,
  id: `${config.siteDomain}/`,
  description: config.siteDesc,
  link: config.siteDomain,
  copyright: `All rights reserved ${now.format('YYYY')}, ${config.siteAuthor}`,
  updated: now.toJSON(),
  feed: `${config.domain}/atom.xml`,
  author
});

_.forEach(posts, post => {

  const data = post.data;
  const url = config.siteDomain + data.path;
  const desc = data.description + ` <a href="${url}">Read more&nbsp;»</a>`;

  feed.addItem({
    title: data.title,
    link: url,
    description: desc,
    content: fixLocalLinks(post.body, config.siteDomain),
    date: new Date(data.date),
    author: [author],
  });
});


try{
  fs.statSync('public')
} catch (e) {
  fs.mkdirSync('public');
}

fs.writeFileSync('public/rss.xml', feed.render('rss-2.0'));
fs.writeFileSync('public/atom.xml', feed.render('atom-1.0'));

// again kudos to https://github.com/scottnonnenberg/blog/blob/master/src/util/fixLocalLinks.js
function fixLocalLinks(html, domain) {
  if (!html) {
    return html;
  }

  const linkR = /href="(\/[^"]*)"/g;
  return html.replace(linkR, (match, link) => `href="${domain + link}"`);
}
