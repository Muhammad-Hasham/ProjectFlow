import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navigation from "pages/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Button } from "components";
import { MyDatePicker } from "components";
import { useSpring, animated } from "react-spring";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const NewTaskPage = () => {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState({ type: "", message: "" });
  const [isMicrophoneClicked, setMicrophoneClicked] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [recordedText, setRecordedText] = useState("");

  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [assign, setAssign] = useState(0);
  const [lastupdate, setLastUpdae] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [priority, setPriority] = useState("medium");

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Description for Task 1' },
    { id: 2, name: 'Task 2', description: 'Description for Task 2' },
    { id: 3, name: 'Task 3', description: 'Description for Task 3' },
    // Add more tasks as needed
  ]);

  const handleTaskCheckboxChange = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };
  const handleCreateTasks = () => {
    // Implement logic to create tasks based on selectedTasks
    // For example, you can console.log the selected tasks for now
    console.log('Selected Tasks:', selectedTasks);
    navigate('/myTasks/')

    // Reset selectedTasks and close the task list pop-up
    setSelectedTasks([]);
    setShowTaskList(false);
  };

  const [projid,setprojid]=useState()
  const [isLoading, setLoading] = useState(false);
  const [isRecordingStopped, setRecordingStopped] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
  const [convertedText, setConvertedText] = useState("");
  const [assigne, setAssigne] = useState([]);
  const { projectId } = useParams();
  useEffect(() => {
    // Fetch project details from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the project details using a GET request
    fetch(`http://127.0.0.1:3000/api/v1/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data.project.Members);
        // setProjectDetails(data);
        setAssigne(data.data.project.Members);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  // let projectname=localStorage.getItem("userid")
  // console.log(projectname)
  const handleSpeakNowClick = () => {
    if (!isRecording) {
      SpeechRecognition.startListening();
      setRecording(true);
      setRecordingStopped(false); // Reset the recording stopped state
    } else {
      SpeechRecognition.stopListening();
      setRecording(false);
      setRecordingStopped(true); // Set recording stopped state
    }
  };

  const handleMicrophoneClick = () => {
    setMicrophoneClicked(!isMicrophoneClicked);
    if (isMicrophoneClicked) {
      SpeechRecognition.stopListening();
      resetTranscript();
      setRecording(false);
    }
  };

  const handleStartDateChange = (date) => {
    // Your logic for handling start date change
  };

  const handleDueDateChange = (date) => {
    // Your logic for handling due date change
  };

  const handleInputChange = (e) => {
    const selectedAssigneeId = e.target.value;
    setAssign(selectedAssigneeId);
  };

  let formData = {
    name: taskname, // Set the initial values
    start_date: startdate,
    end_date: enddate,
    description: description,
    last_updation_date: lastupdate, // Add lastUpdationDate field
    priority: priority,
    assignee: assign,
    project:projid?projid:projectId.toString()
  };

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
  });

  const overlayAnimation = useSpring({
    opacity: isMicrophoneClicked ? 1 : 0,
    zIndex: isMicrophoneClicked ? 2 : -1,
  });

  const microphoneAnimation = useSpring({
    transform: isMicrophoneClicked
      ? "translate(-50%, -50%) scale(2)"
      : "translate(-50%, -50%) scale(1)",
      left: isMicrophoneClicked ? "88%" : "88%", // Move left when microphone is clicked
  });

  const handleCreateProject = () => {
    let token = localStorage.getItem("token");
    // Your logic for creating the project
    // You can set the popUp state based on success or failure
    axios
      .post("http://127.0.0.1:3000/api/v1/tasks", JSON.stringify(formData), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response from server:", response); // Log the response
        return response; // Try to parse response as JSON
      })
      .then((data) => {
        setPopUp({ type: "success", message: "Project Created Successfully!" });
        navigate("/mytasks");
      })
      .catch((error) => {
        setPopUp({ type: "error" });
        console.error("Project creation failed", error);
      });
  };

  let token=localStorage.getItem("token")
  const [projects, setProjects] = useState([]);
  const [proj, setProj] = useState("");
  useEffect(() => {
    const id = localStorage.getItem("userid");
    console.log("User ID from localStorage:", id);
  fetch(`http://127.0.0.1:3000/api/v1/users/${id}/projects`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const apiProjects = data.data.projects;

      // const mappedProjects = apiProjects.map((project) => ({
      //   id: project._id,
      //   title: project.name,
      //   dueDate: project.end_date,
      // }));

      setProjects(apiProjects);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
  
}, []);

const handleProcessRecording = () => {
  setLoading(true); // Set loading state to true when processing starts
  setConvertedText(transcript);

  // Simulate processing delay (replace this with your actual processing logic)
  setTimeout(() => {
    setLoading(false); // Set loading state to false when processing is complete
    setShowTaskList(true); // Show the task list pop-up
  }, 2000); // Adjust the delay time as needed
};



const HandleProjChange = (e) => {
  const selectedAssigneeId = e.target.value;

  setprojid(selectedAssigneeId)
  // Use the callback function to get the updated state value
  setProj((prevProj) => {
    console.log("Previous proj value:", prevProj);
    console.log("Selected project value:", selectedAssigneeId);

    // Fetch project details from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the project details using a GET request
    fetch(`http://127.0.0.1:3000/api/v1/projects/${selectedAssigneeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data);
        console.log("Project Members:", data.data.project.Members);
        setAssigne(data.data.project.Members);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });

    // Return the new value for proj
    return selectedAssigneeId;
  });
};




  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Sidebar */}
      <Navigation />

      <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate("/myprofile")}
        >
          My Profile
        </Text>
        <div className="flex items-center">
          <Text
            className="mt-[95px] ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800"
            size="txtPoppinsBold34"
          >
            New Task
          </Text>
          <div className="h-[54px] ml-2">
            <animated.div
              style={{
                ...microphoneAnimation,
                position: 'absolute',
                top: '30%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                onClick={handleMicrophoneClick}
                className="h-[54px] text-indigo-800 cursor-pointer"
              />
            </animated.div>
          </div>
        </div>

        <div className="ml-[45px] bg-gray-50 flex flex-col items-center justify-end mt-8 p-[39px] sm:px-5 rounded-[30px] w-full">
          <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text
                className="text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                StartDate
              </Text>
              {/* Replace MyDatePicker with your actual date picker component */}
              <MyDatePicker
                selectedDate={startdate}
                handleDateChange={(newDate) => setStartdate(newDate)}
                // Add any other props or adjustments needed for your date picker
              />
            </div>

            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text
                className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Task Name
              </Text>
              <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                <input
                  type="text"
                  name="projectName"
                  value={taskname}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                />
              </div>
            </div>


            {projectId === '123456' && (
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text
                className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Select Project ID
              </Text>
              <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                <select
                  name="project"
                  value={proj}
                  onChange={HandleProjChange}
                  className="text-base w-[76%] bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                >
                   <option>Select a Project </option>
                  {projects.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text
                className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Task Assignee
              </Text>
              <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                <select
                  name="assignee"
                  value={assign}
                  onChange={handleInputChange}
                  className="text-base w-[76%] bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                >
                  <option>Select a task assignee</option>
                  {assigne.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          

            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text
                className="text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Due Date
              </Text>
              <MyDatePicker
                selectedDate={enddate}
                handleDateChange={(newDate) => setEndDate(newDate)}
              />
            </div>

            

            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text
                className="text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Priority
              </Text>
              {/* Add your priority dropdown component here */}
              <select
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="text-base w-[76%] bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
              >
                {/* Add options for priority */}
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text
                className="text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Description
              </Text>
              <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                />
              </div>
            </div>

            <Button
              className="cursor-pointer leading-[normal] min-w-[84px] md:ml-[0] ml-[745px] mt-[63px] text-base text-center tracking-[0.44px]"
              shape="round"
              color="indigo_800"
              onClick={handleCreateProject}
            >
              Create
            </Button>
          </div>
        </div>
      </div>

      <animated.div
        style={{
          ...popUpAnimation,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: popUpAnimation.opacity.interpolate((opacity) => `translate(-50%, -50%) scale(${opacity})`),
          background: popUp.type === "success" ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <p>
          {popUp.type === "success" ? "Task Created Successfully!" : "Task Creation Failed. Please try again."}
        </p>
      </animated.div>

       <animated.div
          style={{
            ...overlayAnimation,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
          }}
        >
        {/* Microphone modal content */}
        <animated.div style={{ ...microphoneAnimation}}>
            <FontAwesomeIcon
              icon={faMicrophone}
              className="h-[54px] text-indigo-800 mb-4"
            />
            <button
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '200px',
              }}
              onClick={handleMicrophoneClick} className="text-white text-lg cursor-pointer">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button
              onClick={handleSpeakNowClick}
              className="text-white text-sm cursor-pointer bg-indigo-800 p-2 rounded-md mt-2"
              style={{
                position: 'absolute',
                bottom: '-50px',
                left: "-7px", // Adjust this value to move it to the left
                color: 'white',
                width: '70px', // Adjust the width as needed
                fontFamily: 'Poppins',
                fontSize: "14px"
              }}
            >
              {isRecording ? 'Stop' : 'Record'}
            </button>

            
            {isRecordingStopped && (
              <div style={{ position: 'absolute', bottom: '-20px', left: "100px", color: 'white' }}>
                {isLoading ? (
                  <>
                    
                   {/* Add your loading animation here */}
                    <div className="text-light" role="status">
                      <img src={ "images/loading.gif"} alt="Loading..." />
                    </div>

                  </>
                ) : (
                  <>
                    
                    <div className={`text-white mt-2 ${transcript ? '' : 'hidden'}`}
                    style={{fontFamily: 'Poppins',
                    fontSize: "12px"}}>
                      Recorded Text: {transcript}
                    </div>
                    <button
                      onClick={handleProcessRecording}
                      className="text-white text-sm cursor-pointer bg-indigo-800 p-2 rounded-md mt-2"
                      style={{fontFamily: 'Poppins',
                      fontSize: "14px"}}
                    >
                      Confirm
                    </button>
                  </>
                )}
              </div>
            )}
          </animated.div>
        </animated.div>

        {showTaskList && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              zIndex: '3',
              width: '60%', // Adjust the width as needed
              maxHeight: '80%', // Adjust the max height as needed
              overflowY: 'auto',
              fontFamily: "Poppins",
              color: "#323F73"
            }}
          >
            <h2 style={{ fontWeight: "bold" , marginBottom: '20px'}}>Task List</h2>
            {tasks.map((task) => (
              <div key={task.id} style={{ marginBottom: '20px'}}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleTaskCheckboxChange(task.id)}
                    checked={selectedTasks.includes(task.id)}
                  />
                  <span style={{ marginLeft: '8px' }}>{task.name}</span>
                </label>
                <p>{task.description}</p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <button onClick={() => setShowTaskList(false)}>Close</button>
              <button onClick={handleCreateTasks}>Create</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default NewTaskPage;
