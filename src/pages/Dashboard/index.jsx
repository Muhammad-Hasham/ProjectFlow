import React, { useState, useEffect } from 'react';
import { Img, Text, List } from 'components';
import { useNavigate } from 'react-router-dom';
import Navigation from 'pages/Sidebar';
import axios from 'axios';
const projectContainerStyles = {
  position: 'relative',
  perspective: '1000px',
};

const styles = {
  projectItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '100px', // Adjust as needed
    padding: '16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  },
};

const dummyProjects = [
  { id: 1, name: 'Project A', dueDate: '2023-12-15' },
  { id: 2, name: 'Project B', dueDate: '2023-12-20' },
  { id: 3, name: 'Project C', dueDate: '2023-12-25' },
];

const dummyTasks = [
  { id: 101, name: 'Task 1', dueDate: '2023-12-18' },
  { id: 102, name: 'Task 2', dueDate: '2023-12-22' },
  { id: 103, name: 'Task 3', dueDate: '2023-12-28' },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showCreateProjects, setShowCreateProjects] = useState(false);
  const [showCreateTasks, setShowCreateTasks] = useState(false);
  const [popUp, setPopUp] = useState({ type: "", message: "" });

  let name = localStorage.getItem("username");

  // let role=localStorage.getItem("role");


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
    }
  }, []);



  useEffect(() => {
    const id = localStorage.getItem("userid");
    console.log("User ID from localStorage:", id);

    let token=localStorage.getItem("token");
    // Make a GET request to your backend API to fetch projects for the user
    if(localStorage.getItem('role') === 'Team Member')
    {
    fetch(`http://127.0.0.1:3000/api/v1/projects`, {
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

        const mappedProjects = apiProjects.map((project) => ({
          id: project._id,
          title: project.name,
          dueDate: project.end_date,
        }));

        setProjects(mappedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    }  else if (localStorage.getItem('role') === 'Project Manager') {
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

        const mappedProjects = apiProjects.map((project) => ({
          id: project._id,
          title: project.name,
          dueDate: project.end_date,
        }));

        setProjects(mappedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    }
  }, []);


  const handleProjectsHover = () => {
    setShowCreateProjects(true);
  };

  const handleProjectsLeave = () => {
    setShowCreateProjects(false);
  };

  const handleTasksHover = () => {
    setShowCreateTasks(true);
  };

  const handleTasksLeave = () => {
    setShowCreateTasks(false);
  };

  const handleCreateProjectClick = () => {
    navigate('/newproject');
  };

  const handleCreateTaskClick = () => {
    // Replace 'dummy' with the actual project ID or fetch it from your state
    const projectId = 123456;
    navigate(`/newtask/${projectId}`);
  };

  return (
    <div>
      <Navigation />

      <div style={{ width: '73%', padding: '20px', marginLeft: '350px' }}>
        <Text
          className="flex flex-row items-baseline justify-around md:ml-[0] ml-[800px] text-base text-indigo-800 tracking-[0.44px]"
          onClick={() => navigate('/myprofile')}
          style={{ fontSize: '18px', cursor: 'pointer' }}
        >
          My Profile
        </Text>

        <div className="flex sm:flex-col flex-row gap-[58px] items-start justify-start md:ml-[0] ml-[139px] mt-2 w-[54%] md:w-full">
          <Img className="h-[148px] md:h-auto object-cover w-[36%] sm:w-full" src="images/welcome.gif" alt="welcome" />
          <div>
            <Text className="grid justify-center sm:mt-0 mt-[59px] sm:text-3xl md:text-[32px] text-[31px] text-center text-indigo-800" size="txtPoppinsBold34">
              Welcome, {name}
            </Text>
          </div>
        </div>

        <List
          className="sm:flex-col flex-row md:gap-10 gap-[70px] grid md:grid-cols-1 grid-cols-2 justify-center mt-[49px] w-full"
          orientation="horizontal"
        >
          <div
            onMouseEnter={handleProjectsHover}
            onMouseLeave={handleProjectsLeave}
            style={{
              backgroundColor: '#EBD9B4', // Change this color to your desired background color
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px',
              paddingLeft: '5px', // Adjust according to your needs
              paddingRight: '5px', // Adjust according to your needs
              borderRadius: '30px',
              width: '100%',
            }}
          >
            <Text
              style={{
                fontSize: showCreateProjects ? '40px' : '22px',
                color: '#1F2544',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: showCreateProjects ? '200px 0' : '0',
              }}
              size="txtPoppinsBold22"
              onClick={handleCreateProjectClick}
            >
              {showCreateProjects ? 'Create' : 'My Projects'}
            </Text>
            {!showCreateProjects && (
              <div style={{ marginTop: '30px' }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    style={styles.projectItem}
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <Text className="common-pointer" size="txtPoppinsRegular16" color="indigo-800">
                      {project.title}
                    </Text>
                    <Text color="indigo-800">{project && project.dueDate ? `Due ${project.dueDate.substring(0, 10)}` : 'Due Date Not Available'}</Text>


                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            onMouseEnter={handleTasksHover}
            onMouseLeave={handleTasksLeave}
            style={{
              backgroundColor: '#EBD9B4', // Change this color to your desired background color
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px',
              paddingLeft: '5px', // Adjust according to your needs
              paddingRight: '5px', // Adjust according to your needs
              borderRadius: '30px',
              width: '100%',
            }}
          >
            <Text
              style={{
                fontSize: showCreateTasks ? '40px' : '22px',
                color: '#1F2544',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: showCreateTasks ? '200px 0' : '0',
              }}
              size="txtPoppinsBold22"
              onClick={handleCreateTaskClick}
            >
              {showCreateTasks ? 'Create' : 'My Tasks'}
            </Text>
            {!showCreateTasks && (
              <div style={{ marginTop: '30px'}}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    style={styles.projectItem}
                    onClick={() => navigate(`/task/${task.id}`)}
                  >
                    <Text className="common-pointer" size="txtPoppinsRegular16" color="indigo-800">
                      {task.name}
                    </Text>
                    <Text color="indigo-800">{task && task.end_date ? `Due ${task.end_date.substring(0, 10)}` : 'Due Date Not Available'}</Text>

                  </div>
                ))}
              </div>
            )}
          </div>
        </List>
      </div>
    </div>
  );
};

export default DashboardPage;