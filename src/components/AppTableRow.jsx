import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { durationStr } from "../utils/TimeHelper";

function AppTableRow({ topic, isChecked, onCheckboxChange, onDelete, onEdit }) {
  const handleDeleteClick = (event) => {
    onDelete(topic.id);
  };
  return (
    <tr
      key={topic.id}
      id={topic.id}
      className={topic.is_visible ? "" : "hidden"}
    >
      <td>
        <input
          type="checkbox"
          className="cb-visibility ml-4"
          checked={isChecked}
          onChange={() => {
            onCheckboxChange(topic.id);
          }}
        />
        <label className="ml-1  ">{topic.title}</label>
      </td>
      <td> {durationStr(topic.time)}</td>
      <td>
        <a href={topic.link} className="ubuntu">
          {topic.link}
        </a>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-lg btn-outline-primary ml-2"
          data-toggle="modal"
          data-target="#topic-form-modal"
          onClick={() => onEdit(topic)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          type="button"
          className="btn btn-lg btn-outline-danger"
          onClick={handleDeleteClick}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

export default AppTableRow;
