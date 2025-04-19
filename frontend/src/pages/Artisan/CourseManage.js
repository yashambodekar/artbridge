import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./../../styles/ManageCourse.css";

const ManageCourse = () => {
  const { courseId } = useParams();
  const [contentList, setContentList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [files, setFiles] = useState([]);
  const [contentName, setContentName] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const token = localStorage.getItem("token");

  // Fetch course content
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/coursecontent/public/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Failed to fetch content:", res.status);
        return;
      }

      const data = await res.json();
      setContentList(data);
    } catch (err) {
      console.error("Error fetching content", err);
    }
  }, [courseId, token]);

  // Fetch assignments
  const fetchAssignments = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${courseId}/assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error("Error fetching assignments", err);
    }
  }, [courseId, token]);

  // Fetch submissions for an assignment
  const fetchSubmissions = async (assignmentId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${assignmentId}/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error("Error fetching submissions", err);
    }
  };

  useEffect(() => {
    fetchContent();
    fetchAssignments();
  }, [fetchContent, fetchAssignments]);

  // Handle content upload
  const handleContentUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    formData.append("name", contentName);
    formData.append("description", contentDescription);

    try {
      const res = await fetch(`http://localhost:5000/api/coursecontent/${courseId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        setFiles([]);
        setContentName("");
        setContentDescription("");
        fetchContent();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Upload failed");
      }
    } catch (err) {
      console.error("Error uploading content", err);
    }
  };

  // Handle assignment upload
  const handleAssignmentUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", assignmentFile);
    formData.append("title", assignmentTitle);
    formData.append("description", assignmentDescription);
    formData.append("deadline", deadline);

    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${courseId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        setAssignmentFile(null);
        setAssignmentTitle("");
        setAssignmentDescription("");
        setDeadline("");
        fetchAssignments();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Assignment upload failed");
      }
    } catch (err) {
      console.error("Error uploading assignment", err);
    }
  };

  // Handle assignment deletion
  const handleDeleteAssignment = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;
    try {
      await fetch(`http://localhost:5000/api/assignments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAssignments();
    } catch (err) {
      console.error("Error deleting assignment", err);
    }
  };

  return (
    <div className="manage-course-container">
      <h2>Manage Course Content</h2>

      {/* Course Content Upload */}
      <form onSubmit={handleContentUpload} className="upload-form">
        <label>Content Name:</label>
        <input
          type="text"
          value={contentName}
          onChange={(e) => setContentName(e.target.value)}
          required
        />

        <label>Content Description:</label>
        <textarea
          value={contentDescription}
          onChange={(e) => setContentDescription(e.target.value)}
          required
        />

        <label>Upload Course Files (PDF, Video, Image):</label>
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <button type="submit">Upload Content</button>
      </form>

      {/* Content List */}
      <h3>Uploaded Course Content</h3>
      <ul className="file-list">
        {contentList.map((item) => (
          <li key={item._id}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            {item.files && item.files.length > 0 ? (
              item.files.map((file, index) => (
                <a
                  key={index}
                  href={`http://localhost:5000/${file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {file.split("/").pop()}
                </a>
              ))
            ) : (
              <span>No file available</span>
            )}
          </li>
        ))}
      </ul>

      {/* Assignment Upload */}
      <form onSubmit={handleAssignmentUpload} className="upload-form">
        <label>Assignment Title:</label>
        <input
          type="text"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          required
        />

        <label>Assignment Description:</label>
        <textarea
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
        />

        <label>Deadline:</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <label>Upload Assignment File:</label>
        <input type="file" onChange={(e) => setAssignmentFile(e.target.files[0])} required />
        <button type="submit">Upload Assignment</button>
      </form>

      {/* Assignment List */}
      <h3>Uploaded Assignments</h3>
      <ul className="file-list">
        {assignments.map((assign) => (
          <li key={assign._id}>
            <h4>{assign.title}</h4>
            <p>{assign.description}</p>
            <p>Deadline: {new Date(assign.deadline).toLocaleString()}</p>
            <a href={`http://localhost:5000/${assign.file}`} target="_blank" rel="noreferrer">
              {assign.file.split("/").pop()}
            </a>
            <button onClick={() => handleDeleteAssignment(assign._id)}>Delete</button>
            <button onClick={() => fetchSubmissions(assign._id)}>View Submissions</button>
          </li>
        ))}
      </ul>

      {/* Submissions List */}
      {submissions.length > 0 && (
        <div>
          <h3>Submissions</h3>
          <ul className="file-list">
            {submissions.map((submission) => (
              <li key={submission._id}>
                <p>Submitted by: {submission.consumer.name} ({submission.consumer.email})</p>
                <a href={`http://localhost:5000/${submission.file}`} target="_blank" rel="noreferrer">
                  {submission.file.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageCourse;