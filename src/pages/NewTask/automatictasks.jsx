import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate, useParams } from "react-router-dom";

const AutomaticTasks = () => {
    const [isMicrophoneClicked, setMicrophoneClicked] = useState(true);
    const [isRecording, setRecording] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(false); // Add loading state
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

    const handleGenerateTaskClick = () => {
        setLoading(true); // Set loading to true when fetching data
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
                const tasking = data.tasks;
                setTasks(tasking);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when data fetching is done
            });
    };

    const handleConfirmClick = () => {
        alert('Tasks have been confirmed');
    }

    const handleCancelClick = () => {
        setTasks([]); // Clear tasks array
        setMicrophoneClicked(true); // Close the animated div
    }

    return (
        <div>
            {/* Microphone Modal */}
            {isMicrophoneClicked && (
                <animated.div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999', backgroundColor: 'white', padding: '40px', borderRadius: '20px', minWidth: '400px', maxWidth: '600px', overflow: 'auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
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

                    {/* Display the list of tasks */}
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
                                            <input type="checkbox" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

          <button onClick={handleCancelClick} style={{ backgroundColor: '#B80000', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '20px', marginTop: '0.5rem', marginLeft: "100px" }}>
            Cancel
          </button>
          <button onClick={handleConfirmClick} style={{ backgroundColor: '#416D19', color: '#FFFFFF', fontSize: '1.25rem', padding: '0.5rem 1rem', borderRadius: '20px', marginTop: '0.5rem', marginLeft: "20px" }}>
            Confirm
          </button>
        </animated.div>
      )}

      <animated.div
        style={{
            ...popUpAnimation,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: popUpAnimation.opacity.interpolate((opacity) => `translate(-50%, -50%) scale(${opacity})`),
          background: popUp.type === 'success' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <p>
          {popUp.type === 'success' ? 'Tasks Created Successfully!' : 'Tasks Creation Failed. Please try again.'}
        </p>
      </animated.div>
    </div>
  );
};

export default AutomaticTasks;
