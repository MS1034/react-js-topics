import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function TopicForm({ topic, onSubmit, isEditing, show, handleClose }) {
  const initialFormData = {
    title: "",
    time: "",
    link: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: topic.title || "",
        time: topic.time || "",
        link: topic.link || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [topic, isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) onSubmit(topic.id, formData);
    else onSubmit(formData);
  };
  return (
    <Modal show={show} onHide={handleClose} className="poppins">
      <Modal.Header>
        <Modal.Title>
          {isEditing ? "Editing Topic" : "Adding Topic"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="topic-form">
          <div className="form-group">
            <label htmlFor="topic-title" className="col-form-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="topic-title"
              value={formData.title}
              onChange={handleChange}
              minLength="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="topic-time" className="col-form-label">
              Duration in minutes:
            </label>
            <input
              type="number"
              name="time"
              className="form-control"
              id="topic-time"
              value={formData.time}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="topic-link" className="col-form-label">
              Link:
            </label>
            <input
              type="url"
              name="link"
              pattern="http[s]?://.*"
              className="form-control ubuntu"
              id="topic-link"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopicForm;
