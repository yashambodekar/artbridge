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
  
  // New state for UI control
  const [activeTab, setActiveTab] = useState("content");
  const [showContentForm, setShowContentForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [viewingSubmissions, setViewingSubmissions] = useState(null);

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
      setViewingSubmissions(assignmentId);
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
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
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
        setShowContentForm(false);
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
        setShowAssignmentForm(false);
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
      if (viewingSubmissions === id) {
        setViewingSubmissions(null);
        setSubmissions([]);
      }
    } catch (err) {
      console.error("Error deleting assignment", err);
    }
  };


  // Handle Content Deletion
  const handleDeleteContent = async (id) => {
    if (!window.confirm("Delete this content?")) return;
    try {
      await fetch(`http://localhost:5000/api/coursecontent/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContent();
    } catch (err) {
      console.error("Error deleting content", err);
    }
  }

  return (
    <div className="manage-container">
      <div className="breadcrumb">
        <span onClick={() => window.history.back()}>Courses</span> &gt; Manage Course
      </div>
      
      {/* Navigation Bar */}
      <div className="course-navbar">
        <div 
          className={`nav-item ${activeTab === "content" ? "active" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          Course Content
        </div>
        <div 
          className={`nav-item ${activeTab === "assignments" ? "active" : ""}`}
          onClick={() => setActiveTab("assignments")}
        >
          Assignments
        </div>
      </div>

      {/* Course Content Section */}
      {activeTab === "content" && (
        <div className="content-section">
          <div className="section-header">
            <h2>Course Content</h2>
            <button 
              className="action-btn"
              onClick={() => setShowContentForm(!showContentForm)}
            >
              {showContentForm ? "Cancel" : "Upload New Content"}
            </button>
          </div>

          {/* Content Upload Form */}
          {showContentForm && (
            <div className="form-container">
              <h3>Upload New Content</h3>
              <form onSubmit={handleContentUpload} className="manage-form">
                <div className="form-group">
                  <label>Content Name:</label>
                  <input
                    type="text"
                    value={contentName}
                    onChange={(e) => setContentName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Content Description:</label>
                  <textarea
                    value={contentDescription}
                    onChange={(e) => setContentDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Upload Course Files (PDF, Video, Image):</label>
                  <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
                </div>
                
                <button type="submit">Upload Content</button>
              </form>
            </div>
          )}

          {/* Content List */}
          <div className="list-container">
            {contentList.length === 0 ? (
              <p className="empty-message">No content uploaded yet.</p>
            ) : (
              <ul className="content-list">
                {contentList.map((item) => (
                  <li key={item._id} className="content-item">
                    <div className="content-header">
                      <h4>{item.name}</h4>
                      <button 
                          className="delete-btn"
                          onClick={() => handleDeleteContent(item._id)}
                        >
                          Delete
                          </button>
                    </div>
                    <p className="content-description">{item.description}</p>
                    <div className="content-files">
                      {item.files && item.files.length > 0 ? (
                        item.files.map((file, index) => (
                          <a
                            key={index}
                            href={`http://localhost:5000/${file}`}
                            target="_blank"
                            rel="noreferrer"
                            className="file-link"
                          >
                            {file.split("/").pop()}
                          </a>
                        ))
                      ) : (
                        <span className="no-file">No file available</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Assignments Section */}
      {activeTab === "assignments" && (
        <div className="assignments-section">
          <div className="section-header">
            <h2>Assignments</h2>
            <button 
              className="action-btn"
              onClick={() => setShowAssignmentForm(!showAssignmentForm)}
            >
              {showAssignmentForm ? "Cancel" : "Create New Assignment"}
            </button>
          </div>

          {/* Assignment Upload Form */}
          {showAssignmentForm && (
            <div className="form-container">
              <h3>Create New Assignment</h3>
              <form onSubmit={handleAssignmentUpload} className="manage-form">
                <div className="form-group">
                  <label>Assignment Title:</label>
                  <input
                    type="text"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Assignment Description:</label>
                  <textarea
                    value={assignmentDescription}
                    onChange={(e) => setAssignmentDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Deadline:</label>
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Upload Assignment File:</label>
                  <input 
                    type="file" 
                    onChange={(e) => setAssignmentFile(e.target.files[0])} 
                    required 
                  />
                </div>
                
                <button type="submit">Upload Assignment</button>
              </form>
            </div>
          )}

          {/* Assignment List */}
          <div className="list-container">
            {assignments.length === 0 ? (
              <p className="empty-message">No assignments created yet.</p>
            ) : (
              <ul className="assignment-list">
                {assignments.map((assign) => (
                  <li key={assign._id} className="assignment-item">
                    <div className="assignment-header">
                      <h4>{assign.title}</h4>
                      <div className="assignment-actions">
                        <button 
                          className="view-btn"
                          onClick={() => {
                            if (viewingSubmissions === assign._id) {
                              setViewingSubmissions(null);
                              setSubmissions([]);
                            } else {
                              fetchSubmissions(assign._id);
                            }
                          }}
                        >
                          {viewingSubmissions === assign._id ? "Hide Submissions" : "View Submissions"}
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteAssignment(assign._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="assignment-description">{assign.description}</p>
                    <p className="assignment-deadline">
                      <strong>Deadline:</strong> {new Date(assign.deadline).toLocaleString()}
                    </p>
                    <a 
                      href={`http://localhost:5000/${assign.file}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="file-link"
                    >
                      {assign.file.split("/").pop()}
                    </a>
                    
                    {/* Submissions for this assignment */}
                    {viewingSubmissions === assign._id && (
                      <div className="submissions-container">
                        <h5>Submissions</h5>
                        {submissions.length === 0 ? (
                          <p className="empty-message">No submissions yet.</p>
                        ) : (
                          <table className="submissions-table">
                            <thead>
                              <tr>
                                <th>Student</th>
                                <th>Email</th>
                                <th>File</th>
                              </tr>
                            </thead>
                            <tbody>
                              {submissions.map((submission) => (
                                <tr key={submission._id}>
                                  <td>{submission.consumer.name}</td>
                                  <td>{submission.consumer.email}</td>
                                  <td>
                                    <a 
                                      href={`http://localhost:5000/${submission.file}`} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="file-link"
                                    >
                                      {submission.file.split("/").pop()}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <button onClick={() => window.history.back()} className="back-btn">
        ← Back to Courses
      </button>
    </div>
  );
};

export default ManageCourse;