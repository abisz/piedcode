import React from 'react';
import DocumentTitle from 'react-document-title';
import { config } from 'config';
import SitePost from '../components/SitePost';
import SitePage from '../components/SitePage';

class MarkdownWrapper extends React.Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;
    const layout = post.layout;

    const template = layout !== 'page' ?
      <SitePost {...this.props} /> :
      <SitePage {...this.props} />;

    return (
      <DocumentTitle title={`${post.title} - ${config.siteTitle}`}>
        <div>
          {template}
        </div>
      </DocumentTitle>
    );
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
};

export default MarkdownWrapper;
