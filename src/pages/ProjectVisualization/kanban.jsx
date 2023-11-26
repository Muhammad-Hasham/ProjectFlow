import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Text, Button, Img } from 'components'; // Assuming Img is imported from 'components'
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom
import Navigation from 'pages/Sidebar';

const KanbanComponent = ({ handleCategoryChange, handleNavigate, handleDeletionProject, loading, successPopupAnimation, statisticsData, pieChartSize, hovered, pieChartData }) => {
  const navigate = useNavigate(); // Assuming you are using react-router-dom
  const [tasks, setTasks] = useState({
    todo: [
      { id: '1', content: 'Task 1' },
      { id: '2', content: 'Task 2' },
    ],
    inProgress: [
      { id: '3', content: 'Task 3' },
    ],
    done: [
      { id: '4', content: 'Task 4' },
    ],
  });

  const [newCategory, setNewCategory] = useState('');
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list
    if (!destination) {
      return;
    }

    // If dropped in the same list and position hasn't changed
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a copy of the tasks object
    const newTasks = { ...tasks };

    // If dropped in a new category
    if (!newTasks[destination.droppableId]) {
      newTasks[destination.droppableId] = [];
    }

    // Remove the task from the source column
    const sourceTasks = [...newTasks[source.droppableId]];
    const [removedTask] = sourceTasks.splice(source.index, 1);

    // Add the task to the destination column
    const destinationTasks = [...newTasks[destination.droppableId]];
    destinationTasks.splice(destination.index, 0, removedTask);

    // Update the tasks object
    newTasks[source.droppableId] = sourceTasks;
    newTasks[destination.droppableId] = destinationTasks;

    setTasks(newTasks);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newCategory]: [],
      }));
      setNewCategory('');
      setShowAddCategoryPopup(false);
    }
  };

  const handleDeleteCategory = (category) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[category];
    setTasks(updatedTasks);
  };

  const handleAddTaskToCategory = (category) => {
    const newTaskContent = prompt('Enter task content:');
    if (newTaskContent) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [category]: [
          ...prevTasks[category],
          { id: String(Date.now()), content: newTaskContent },
        ],
      }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar */}
      <Navigation />

      <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
          size="txtPoppinsRegular16"
          onClick={() => navigate('/myprofile')}
        >
          My Profile
        </Text>
        <Text
          className="mt-[95px] ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800"
          size="txtPoppinsBold34"
        >
          Project Name
        </Text>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '60px' }}>
          <label htmlFor="category" style={{ marginRight: '10px' }}>
            Select Category:
          </label>
          <select id="category" onChange={handleCategoryChange}>
            {Object.keys(tasks).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <Button color="indigo_800_01" shape="round"
            onClick={handleNavigate}
            style={{ marginLeft: '10px', color: '#ffffff' }}
          >
            Navigate
          </Button>
        </div>

                {/* Update and Delete Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '50px', marginTop: '20px' }}>
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px', color: '#ffffff' }}
            onClick={() => navigate(`/updateproject/`)}
            shape="round"
            color="indigo_800_01"
          >
            Update
          </Button>

          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px', backgroundColor: '#BE3144', color: '#ffffff' }}
            onClick={handleDeletionProject}
            shape="round"
          >
            Delete
          </Button>
        </div>

        <div>
          {/* KanbanComponent content */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ marginTop: '20px', display: 'flex' }}>
              {Object.keys(tasks).map((columnId) => (
                <div key={columnId} style={{ flex: 1, margin: '8px', backgroundColor: '#E2E8F0', borderRadius: '8px', padding: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3>{columnId.toUpperCase()}</h3>
                    <div>
                      <Button shape="round" onClick={() => handleDeleteCategory(columnId)} style={{ marginRight: '8px', backgroundColor: '#BE3144', color: '#ffffff' }}>
                        Delete
                      </Button>
                      <Button shape="round" color="indigo_800_01" onClick={() => handleAddTaskToCategory(columnId)} style={{ color: '#ffffff' }}>
                        Add Task
                      </Button>
                    </div>
                  </div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? '#A3BFFA' : '#EDF2F7',
                          padding: '15px',
                          minHeight: '100px',
                          borderRadius: '8px',
                        }}
                      >
                        {tasks[columnId].map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: '16px',
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#4299E1' : '#2C5282',
                                  color: 'white',
                                  borderRadius: '8px',
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {task.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>

        <div>
          {showAddCategoryPopup && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(253, 249, 249, 0.8)', padding: '16px', borderRadius: '8px', backdropFilter: 'blur(5px)' }}>
              <label htmlFor="newCategory">Enter Category Name: </label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button color="indigo_800_01" shape="round" onClick={handleAddCategory} style={{ color: '#ffffff', marginRight: '8px' }}>
                Add Category
              </Button>
              <Button shape="round" onClick={() => setShowAddCategoryPopup(false)} style={{ backgroundColor: '#BE3144', color: '#ffffff' }}>
                Cancel
              </Button>
            </div>
          )}

          <div>
            <Button shape="round" color="indigo_800_01" onClick={() => setShowAddCategoryPopup(true)} style={{ color: '#ffffff' }}>
              +
            </Button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default KanbanComponent;
