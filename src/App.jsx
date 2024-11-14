import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [allTask, setAllTask] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("allTask")) || [];
    setAllTask(storedTask);
  }, []);

  const handleAddTask = () => {
    if (taskTitle === "") {
      return toast.error("Please Write Something", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    const task = {
      id: Date.now(),
      title: taskTitle,
      isDone: false,
      priority: 1,
    };
    const newAllTask = [...allTask, task];
    setAllTask(newAllTask);
    setTaskTitle("");
    localStorage.setItem("allTask", JSON.stringify(newAllTask));
    toast.success("Task Added!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleIsDone = (id) => {
    const changedTask = allTask.map((singleTask) =>
      singleTask.id === id
        ? { ...singleTask, isDone: !singleTask?.isDone }
        : singleTask
    );

    setAllTask(changedTask);
    localStorage.setItem("allTask", JSON.stringify(changedTask));
  };

  const handleTaskDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const taskAfterDeleted = allTask.filter(
          (singleTask) => singleTask.id !== id
        );

        setAllTask(taskAfterDeleted);
        localStorage.setItem("allTask", JSON.stringify(taskAfterDeleted));
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    const reorderedTasks = Array.from(allTask);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setAllTask(reorderedTasks);
    localStorage.setItem("allTask", JSON.stringify(reorderedTasks));
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-6 bg-gradient-to-br from-cyan-500 to-blue-500">
      {/* body  */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className=" min-h-3/4 w-3/4 xl:w-3/6 bg-white rounded-xl p-8">
          {/* title and search  */}
          <div className="md:flex justify-between">
            <div className="md:text-3xl text-xl font-bold">To-Do List :</div>
            <div>
              <input
                type="text"
                placeholder="Search here"
                className="input input-bordered w-full max-w-xs mt-2 md:mt-0"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          {/* task add  */}
          <div className="md:mt-6  mt-2">
            <div className="md:join w-full">
              <input
                className=" join-item outline-none border-2 border-r-0 md:rounded-l-full rounded-lg py-3 md:py-0 pl-3 w-full bg-gray-200"
                placeholder="Write something"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <button
                onClick={handleAddTask}
                className="btn join-item md:rounded-r-full md:px-8 bg-[#ff605a] text-white hover:bg-[#f34a44] w-full md:w-auto"
              >
                Add
              </button>
            </div>
          </div>
          {/* task list  */}
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="p-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {allTask
                  .filter((singleTask) =>
                    singleTask.title
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((singleTask, index) => (
                    <Draggable
                      key={singleTask.id}
                      draggableId={String(singleTask.id)}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="flex justify-between gap-3 items-center p-2 bg-gray-100 rounded-lg mt-1"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span className="flex w-full flex-1 md:flex-grow-0 md:w-auto">
                            <span
                              onClick={() => handleIsDone(singleTask.id)}
                              className={`material-symbols-outlined hover:cursor-pointer ${
                                singleTask.isDone
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {singleTask.isDone
                                ? "check_circle"
                                : "radio_button_unchecked"}
                            </span>
                            <span
                              onClick={() => handleTaskDelete(singleTask.id)}
                              className="material-symbols-outlined hover:cursor-pointer text-red-600  md:hidden"
                            >
                              delete
                            </span>
                          </span>
                          <span
                            className={`text-xl  md:font-bold font-semibold capitalize truncate overflow-hidden ${
                              singleTask.isDone && "line-through"
                            }`}
                          >
                            {singleTask.title}
                          </span>
                          <span
                            onClick={() => handleTaskDelete(singleTask.id)}
                            className="material-symbols-outlined hover:cursor-pointer text-red-600 hidden md:flex"
                          >
                            delete
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <ToastContainer />
    </div>
  );
}

export default App;
