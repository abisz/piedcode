import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import './style.css'
import '../../static/fonts/fontawesome/style.css'

const SiteLinks = () => (
  <div className='blog-social'>
    <ul>
      <li>
        <a href={config.siteTwitterUrl} aria-label="Link to Twitter">
          <i className="fa fa-twitter" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={config.siteGithubUrl} aria-label="Link to Github">
          <i className="fa fa-github-alt" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={config.siteCodePenUrl} aria-label="Link to CodePen">
          <i className="fa fa-codepen" aria-hidden="true"/>
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a href={config.siteEmailUrl} aria-label="Email Link">
          <i className="fa fa-envelope-o" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={config.siteYouTubeUrl} aria-label="Link to Youtube">
          <i className="fa fa-youtube-play" aria-hidden="true" />
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a href={prefixLink(config.siteRssUrl)} aria-label="Link to RSS Feed">
          <i className="fa fa-rss" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </div>
);

export default SiteLinks