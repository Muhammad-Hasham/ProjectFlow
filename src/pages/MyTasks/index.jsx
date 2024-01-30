import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from 'components';
import Navigation from 'pages/Sidebar';
import { FaCheck } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskDetailsPopup from './taskdetails';

import axios from 'axios';

const MyTasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [popUp, setPopUp] = useState({ type: '', message: '' });

  useEffect(() => {
    let token = localStorage.getItem('token');
    const id = localStorage.getItem('userid');

    if (localStorage.getItem('role') === 'Team Member') {
      axios
        .get('http://127.0.0.1:3000/api/v1/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setTasks(response.data.data.tasks);
          setPopUp({ type: 'success', message: 'Tasks loaded successfully!' });
        })
        .catch((error) => {
          setPopUp({ type: 'error' });
          console.error('Error loading tasks:', error);
        });
    } else if (localStorage.getItem('role') === 'Project Manager') {
      axios
        .get(`http://127.0.0.1:3000/api/v1/users/${id}/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setTasks(response.data.data.tasks);
          setPopUp({ type: 'success', message: 'Tasks loaded successfully!' });
        })
        .catch((error) => {
          setPopUp({ type: 'error' });
          console.error('Error loading tasks:', error);
        });
    }
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red-700_01';
      case 'Medium':
        return 'deep_orange-500_01';
      case 'Normal':
        return 'green-A700_01';
      default:
        return 'gray-900';
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };

  const markTaskAsComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    setTasks(updatedTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedItem] = updatedTasks.splice(result.source.index, 1);

    let newStatus;
    switch (result.destination.droppableId) {
      case 'dueTasks':
        newStatus = 'todo';
        break;
      case 'completedTasks':
        newStatus = 'completed';
        break;
      case 'overdueTasks':
        newStatus = 'overdue';
        break;
      default:
        newStatus = 'todo';
    }

    const updatedTaskWithStatus = { ...reorderedItem, status: newStatus };
    updatedTasks.splice(result.destination.index, 0, updatedTaskWithStatus);

    setTasks(updatedTasks);

    const taskId = reorderedItem.id;
    const token = localStorage.getItem('token');

    axios
      .patch(
        `http://127.0.0.1:3000/api/v1/tasks/${taskId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(`Task ${taskId} status updated successfully:`, response.data);
      })
      .catch((error) => {
        console.error(`Error updating task ${taskId} status:`, error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Navigation />

      <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate('/myprofile')}
        >
          My Profile
        </Text>
        <Text
          className="mt-[95px] ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800"
          size="txtPoppinsBold34"
        >
          My Tasks
        </Text>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              margin: '20px 50px',
            }}
          >
            {/* Due Tasks */}
            <Droppable droppableId="dueTasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'white',
                    padding: 10,
                    width: 250,
                    marginBottom: '40px',
                  }}
                >
                  <Text style={{ marginBottom: '20px' }} className="text-base text-indigo-800" size="txtPoppinsBold16">
                    Due
                  </Text>
                  {tasks
                    .filter((task) => task.status === 'todo')
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={`due-${task.id}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: '#FFC436',
                              color: '#323F73',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Text style={{ color: '#323F73', fontFamily: 'Poppins', fontWeight: 'bold' }}>{task.name}</Text>
                            <Text style={{ color: '#6B7280' }}>Due Date: {task.end_date.substring(0, 10)}</Text>
                            <Text style={{ color: `#${getPriorityColor(task.priority)}` }}>Priority: {task.priority}</Text>
                            <FaCheck onClick={() => markTaskAsComplete(task.id)} size={20} color={`#323F73`} />
                            {hoveredTask && hoveredTask.id === task.id && (
                              <div>
                                <Text>Description: {task.description}</Text>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Completed Tasks */}
            <Droppable droppableId="completedTasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'white',
                    padding: 10,
                    width: 250,
                    marginLeft: '20px',
                    marginBottom: '20px',
                  }}
                >
                  <Text style={{ marginBottom: '20px' }} className="text-base text-indigo-800" size="txtPoppinsBold16">
                    Completed
                  </Text>
                  {tasks
                    .filter((task) => task.status === 'completed')
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={`completed-${task.id}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: '#82CD47',
                              color: '#323F73',
                              border: '1px solid #6c906c',
                              borderRadius: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Text style={{ color: '#323F73', fontFamily: 'Poppins', fontWeight: 'bold' }}>{task.name}</Text>
                            <Text style={{ color: '#6B7280' }}>Due Date: {task.end_date}</Text>
                            <Text style={{ color: `#${getPriorityColor(task.priority)}` }}>Priority: {task.priority}</Text>
                            <FaCheck size={20} color={`#${getPriorityColor(task.priority)}`} />
                            {hoveredTask && hoveredTask.id === task.id && (
                              <div>
                                <Text>Description: {task.description}</Text>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Overdue Tasks */}
            <Droppable droppableId="overdueTasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'white',
                    padding: 10,
                    width: 250,
                    marginLeft: '20px',
                    marginBottom: '20px',
                  }}
                >
                  <Text style={{ marginBottom: '20px' }} className="text-base text-indigo-800" size="txtPoppinsBold16">
                    Overdue
                  </Text>
                  {tasks
                    .filter((task) => task.status === 'overdue')
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={`overdue-${task.id}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: '#E74646',
                              color: '#ffffff',
                              border: '1px solid #ff1a1a',
                              borderRadius: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Text style={{ color: '#323F73', fontFamily: 'Poppins', fontWeight: 'bold' }}>{task.name}</Text>
                            <Text style={{ color: '#6B7280' }}>Due Date: {task.dueDate}</Text>
                            <Text style={{ color: `#${getPriorityColor(task.priority)}` }}>Priority: {task.priority}</Text>
                            <FaCheck size={20} color={`#323F73`} onClick={() => markTaskAsComplete(task.id)} />
                            {hoveredTask && hoveredTask.id === task.id && (
                              <div>
                                <Text>Description: {task.description}</Text>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        {selectedTask && <TaskDetailsPopup task={selectedTask} onClose={handleClosePopup} />}
      </div>
    </div>
  );
};

export default MyTasksPage;
