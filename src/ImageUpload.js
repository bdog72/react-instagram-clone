//
//
import React, { useState } from 'react';
import { Button } from '@material-ui/core';

function ImageUpload() {
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState('');
  const [caption, setCaption] = useState('');

  const handleChange = () => {};
  const handleUpload = () => {};

  return (
    <div>
      <input
        type='text'
        placeholder='Enter A Caption'
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type='file' onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
