const fs = require('fs');

if ( ! process.argv[2] ) {
  console.log('No name passed!');
  process.exit();
}

const name = process.argv[2],
  formatted = name.toLowerCase().replace(/\s/g, '-'),
  date = (new Date()).toISOString().slice(0, 10),
  path = __dirname + '/../pages/articles/' + date + '-' + formatted + '/',
  content =  `---
title: "${name}"
date: "${(new Date).toISOString()}"
layout: post
path: "/${formatted}/"
category: ""
description: ""
readNext: ""
hide: false
---`;

fs.mkdirSync(path);

fs.writeFileSync(path + 'index.md', content);





