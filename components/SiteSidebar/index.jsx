import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import SiteNav from '../SiteNav'
import SiteLinks from '../SiteLinks'
import './style.css'
import profilePic from '../../pages/photo.jpg'

class SiteSidebar extends React.Component {
  render() {
    const { location } = this.props;
    const isHome = location.pathname === prefixLink('/');

    const pictureSrc = config.useGravatar ?
      'https://s.gravatar.com/avatar/' + config.gravatarHash + '?s=300' :
      prefixLink(profilePic);

    const homeLink = <Link className="homeLink" to={ prefixLink('/') }>{config.siteAuthor}</Link>;

    let header = (
      <header>
        <Link style={ {    textDecoration: 'none',    borderBottom: 'none',    outline: 'none'} } to={ prefixLink('/') }>
          <img src={pictureSrc} alt="Picture of the author" width='75' height='75'/>
        </Link>

        { isHome ? <h1>{homeLink}</h1> : <h2>{homeLink}</h2> }

        <p>{config.siteDesc}</p>
      </header>
    );

    return (
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className='blog-details'>
            <header>
              { header }
            </header>
          </div>
          <div className='blog-options'>
            <SiteNav {...this.props}/>
            <footer>
              <SiteLinks {...this.props}/>
              <p className='bottom-line'>
                powered by
                <a target="_blank" href="https://github.com/gatsbyjs/gatsby">
                  gatsby
                </a>
                - feel free to
                <a target="_blank" href="https://github.com/abisz/piedcode">
                  fork
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

SiteSidebar.propTypes = {
  location: React.PropTypes.object,
};

export default SiteSidebar