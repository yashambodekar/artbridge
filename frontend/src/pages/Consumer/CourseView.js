import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../../styles/CourseView.css";
import axios from "axios";

const CourseView = () => {
  const { courseId } = useParams();
  const [contentList, setContentList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course content
        const contentRes = await axios.get(`https://artisans-bridge.onrender.com/api/coursecontent/public/${courseId}`);
        setContentList(contentRes.data);

        // Fetch assignments
        const assignmentsRes = await axios.get(`https://artisans-bridge.onrender.com/api/assignments/${courseId}/assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(assignmentsRes.data);
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };

    fetchCourseData();
  }, [courseId, token]);

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!selectedAssignment || !submissionFile) {
      alert("Please select an assignment and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", submissionFile);

    try {
      await axios.post(`https://artisans-bridge.onrender.com/api/submissions/submit/${selectedAssignment}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Assignment submitted successfully!");
      setSubmissionFile(null);
      setSelectedAssignment(null);
    } catch (err) {
      console.error("Error submitting assignment:", err);
      alert("Failed to submit assignment.");
    }
  };

  return (
    <div className="course-view-container">
      <h1>Course Content</h1>
      <ul>
        {contentList.map((content) => (
          <li key={content._id}>
            <h3>{content.name}</h3>
            <p>{content.description}</p>
            {content.files.map((file, index) => (
              <a key={index} href={`https://artisans-bridge.onrender.com/${file}`} target="_blank" rel="noreferrer">
                {file.split("/").pop()}
              </a>
            ))}
          </li>
        ))}
      </ul>

      <h1>Assignments</h1>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>Deadline: {new Date(assignment.deadline).toLocaleString()}</p>
            <a href={`https://artisans-bridge.onrender.com/${assignment.file}`} target="_blank" rel="noreferrer">
              {assignment.file.split("/").pop()}
            </a>
            <button onClick={() => setSelectedAssignment(assignment._id)}>Submit Assignment</button>
          </li>
        ))}
      </ul>

      {selectedAssignment && (
        <form onSubmit={handleSubmitAssignment}>
          <h3>Submit Assignment</h3>
          <input type="file" onChange={(e) => setSubmissionFile(e.target.files[0])} required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CourseView;
