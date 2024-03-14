import React, { useState, useEffect } from "react";
import { Text } from "components";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const AutomaticTasks = () => {
    const [isMicrophoneClicked, setMicrophoneClicked] = useState(true);
    const [isRecording, setRecording] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const { projectId } = useParams();
    const [projid, setprojid] = useState("");
    const [projects, setProjects] = useState([]);
    const [assign, setAssign] = useState([]);
    const [proj, setProj] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("userid");

        fetch(`http://127.0.0.1:3000/api/v1/users/${id}/projects`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const apiProjects = data.data.projects;
                setProjects(apiProjects);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    const HandleProjChange = (e) => {
        const selectedAssigneeId = e.target.value;

        setprojid(selectedAssigneeId);

        fetch(`http://127.0.0.1:3000/api/v1/projects/${selectedAssigneeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                setAssign(data.data.project.Members);
                // handle project data if needed
            })
            .catch((error) => {
                console.error("Error fetching project details:", error);
            });

        setProj(selectedAssigneeId);
    };

    const handleSpeakNowClick = () => {
        if (!isRecording) {
            SpeechRecognition.startListening();
            setRecording(true);
        } else {
            SpeechRecognition.stopListening();
            setRecording(false);
        }
    };

    const handleGenerateTaskClick = () => {
        setLoading(true);
        fetch('http://localhost:8000/api/generate-tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_story: transcript,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const tasking = data.tasks.map(task => ({ ...task, isSelected: false }));
                setTasks(tasking);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleTaskCheckboxChange = (index) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = { ...updatedTasks[index], isSelected: !updatedTasks[index].isSelected };
            return updatedTasks;
        });
    };

    const handleConfirmClick = () => {
        const selectedTasks = tasks.filter(task => task.isSelected);

        const requestData = {
            tasks: selectedTasks.map(task => ({
                name: task.name,
                description: task.description,
                priority: task.priority,
                project: projid ? projid : projectId.toString(),
                assignee:assign[Math.floor(Math.random() * assign.length)],
            })),
        };
        console.log(requestData)
        let token = localStorage.getItem("token");
        axios
            .post("http://127.0.0.1:3000/api/v1/tasks", requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.status === 201) {
                    alert('Tasks have been confirmed and saved');
                    setTasks([]);
                    setMicrophoneClicked(true);
                } else {
                    throw new Error('Failed to save tasks');
                }
            })
            .catch(error => {
                console.error('Error saving tasks:', error);
                alert('Failed to save tasks. Please try again later.');
            });
    };

    const handleCancelClick = () => {
        setTasks([]);
        setMicrophoneClicked(true);
    }

    return (
        <div>
            {isMicrophoneClicked && (
                <animated.div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999', backgroundColor: 'white', padding: '40px', borderRadius: '20px', minWidth: '400px', maxWidth: '600px', overflow: 'auto' }}>
                    <button onClick={() => setMicrophoneClicked(false)} className="text-indigo-800 text-lg cursor-pointer absolute top-0 right-0">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="flex justify-center items-center mb-4">
                        <FontAwesomeIcon icon={faMicrophone} className="text-indigo-800 text-4xl cursor-pointer mr-2" />
                    </div>
                    <button style={{ backgroundColor: '#1F2544', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '0.375rem', marginTop: '0.5rem', marginLeft: "70px" }} onClick={handleSpeakNowClick}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    {!isRecording && transcript && (
                        <div className="text-indigo-800 mt-2" style={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                            Recorded Text: {transcript}
                        </div>
                    )}
                    {!isRecording && transcript && (
                        <button onClick={handleGenerateTaskClick} style={{ backgroundColor: '#1F2544', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '0.375rem', marginTop: '0.5rem', marginLeft: "60px" }}>
                            {isLoading ? 'Loading...' : 'Generate Task'}
                        </button>
                    )}

                    <div>
                        <h3 style={{ textAlign: "center", fontSize: "16px", margin: "20px", fontFamily: 'Poppins', color: "indigo" }}>Here is the List of Tasks Generated</h3>
                        <table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: "4px", fontFamily: 'Poppins' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Priority</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks && tasks.map((task, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{task.name}</td>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{task.priority}</td>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{task.description}</td>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>
                                            <input
                                                type="checkbox"
                                                checked={task.isSelected}
                                                onChange={() => handleTaskCheckboxChange(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {projectId === '123456' && (
                        <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                            <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Select Project</Text>
                            <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                                <select name="project" value={proj} onChange={HandleProjChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                                    <option>Select Project</option>
                                    {projects.map((member) => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <button onClick={handleCancelClick} style={{ backgroundColor: '#B80000', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '20px', marginTop: '0.5rem', marginLeft: "100px" }}>
                        Cancel
                    </button>
                    <button onClick={handleConfirmClick} style={{ backgroundColor: '#416D19', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '20px', marginTop: '0.5rem', marginLeft: "20px" }}>
                        Confirm
                    </button>
                </animated.div>
            )}
        </div>
    );
};

export default AutomaticTasks;
