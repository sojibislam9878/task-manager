function App() {
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
            />
            <button className="btn join-item rounded-r-full px-8 bg-[#ff605a] text-white hover:bg-[#f34a44]">
              Add
            </button>
          </div>
        </div>
        {/* task list  */}
        <div className="mt-4">
          <ul className="p-2">
            <li className="flex justify-between">
              <span class="material-symbols-outlined hover:cursor-pointer">
                radio_button_unchecked
              </span>
              hello <span class="material-symbols-outlined hover:cursor-pointer">delete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
