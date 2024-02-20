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
  const [assigne, setAssigne] = useState(0);
  const [projid, setprojid] = useState("");
  const [formData, setFormData] = useState({
    startDate: null,
    dueDate: null,
    priority: "", // State variable for priority
  });

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleDueDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handlePriorityChange = (e) => { // Handle changes in priority selection
    setFormData({ ...formData, priority: e.target.value });
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
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const handleInputChange = (e) => {
    const selectedAssigneeId = e.target.value;
    setAssigne(selectedAssigneeId);
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
        <div style={{ marginLeft: '45px', backgroundColor: '#EBD9B4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', padding: '39px', paddingLeft: '5px', paddingRight: '5px', borderRadius: '30px',width: '100%'}}
    >
      <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Task Name</Text>
              <div className=" text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                <input type="text" name="projectName" value={taskname} onChange={(e) => setTaskName(e.target.value)} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '1px solid #1F2544' }} />
              </div>
            </div>

            {projectId === '123456' && (
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Select Project ID</Text>
                <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                  <select name="project" value={proj} onChange={HandleProjChange} style={{ fontSize: '1rem', width: '60%', backgroundColor: 'transparent', border: 'none', borderBottom: '0.5px #1F2544', outline: 'none' }}>
                    <option>Select a Project </option>
                    {projects.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Task Assignee</Text>
              <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                <select name="assignee" value={assigne} onChange={handleInputChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                  <option>Select a task assignee</option>
                  {Array.isArray(assigne) && assigne.map((member) => (
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
                <select name="priority" value={formData.priority} onChange={handlePriorityChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#1F2544', letterSpacing: '0.44px' }} size="txtPoppinsRegular16">Start Date</Text>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginLeft: '25px', cursor: 'pointer' }} onClick={() => document.getElementById('start-date-picker')?.click()} />
                <animated.div style={fadeIn}>
                  <DatePicker id="start-date-picker" selected={formData.startDate} onChange={handleStartDateChange} />
                </animated.div>
                {formData.startDate && (
                  <Text style={{ marginLeft: '10px', color: '#1F2544' }}>{formData.startDate.toLocaleDateString()}</Text>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#1F2544', letterSpacing: '0.44px', marginRight: '250px' }} size="txtPoppinsRegular16">Due Date</Text>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '20px', cursor: 'pointer' }} onClick={() => document.getElementById('due-date-picker')?.click()} />
                <animated.div style={fadeIn}>
                  <DatePicker id="due-date-picker" selected={formData.dueDate} onChange={handleDueDateChange} />
                </animated.div>
                {formData.dueDate && (
                  <Text style={{ marginLeft: '10px', color: '#1F2544', marginRight: '250px' }}>{formData.dueDate.toLocaleDateString()}</Text>
                )}
              </div>
            </div>

            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Description</Text>
              <div style={{ borderBottom: '1px solid #1F2544', borderColor: '#1F2544', fontSize: '1rem', width: '76%', }}>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontSize: '1rem', width: '60%', backgroundColor: 'transparent', border: 'none', borderBottom: '0.5px #1F2544', outline: 'none' }} />
              </div>
            </div>
           
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon
                icon={faMicrophone}
                style={{  marginLeft: '600px', marginRight: '5px', marginTop: '50px', cursor: 'pointer', color: '#1F2544' }}
                size="3x"
                onClick={handleMicrophoneClick}
              />
              {isMicrophoneClicked && <AutomaticTasks />}
              <Button
                style={{ cursor: 'pointer', lineHeight: 'normal', minWidth: '84px', marginLeft: '100px',  marginTop: '50px', fontSize: '1rem', textAlign: 'center', letterSpacing: '0.44px'}}
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
