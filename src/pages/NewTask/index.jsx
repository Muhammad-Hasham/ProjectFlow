import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Button } from "components";
import { useSpring, animated } from "react-spring";
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import Navigation from "pages/Sidebar";
import AutomaticTasks from "./automatictasks";

const NewTaskPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [popUp, setPopUp] = useState({ type: "", message: "" });
  const [isMicrophoneClicked, setMicrophoneClicked] = useState(false);
  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
<<<<<<< HEAD
  const [assigne, setAssigne] = useState([]);
  const [preDependency, setPreDependency] = useState(null);
  const [userStoryDescription, setuserStoryDescription] = useState("");
=======
  const [assigne, setAssigne] = useState(0);
  const [preDependency, setPreDependency] = useState("");
  const [postDependency, setPostDependency] = useState("");
>>>>>>> 9d8213563c76f1f836992a9d4b2f81093121618e
  const [projid, setprojid] = useState("");
  const [assign, setAssign] = useState(0);
  const [tasks,setTasks]=useState([]);

  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");

  const [priority, setPriority] = useState("");
  // const [formData, setFormData] = useState({
  //   name:"",
  //   start_date: null,
  //   end_date: null,
  //   priority: "", // State variable for priority
  // });


  // // const handlePriorityChange = (e) => { // Handle changes in priority selection
  // //   setFormData({ ...formData, priority: e.target.value });
  // // };

  let formData = {
    name: taskname, // Set the initial values
    start_date: startdate,
    end_date: enddate,
    description: description, // Add lastUpdationDate field
    priority: priority,
    assignee: assign,
    pre_dependency:preDependency,
    project:projid?projid:projectId.toString()
  };

  const handleMicrophoneClick = () => {
    setMicrophoneClicked(true);
  };

  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  // Fetch project details from the API based on projectId
  useEffect(() => {
    const token = localStorage.getItem("token");

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
        setAssigne(data.data.project.Members);
        setTasks(data.data.project.tasks);
        console.log(data.data.project.tasks)
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const handleInputChange = (e) => {
    const selectedAssigneeId = e.target.value;
    setAssign(selectedAssigneeId);
  };

  const handleCreateProject = () => {
    let token = localStorage.getItem("token");

    axios
      .post("http://127.0.0.1:3000/api/v1/tasks", JSON.stringify(formData), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPopUp({ type: "success", message: "Project Created Successfully!" });
        navigate("/mytasks");
      })
      .catch((error) => {
        setPopUp({ type: "error" });
        console.error("Project creation failed", error);
      });
  };

  let token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [proj, setProj] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userid");

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
        setProjects(apiProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const HandleProjChange = (e) => {
    const selectedAssigneeId = e.target.value;

    setprojid(selectedAssigneeId)

    setProj((prevProj) => {
      const token = localStorage.getItem("token");

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
          setAssigne(data.data.project.Members);
          setTasks(data.data.project.tasks);
        console.log(data.data.project.tasks)
        })
        .catch((error) => {
          console.error("Error fetching project details:", error);
        });

      return selectedAssigneeId;
    });
  };



  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Navigation />
      <div style={{ width: '73%', padding: '20px', marginLeft: '300px' }}>
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate("/myprofile")}
        >
          My Profile
        </Text>
        <Text
          style={{ 
            marginLeft: '50px',
            fontSize: '3xl', // Adjust this value as needed for different screen sizes
            '@media (min-width: 640px)': {
              fontSize: '3xl'
            },
            '@media (min-width: 768px)': {
              fontSize: '3px'
            },
            fontSize: '34px',
            textAlign: 'left',
            color: '#1F2544',
            display: 'flex',
            alignItems: 'center',
            marginTop: '70px',
            }}
          size="txtPoppinsBold34"
        >
          New Task
        </Text>
        <div style={{ marginLeft: '45px', backgroundColor: '#EBD9B4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', padding: '39px', paddingLeft: '5px', paddingRight: '5px', borderRadius: '30px', width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Task Name</Text>
              <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                <input type="text" name="projectName" value={taskname} onChange={(e) => setTaskName(e.target.value)} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '1px solid #1F2544' }} />
              </div>
            </div>
  
            {projectId === '123456' && (
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Select Project</Text>
                <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                  <select name="project" value={proj} onChange={HandleProjChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                    <option>Select a Project</option>
                    {projects.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
  
<<<<<<< HEAD
=======
  
>>>>>>> 9d8213563c76f1f836992a9d4b2f81093121618e
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Task Assignee</Text>
              <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                <select name="assignee" value={assign} onChange={handleInputChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                  <option>Select a task assignee</option>
                  {assigne.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Priority</Text>
              <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                <select name="priority"  value={priority}
                onChange={(e) => setPriority(e.target.value)} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full" style={{ display: 'flex', justifyContent: 'space-between' }}>
  {/* Pre Dependency Dropdown */}
  <div className="dropdown" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Pre Dependency:</Text>
      <select id="pre-dependency" value={preDependency} onChange={(e) => setPreDependency(e.target.value)} style={{ marginLeft: '95px', fontSize: '1rem', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
        <option value="">Select pre-dependency</option>
        {tasks.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
      </select>
    </div>
  </div>
  
</div>

<div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[90%] md:w-full">
  {/* Start Date */}
  <div className="dropdown" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Start Date:</Text>
      <FontAwesomeIcon icon={faCalendarAlt} style={{ marginLeft: '15px', cursor: 'pointer', fontSize: '20px' }} onClick={() => document.getElementById('start-date-picker')?.click()} />
      <animated.div style={{ marginLeft: '100px', color: '#1F2544', fadeIn }}>
        {/* Assuming DatePicker directly passes the selected date to onChange */}
        <DatePicker id="start-date-picker" selected={startdate} onChange={(date) => setStartdate(date)} />
      </animated.div>
    </div>
  </div>
  {/* Due Date */}
  <div className="dropdown" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Due Date:</Text>
      <FontAwesomeIcon icon={faCalendarAlt} style={{ marginLeft: '15px', cursor: 'pointer', fontSize: '20px' }} onClick={() => document.getElementById('due-date-picker')?.click()} />
      <animated.div style={{ marginLeft: '100px', color: '#1F2544', fadeIn }}>
        {/* Assuming DatePicker directly passes the selected date to onChange */}
        <DatePicker id="due-date-picker" selected={enddate} onChange={(date) => setEndDate(date)} />
      </animated.div>
    </div>
  </div>
</div>


            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Task Description</Text>
              <div style={{ borderBottom: '1px solid #1F2544', borderColor: '#1F2544', fontSize: '1rem', width: '76%' }}>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontSize: '1rem', width: '60%', backgroundColor: 'transparent', border: 'none', borderBottom: '0.5px #1F2544', outline: 'none' }} />
              </div>
            </div>
  
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon
                icon={faMicrophone}
                style={{ marginLeft: '600px', marginRight: '5px', marginTop: '50px', cursor: 'pointer', color: '#1F2544' }}
                size="3x"
                onClick={handleMicrophoneClick}
              />
              {isMicrophoneClicked && <AutomaticTasks />}
              <Button
                style={{ cursor: 'pointer', lineHeight: 'normal', minWidth: '84px', marginLeft: '100px', marginTop: '50px', fontSize: '1rem', textAlign: 'center', letterSpacing: '0.44px' }}
                shape="round"
                color="indigo_800"
                onClick={handleCreateProject}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default NewTaskPage;
