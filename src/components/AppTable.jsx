import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppTableRow from "./AppTableRow";
import AppSkeletonRows from "./AppSkeletonTable";
import { TopicAPI } from "../api/TopicAPI";

function AppTable({
  data,
  loading,
  error,
  masterSelectionChange,
  topicCheckboxes,
  handleDeleteButtonClick,
  editedTopicChange,
  editingStatusChange,
  masterStatus,
}) {
  const [isMasterChecked, setIsMasterChecked] = useState(false);

  useEffect(() => {
    if (Object.keys(topicCheckboxes).length <= 0) {
      setIsMasterChecked(false);
    } else {
      const allChecked = Object.values(topicCheckboxes).every((value) => value);
      setIsMasterChecked(allChecked);
    }
  }, [topicCheckboxes]);

  useEffect(() => {
    setIsMasterChecked(false);
  }, [masterStatus]);

  const handleMasterCheckboxChange = () => {
    setIsMasterChecked(!isMasterChecked);
    const newCheckboxes = {};
    Object.keys(topicCheckboxes).forEach((topicId) => {
      newCheckboxes[topicId] = !isMasterChecked;
    });
    masterSelectionChange(newCheckboxes);
  };

  const handleCheckboxChange = (topicId) => {
    const newCheckboxes = { ...topicCheckboxes };
    newCheckboxes[topicId] = !newCheckboxes[topicId];
    masterSelectionChange(newCheckboxes);
  };

  return (
    <>
      <div>
        <button
          className="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#topic-form-modal"
          onClick={() => editingStatusChange(false)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add
        </button>
      </div>

      <table
        id="js-table"
        className={
          loading ? "table  table-striped skeleton-table w-100" : "table"
        }
      >
        <caption className="">
          Course Content
          <p className="">
            List of all js topics that are needed to be covered in order to
            master JS.{" "}
          </p>
        </caption>
        <thead className="thead-ligth">
          <tr id="js-table-header">
            <th className=" py-3 ">
              <input
                className="ml-4"
                type="checkbox"
                id="select-all-cb"
                checked={isMasterChecked}
                onChange={handleMasterCheckboxChange}
              />
              <label htmlFor="select-all-cb" className="ml-1">
                Title
              </label>
            </th>
            <th className="py-3 ">Duration</th>
            <th className="py-3 ">Link</th>
            <th className="py-3 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <AppSkeletonRows />
          ) : (
            <>
              {error ? (
                <tr>
                  <td colSpan={4}>
                    <div className="alert alert-danger" role="alert">
                      Failed to fetch topics. Please try again later.
                    </div>
                  </td>
                </tr>
              ) : (
                data &&
                data.map((topic) => (
                  <AppTableRow
                    key={topic.id}
                    topic={topic}
                    isChecked={topicCheckboxes[topic.id] || false}
                    onCheckboxChange={handleCheckboxChange}
                    onDelete={handleDeleteButtonClick}
                    onEdit={editedTopicChange}
                  />
                ))
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}

export default AppTable;
