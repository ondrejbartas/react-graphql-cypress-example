import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import PostViewer from './PostViewer';
import PostEditor from './PostEditor';
import { Button, Container } from 'reactstrap';

function App() {
  const [editing, setEditing] = useState(null);
  return (
    <Container fluid>
      <Button
        data-testid="post-new-button"
        className="my-2"
        color="primary"
        onClick={() => setEditing({ })}
      >
        New Post
      </Button>
      <PostViewer canEdit={() => true}
        onEdit={(post) => setEditing(post)}
      />
      {editing && (
        <PostEditor
          post={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </Container>
  );
}

export default App;
