import React from 'react'
import moment from 'moment'
import ReactDisqusThread from 'react-disqus-thread'
import {RouteHandler, Link} from 'react-router'
import DocumentTitle from 'react-document-title'
import {prefixLink} from 'gatsby-helpers'
import access from 'safe-access'
import {config} from 'config'
import ReadNext from '../ReadNext'
import './style.css'
import '../../static/css/highlight.css'
import EmbeddedGist from '../EmbeddedGist'

class SitePost extends React.Component {
  render() {
    const {route} = this.props;
    const post = route.page.data;
    const home = (
      <div>
        <Link className='gohome' to={ prefixLink('/') }> All Articles
        </Link>
      </div>
    );
    const disqus = (
      <ReactDisqusThread
      shortname = { config.disqusShortname }
      identifier = { this.props.route.path }
      />
    );

    const regGists = /\(gist=(.*)\)/g,
          regBody = /\(gist=.*\)/g;

    let bodyParts = post.body.split(regBody);

    let gists = [];
    let found;
    while ( (found = regGists.exec(post.body)) !== null ) {
      gists.push(found[1]);
    }

    return (
      <div>
        { home }
        <div className='blog-single'>
          <div className='text'>
            <h1>{ post.title }</h1>
            { bodyParts.map( (part, i) => {
              return (
                <div>
                  <div dangerouslySetInnerHTML={ {__html: part} }/>
                  { gists[i] ? (
                    <EmbeddedGist gist= { gists[i] }></EmbeddedGist>
                  ) : ''}
                </div>
              );
            }) }
            <div className='date-published'>
              <em>Published { moment(post.date).format('D MMM YYYY') }</em>
            </div>
          </div>
          <div className='footer'>
            <ReadNext post={ post } {...this.props}/>
            { config.useDisqus ? disqus : ''}
            <hr/>
            <p>
              { config.siteDesc }
              <a href={ config.siteTwitterUrl }>
                <br/><strong>{ config.siteAuthor }</strong> on Twitter</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SitePost.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
};

export default SitePost