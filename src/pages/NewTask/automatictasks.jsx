import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'react-datepicker/dist/react-datepicker.css';

const AutomaticTasks = () => {
    const [isMicrophoneClicked, setMicrophoneClicked] = useState(true);
    const [isRecording, setRecording] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { transcript, resetTranscript } = useSpeechRecognition();

    const handleSpeakNowClick = () => {
        if (!isRecording) {
            SpeechRecognition.startListening();
            setRecording(true);
        } else {
            SpeechRecognition.stopListening();
            setRecording(false);
        }
    };

    const handleMicrophoneClick = () => {
        setMicrophoneClicked(true);
        if (!isRecording) {
            handleSpeakNowClick();
        }
    };

    const handleConfirmClick = () => {
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
                // Log the response data to the console
                console.log('Response data:', data);
    
                const tasks = (data).tasks;

                // Accessing name, priority, and description for each task
                tasks.forEach(task => {
                    console.log("Name:", task.name);
                    console.log("Priority:", task.priority);
                    console.log("Description:", task.description);
                    console.log("-----------------------------");
                });

            })

            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            {/* Microphone Modal */}
            <animated.div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999', backgroundColor: 'white', padding: '40px', borderRadius: '20px', minWidth: '300px' }}>
                <button onClick={() => setMicrophoneClicked(false)} className="text-indigo-800 text-lg cursor-pointer absolute top-0 right-0">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="flex justify-center items-center mb-4">
                    <FontAwesomeIcon icon={faMicrophone} className="text-indigo-800 text-4xl cursor-pointer mr-2" />
                </div>
                <button  style={{ backgroundColor: '#1F2544', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '0.375rem', marginTop: '0.5rem' , marginLeft: "25px"}} onClick={handleSpeakNowClick}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                {!isRecording && transcript && (
                    <div className="text-indigo-800 mt-2" style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                        Recorded Text: {transcript}
                    </div>
                )}
                {!isRecording && transcript && (
                    <button onClick={handleConfirmClick} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                        Generate Task
                    </button>
                )}

                {/* Display the list of tasks */}
                <div>
                    <h3>List of Tasks</h3>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
            </animated.div>
        </div>
    );
};

export default AutomaticTasks;
