import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import './style.css'
import '../../static/fonts/fontawesome/style.css'

class SiteLinks extends React.Component {
  render() {

    return (
      <div className='blog-social'>
        <ul>
          <li>
            <a href={ config.siteTwitterUrl }><i className='fa fa-twitter'></i></a>
          </li>
          <li>
            <a href={ config.siteGithubUrl }><i className='fa fa-github-alt'></i></a>
          </li>
          <li>
            <a href={ config.siteCodePenUrl }><i className='fa fa-codepen'></i></a>
          </li>
        </ul>
        <ul>
          <li>
            <a href={ config.siteEmailUrl }><i className='fa fa-envelope-o'></i></a>
          </li>
          <li>
            <a href={ config.siteYouTubeUrl }><i className='fa fa-youtube-play'></i></a>
          </li>
        </ul>
        <ul>
          <li>
            <a href={ prefixLink(config.siteRssUrl) }><i className='fa fa-rss'></i></a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SiteLinks