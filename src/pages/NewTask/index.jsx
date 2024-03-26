import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Button } from "components";
import { useSpring, animated } from "react-spring";
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import Navigation from "pages/Sidebar";
import AutomaticTasks from "./automatictasks";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField, MenuItem, FormControl, InputLabel, Select, Grid } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const NewTaskPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [popUp, setPopUp] = useState({ type: "", message: "" });
  const [isMicrophoneClicked, setMicrophoneClicked] = useState(false);
  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assigne, setAssigne] = useState([]);
  const [preDependency, setPreDependency] = useState(null);
  const [projid, setprojid] = useState("");
  const [assign, setAssign] = useState(0);
  const [tasks,setTasks]=useState([]);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");

  const [priority, setPriority] = useState("");
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
        <div style={{ marginLeft: '45px', backgroundColor: '#F7F1E5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', padding: '39px', paddingLeft: '5px', paddingRight: '5px', borderRadius: '30px', width: '100%' , boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
          <div className="flex flex-col items-start justify-start mt-[-15px] w-[95%] md:w-full">
          <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mt-[34px] w-[97%] md:w-full">
            <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Task Name</Text>
            <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
              <TextField 
                style={{ fontSize: '1rem', width: '100%', color: '#1F2544', backgroundColor: 'transparent', border: 'none'}}
                value={taskname}
                onChange={(e) => setTaskName(e.target.value)}
                margin="normal"
              />
            </div>
          </div>


          <FormControl fullWidth margin="normal">
  <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
    <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Select Project</Text>
    <div className="text-base w-[76%]" style={{ position: 'relative' }}>
      <Select name="project" value={proj} onChange={HandleProjChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent',  padding: '6px 3px', borderRadius: '50'}}>
        <option>Select a Project</option>
        {projects.map((member) => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </Select>
    </div>
  </div>
</FormControl>

<FormControl fullWidth margin="normal">
  <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
    <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Task Assignee</Text>
    <div className="text-base w-[76%]" style={{ position: 'relative' }}>
      <Select name="assignee" value={assign} onChange={handleInputChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent'}}>
        <option>Select a task assignee</option>
        {assigne.map((member) => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </Select>
    </div>
  </div>
</FormControl>

<FormControl fullWidth margin="normal">
  <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
    <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Priority</Text>
    <div className="text-base w-[76%]" style={{ position: 'relative' }}>
      <Select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent'}}>
        <option value="">Select priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>
    </div>
  </div>
</FormControl>

<FormControl fullWidth margin="normal">
  <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full" >
    {/* Pre Dependency Dropdown */}
    <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Pre Dependency:</Text>
    <div style={{ width: '76%', position: 'relative' }}>
      <Select id="pre-dependency" value={preDependency} onChange={(e) => setPreDependency(e.target.value)} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent' }}>
        <option value="">Select pre-dependency</option>
        {tasks.map((member) => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </Select>
    </div>
  </div>
</FormControl>



<div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[90%] md:w-full">
  {/* Start Date */}
  <div className="dropdown" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Start Date:</Text>
      <animated.div style={{ marginLeft: '150px', color: '#1F2544', fadeIn }}>
        {/* Assuming DatePicker directly passes the selected date to onChange */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker id="start-date-picker" selected={startdate} onChange={(date) => setStartdate(date)} />
        </LocalizationProvider>
      </animated.div>
    </div>
  </div>
  {/* Due Date */}
  <div className="dropdown" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ color: '#1F2544', letterSpacing: '0.44px' , marginLeft: '50px'}} size="txtPoppinsRegular16">Due Date:</Text>
      <animated.div style={{ marginLeft: '100px', color: '#1F2544', fadeIn }}>
        {/* Assuming DatePicker directly passes the selected date to onChange */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker id="due-date-picker" selected={enddate} onChange={(date) => setEndDate(date)} />
        </LocalizationProvider>
      </animated.div>
    </div>
  </div>
</div>


            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Task Description</Text>
              <div style={{ borderColor: '#1F2544', fontSize: '1rem', width: '76%' }}>
                <TextField name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontSize: '1rem', width: '100%' }} />
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