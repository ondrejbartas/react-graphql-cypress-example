import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;

const rowStyles = (post, canEdit) => canEdit(post)
  ? { cursor: 'pointer', fontWeight: 'bold' }
  : {};


const PostViewer = ({ canEdit, onEdit }) => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map(post => (
            <tr key={post.id} data-testid={`post-table-edit-${post.body}`} style={rowStyles(post, canEdit)} onClick={() => canEdit(post) && onEdit(post)}>
              <td data-testid="post-table-author">{post.author}</td>
              <td data-testid="post-table-body">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
);


PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

export default PostViewer;
