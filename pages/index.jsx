import React from 'react'
import {Link} from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import {prefixLink} from 'gatsby-helpers'
import access from 'safe-access'
import {config} from 'config'
import SiteSidebar from '../components/SiteSidebar'

class SiteIndex extends React.Component {
  render() {
    const pageLinks = [];
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')).reverse();
    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post') {
        const title = access(page, 'data.title') || page.path;
        const description = access(page, 'data.description');
        const datePublished = access(page, 'data.date');
        const category = access(page, 'data.category');

        if ( ! access(page, 'data.hide') ) {
          pageLinks.push(
            <div className='blog-post'>
              <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                { moment(datePublished).format('MMMM YYYY') }
              </time>
              <span style={ {padding: '5px'} }></span>
              <span className='blog-category'>{ category }</span>
              <h2><Link style={ {borderBottom: 'none',} } to={ prefixLink(page.path) }> { title } </Link></h2>
              <p dangerouslySetInnerHTML={ {__html: description} }/>
              <Link className='readmore' to={ prefixLink(page.path) }> Read
              </Link>
            </div>
          )
        }
      }
    });

    return (
      <DocumentTitle title={ config.siteTitle }>
        <div>
          <div className="skipContainer" style={{ textAlign: 'center' }}>
            <a href="#main" className="skipLink" style={{ fontSize: '0.5em' }}>Skip to main content</a>
          </div>
          <SiteSidebar {...this.props}/>
          <div className='content'>
            <div className='main' id="main">
              <div className='main-inner'>
                { pageLinks }
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

SiteIndex.propTypes = {
  route: React.PropTypes.object,
};

export default SiteIndex