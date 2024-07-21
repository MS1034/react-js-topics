import { useEffect, useState } from "react";
import "./App.css";
import AppTable from "./components/AppTable.jsx";
import { TopicAPI } from "./api/TopicAPI.js";
import { ErrorBoundary } from "react-error-boundary";
import AppFilter from "./components/AppFilter.jsx";
import toast, { Toaster } from "react-hot-toast";
import { ToggleVisibility } from "./utils/TopicHelper.js";
import TopicForm from "./components/TopicForm.jsx";

function App() {
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [topicCheckboxes, setTopicCheckboxes] = useState({});
  const [editedTopic, setEditedTopic] = useState({});
  const [editingStatus, setEditingStatus] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const masterSelectionChange = (value) => setTopicCheckboxes(value);
  const editingStatusChange = (value) => {
    setEditingStatus(value);
    handleShow();
    $(".modal-backdrop.fade.show").remove();
    $("#topic-form-modal").modal("toggle");
  };
  const editedTopicChange = (value) => {
    setEditedTopic(value);
    editingStatusChange(true);
  };

  const handleVisibilityChange = (isVisible) => {
    setVisibility(isVisible);
  };

  const handleVisibilityButtonClick = async (visibility) => {
    const successfullyUpdatedIds = [];
    const errors = [];
    let flag = false;
    try {
      for (const id in topicCheckboxes) {
        if (topicCheckboxes[id] === true) {
          try {
            flag = true;
            const res = await TopicAPI.updateVisibility(id, visibility);
            successfullyUpdatedIds.push(id);
          } catch (error) {
            toast.error(`Error updating visibility for id ${id}:`, error);
            errors.push(id);
          }
        }
      }
      if (!flag) toast.error("Invalid action. No topic selected");
      else {
        let arr = [...data];
        successfullyUpdatedIds.forEach((id) => {
          const obj = arr.find((obj) => obj.id == id);
          obj.is_visible = false;
          delete topicCheckboxes[id];
        });
        setData(arr);
        toast.success(`Visibility updated sucessfully`);
      }
      console.log("Successfully updated IDs:", successfullyUpdatedIds);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const res = await TopicAPI.delete(id);
      console.log(res);
      let arr = data.filter((item) => {
        console.log(item.id);
        return item.id !== id;
      });
      delete topicCheckboxes[id];
      console.log(arr);
      setData(arr);
      toast.success(`Topic "${res[0].title}" deleted.`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleAddTopic = async (topicData) => {
    try {
      const res = await TopicAPI.create(topicData);
      const topic = ToggleVisibility(res, true);
      let arr = [...data];
      arr.push(topic[0]);
      topicCheckboxes[topic[0].id] = false;
      setData(arr);
      handleClose();
      toast.success("topic added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const handleUpdateTopic = async (id, topicData) => {
    try {
      const res = await TopicAPI.update(id, topicData);
      const topic = ToggleVisibility(res, true);
      let arr = [...data];
      let index = data.findIndex((element) => element.id == id);
      arr[index] = topic[0];
      setData(arr);
      handleClose();
      toast.success("topic update successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await TopicAPI.get(visibility);
        setData(ToggleVisibility(res, true));
        const newCheckboxes = {};
        res.forEach((item) => (newCheckboxes[item.id] = false));
        setTopicCheckboxes(newCheckboxes);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchData();
  }, [visibility]);

  function ErrorHandler({ error }) {
    return (
      <div role="alert">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return (
    <>
      <h1 className=" yusei-magic mb-4"> JavaScript: The Hard Part</h1>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <AppFilter
          onVisibilityChange={handleVisibilityChange}
          handleHideButtonClick={handleVisibilityButtonClick}
        />
        <AppTable
          data={data}
          topicCheckboxes={topicCheckboxes}
          masterSelectionChange={masterSelectionChange}
          handleDeleteButtonClick={handleDeleteButtonClick}
          editedTopicChange={editedTopicChange}
          editingStatusChange={editingStatusChange}
        />
        <Toaster position="bottom-right" />
        {/* {editingStatus ? (
          <TopicForm
            topic={editedTopic}
            onSubmit={handleUpdateTopic}
            isEditing={true}
          />
        ) : (
        )} */}
        <TopicForm
          topic={editedTopic}
          onSubmit={editingStatus ? handleUpdateTopic : handleAddTopic}
          isEditing={editingStatus}
          handleClose={handleClose}
          show={show}
        />
      </ErrorBoundary>
    </>
  );
}

export default App;
