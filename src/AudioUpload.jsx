import React, { useState } from "react";
import axios from "axios";

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(res.data);
    } catch (err) {
      setError("Error uploading file: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Upload and Analyze Audio</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Analysis Results</h3>
          <p><strong>Transcription:</strong> {response.transcription}</p>
          <p><strong>Fluency Score:</strong> {response.fluency_score}%</p>
          <p><strong>Pronunciation Score:</strong> {response.pronunciation_score}%</p>
          <p><strong>Unclear Words:</strong> {response.unclear_words.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUpload
