import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import PostViewer from './PostViewer';
import PostEditor from './PostEditor';
import { Button, Container } from 'reactstrap';

const downloadTextFile = (data, fileName, contentType) => {
  // eslint-disable-next-line no-undef
  const blob = new Blob([data], { type: contentType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
};

function App() {
  const [editing, setEditing] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const inputListener = (el) => el && el.addEventListener('change', (e) => {
    const { name, size, type }= e.target.files[0]
    setSelectedFile({ name, size, type })
    if (type.startsWith('image')) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setSelectedFile({ name, size, type, image: e.target.result});
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  })

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

      <Button
        data-testid="download-file-button"
        className="my-2 ml-2 mr-2"
        color="secondary"
        onClick={() => downloadTextFile('Foo Bar\nBaf\n', 'sample.txt', 'text/plain')}
      >
        Download File
      </Button>
      <a href="https://www.google.com" data-testid="go-to-google">Go to google</a>
      <PostViewer canEdit={() => true}
        onEdit={(post) => setEditing(post)}
      />
      {editing && (
        <PostEditor
          post={editing}
          onClose={() => setEditing(null)}
        />
      )}

      <input type="file" name="file_upload" ref={inputListener} />
      {selectedFile && <div data-testid="selected-file">{selectedFile.name}, {selectedFile.size}, {selectedFile.type} {selectedFile.image && <img src={selectedFile.image} alt={selectedFile.name} />}</div>}
    </Container>
  );
}

export default App;
