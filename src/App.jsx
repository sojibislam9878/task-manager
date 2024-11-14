import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [allTask, setAllTask]=useState([])
  const [taskTitle, setTaskTitle]= useState("")

  useEffect(()=>{
    const storedTask = JSON.parse(localStorage.getItem("allTask")) || []
    setAllTask(storedTask)
  },[])

  const handleAddTask=()=>{
    if (taskTitle === "") {
      return alert("faka jinish colbe na")
    }
    const task={
      id:Date.now(),
      title:taskTitle,
      isDone:false,
      priority:1
    }
    const newAllTask = [...allTask, task]
    setAllTask(newAllTask)
    console.log(newAllTask);
    setTaskTitle("")
    localStorage.setItem("allTask", JSON.stringify(newAllTask))
    
  }

  const handleIsDone=(id)=>{
    console.log(id);
    const changedTask = allTask.map(singleTask=>singleTask.id ===id ? {...singleTask, isDone:!singleTask?.isDone} : singleTask)

    setAllTask(changedTask)
    localStorage.setItem("allTask", JSON.stringify(changedTask))
 }
  return (
    <div className="min-h-screen flex justify-center items-center py-6 bg-gradient-to-br from-cyan-500 to-blue-500">
      {/* body  */}
      <div className=" min-h-3/4 w-3/4 bg-white rounded-xl p-8">
        {/* title and search  */}
        <div className="flex justify-between">
          <div className="text-3xl font-semibold">To-Do List :</div>
          <div>
            <input
              type="text"
              placeholder="Search here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        {/* task add  */}
        <div className="mt-6 ">
          <div className="join w-full">
            <input
              className=" join-item outline-none border-2 border-r-0 rounded-l-full pl-3 w-full bg-gray-200"
              placeholder="Write something"
              value={taskTitle}
              onChange={(e)=>setTaskTitle(e.target.value)
              }
            />
            <button onClick={handleAddTask} className="btn join-item rounded-r-full px-8 bg-[#ff605a] text-white hover:bg-[#f34a44]">
              Add
            </button>
          </div>
        </div>
        {/* task list  */}
        <div className="mt-4">
          <ul className="p-2">
            {
              allTask?.map((singleTask, id)=>(
                <li key={id} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mt-1">
              <span onClick={()=>handleIsDone(singleTask?.id)} className={`material-symbols-outlined hover:cursor-pointer ${singleTask.isDone ? "text-green-500" : "text-red-500"}`}>
                {singleTask?.isDone? "check_circle" :"radio_button_unchecked"}
              </span>
              <span className={`text-xl font-bold capitalize ${singleTask?.isDone && "line-through"}`}>{singleTask?.title}</span> <span className="material-symbols-outlined hover:cursor-pointer text-red-600">delete</span>
            </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
