import React, { useState } from 'react';
import { Client, Databases } from 'appwrite';

const UpdateDocumentForm = () => {
  const client = new Client();
  const database = new Databases(client);

  // Replace with your Appwrite endpoint and project ID
  client.setEndpoint('https://YOUR_APPWRITE_ENDPOINT').setProject('YOUR_PROJECT_ID');

  const [documentId, setDocumentId] = useState('');
  const [data, setData] = useState({ name: '', age: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await database.updateDocument(
        'YOUR_DATABASE_ID',  // Replace with your database ID
        'YOUR_COLLECTION_ID', // Replace with your collection ID
        documentId,
        data
      );
      setMessage('Document updated successfully!');
      console.log(response);
    } catch (error) {
      setMessage('Error updating document: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Update Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Document ID:
            <input
              type="text"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Update Document</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateDocumentForm;
