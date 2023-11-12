import React, { useState, useEffect } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Img, Text, List } from 'components';
import { useSpring, animated } from 'react-spring';

// Styles
const projectContainerStyles = {
  position: 'relative',
  perspective: '1000px',
};

const styles = {
  relativeHoverButton: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  projectItem: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s, opacity 0.5s',
  },
  createButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    backgroundColor: '#323F73',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'opacity 0.5s, transform 0.5s',
  },
};

const DashboardPage = () => {
  const navigate = useNavigate();

  // State
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateButton, setShowCreateButton] = useState(false);

  // Animation Springs
  const [projectsAnimation, setProjectsAnimation] = useSpring(() => ({
    opacity: 1,
    transform: 'rotateY(0deg)',
  }));

  const [createButtonAnimation, setCreateButtonAnimation] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(10px)',
  }));

  const [tasksAnimation, setTasksAnimation] = useSpring(() => ({
    opacity: 1,
    transform: 'rotateY(0deg)',
  }));

  // Fetch Data Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await fetch('YOUR_PROJECTS_API_URL');
        const tasksResponse = await fetch('YOUR_TASKS_API_URL');

        if (!projectsResponse.ok || !tasksResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const projectsData = await projectsResponse.json();
        const tasksData = await tasksResponse.json();

        setProjects(projectsData);
        setTasks(tasksData.map((task) => ({ ...task, hovered: false })));
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    // Trigger animations when the component mounts
    fetchData();
  }, []);

  // Event Handlers
  const handleTasksHover = () => {
    setTasksAnimation({ opacity: 0, transform: 'rotateY(180deg)' });
    setCreateButtonAnimation(true);
  };

  const handleTasksLeave = () => {
    setTasksAnimation({ opacity: 1, transform: 'rotateY(0deg)' });
    setCreateButtonAnimation(false);
  };

  const handleProjectsHover = () => {
    setProjectsAnimation({ opacity: 0, transform: 'rotateY(180deg)' });
    setCreateButtonAnimation({ opacity: 1, transform: 'translateY(0px)' });
  };

  const handleProjectsLeave = () => {
    setProjectsAnimation({ opacity: 1, transform: 'rotateY(0deg)' });
    setCreateButtonAnimation({ opacity: 0, transform: 'translateY(10px)' });
  };

  // Render Projects
  const renderProjects = () => {
    return projects.map((project) => (
      <div key={project.id} style={projectContainerStyles}>
        <animated.div
          style={{ ...styles.projectItem, ...projectsAnimation }}
          onMouseEnter={handleProjectsHover}
          onMouseLeave={handleProjectsLeave}
        >
          <Text
            className="common-pointer"
            size="txtPoppinsRegular16"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            {project.name}
          </Text>
          <Text>{`Due ${project.dueDate}`}</Text>
        </animated.div>
        <animated.button
          style={styles.createButton}
          onClick={() => navigate('/newproject')}
        >
          Create Project
        </animated.button>
      </div>
    ));
  };

  // Render Tasks
  const renderTasks = () => {
    return tasks.map((task) => (
      <div key={task.id} style={projectContainerStyles}>
        <animated.div>
          <Text
            className="common-pointer"
            size="txtPoppinsRegular16"
            onClick={() => navigate(`/task/${task.id}`)}
          >
            {task.name}
          </Text>
          <Text>{`Due ${task.dueDate}`}</Text>
        </animated.div>
      </div>
    ));
  };

  // Main Render
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '23%', position: 'relative', backgroundColor: '#EDEFF5' }}>
        <Sidebar
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #EDEFF5 0%, white 100%)',
            cursor: 'pointer',
          }}
        >
          <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
            <animated.div style={projectsAnimation}>
              <Text className="font-bold text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl">
                ProjectFlow
              </Text>
            </animated.div>
            <animated.div style={projectsAnimation}>
              <Text onClick={() => navigate('/dashboard')} className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]">
                Dashboard
              </Text>
            </animated.div>
            <animated.div style={projectsAnimation}>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text onClick={() => navigate('/myprojects')} className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]">
                  Projects
                </Text>
                <Text onClick={() => navigate('/mytasks')} className="text-base text-indigo-800 tracking-[0.44px]">
                  My Tasks
                </Text>
                <Text onClick={() => navigate('/apps')} className="md:ml-[0] ml-[7px] text-base text-indigo-800 tracking-[0.44px]">
                  Apps
                </Text>
              </div>
            </animated.div>
          </div>
        </Sidebar>
      </div>

      {/* Main Content */}
      <div style={{ width: '73%', padding: '20px' }}>
        <Text
          className="flex flex-row items-baseline justify-around md:ml-[0] ml-[800px] text-base text-indigo-800 tracking-[0.44px]"
          onClick={() => navigate('/myprofile')}
          style={{ fontSize: '18px', cursor: 'pointer' }}
        >
          My Profile
        </Text>

        <div className="flex sm:flex-col flex-row gap-[58px] items-start justify-start md:ml-[0] ml-[139px] mt-2 w-[54%] md:w-full">
          <Img className="h-[148px] md:h-auto object-cover w-[36%] sm:w-full" src="images/welcome.gif" alt="welcome" />
          <animated.div style={projectsAnimation}>
            <Text className="grid justify-center sm:mt-0 mt-[59px] sm:text-3xl md:text-[32px] text-[31px] text-center text-indigo-800" size="txtPoppinsBold34">
              Welcome, User
            </Text>
          </animated.div>
        </div>

        <List
          className="sm:flex-col flex-row md:gap-10 gap-[70px] grid md:grid-cols-1 grid-cols-2 justify-center mt-[49px] w-full"
          orientation="horizontal"
        >
          {/* My Projects */}
          <div onMouseEnter={handleProjectsHover}
                onMouseLeave={handleProjectsLeave}
          className="bg-gray-50 flex flex-1 flex-col items-center justify-start p-8 sm:px-5 rounded-[30px] w-full">
            <animated.div style={projectsAnimation}>
              <div className="flex flex-col md:gap-10 gap-[81px] justify-start mb-[186px] mt-[23px] w-full">
                <Text
                  style={{ fontSize: '22px', color: '#323F73', height: '32px', width: '152px' }}
                  size="txtPoppinsBold22"
                  
                >
                  My Projects
                </Text>
                <div className="flex flex-col items-start justify-start w-full">
                  <Text
                    className="common-pointer ml-1 md:ml-[0] text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                    onClick={() => navigate('/newproject')}
                  >
                    + Create a new Project
                  </Text>
                  <div className="flex flex-row items-start justify-between ml-1 md:ml-[0] mt-[42px] w-[84%] md:w-full">
                    {renderProjects()}
                  </div>
                </div>
              </div>
            </animated.div>
          </div>

          {/* My Tasks */}
          <div onMouseEnter={handleTasksHover}
                onMouseLeave={handleTasksLeave}
          className="bg-gray-50 flex flex-1 flex-col items-center justify-start p-[30px] sm:px-5 rounded-[30px] w-full">
            <animated.div style={tasksAnimation}>
              <div
                className="flex flex-col justify-start mb-[189px] mt-[26px] w-[99%] md:w-full relative"
                
              >
                <animated.button
                  style={{ ...styles.createButton, ...createButtonAnimation, visibility: showCreateButton ? 'visible' : 'hidden' }}
                  onClick={() => navigate('/newtask')}
                >
                  Create
                </animated.button>
                <div>
                  <Text
                    style={{ fontSize: '22px', color: '#323F73', height: '32px', width: '152px' }}
                    size="txtPoppinsBold22"
                  >
                    My Tasks
                  </Text>
                  <div className="flex flex-col gap-11 items-start justify-start md:ml-[0] ml-[17px] mt-[78px] w-[84%] md:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                      {renderTasks()}
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          </div>
        </List>
      </div>
    </div>
  );
};

export default DashboardPage;
