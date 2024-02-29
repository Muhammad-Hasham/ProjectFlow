import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, Img, Button } from 'components';
import Navigation from 'pages/Sidebar';


const ProjectProgress = ({ progress, statisticsData, tasks }) => {

  const [projectname, setProjectname] = useState("");
  const navigate = useNavigate();
  const { projectId } = useParams()

  console.log(projectId)
  useEffect(() => {
    // Fetch project details from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the project details using a GET request
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
        console.log(data.data.project.name);
        // setProjectDetails(data);
        setProjectname(data.data.project.name)

      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const successPopupAnimation = useSpring({
    opacity: showSuccessPopup ? 1 : 0,
    transform: `scale(${showSuccessPopup ? 1 : 0.5})`,
  });

  const handleDeletionProject = async () => {
    navigate(`/updateproject/${projectId}`)
  };

  const navigateToStatistics = () => {
    navigate(`/details/${projectId}`);
  };

  const navigateToKanban = () => {
    navigate(`/kanban/${projectId}`);
  };

  const navigateToCalendar = () => {
    navigate(`/calendar/${projectId}`);
  };

  const navigateToGantt = () => {
    navigate(`/ganttchart/${projectId}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navigation />

      <div style={{ width: '73%', padding: '20px', marginLeft: '350px' }}>
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
          {projectname}
        </Text>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '50px' }}>
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px' }}
            onClick={() => navigate(`/updateproject/${projectId}`)}
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

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <Img className="h-[100px] w-[100px]" src="images/loading.gif" alt="Loading" />
          </div>
        )}

        <animated.div
          style={successPopupAnimation}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md"
        >
          Project Deleted Successfully!
        </animated.div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', cursor: 'pointer' }}>
          <h3 onClick={navigateToStatistics} style={{ margin: '0 10px', padding: '10px 20px', borderBottom: '3px solid transparent', transition: 'border-bottom-color 0.3s', fontWeight: 'normal', color: '#323F73', cursor: 'pointer' }}>Statistics</h3>
          <h3 onClick={navigateToKanban} style={{ margin: '0 70px', padding: '10px 20px', borderBottom: '3px solid transparent', transition: 'border-bottom-color 0.3s', fontWeight: 'normal', color: '#323F73', cursor: 'pointer' }}>Kanban View</h3>
          <h3 onClick={navigateToCalendar} style={{ margin: '0 60px', padding: '10px 20px', borderBottom: '3px solid transparent', transition: 'border-bottom-color 0.3s', fontWeight: 'normal', color: '#323F73', cursor: 'pointer' }}>Calendar View</h3>
          <h3 onClick={navigateToGantt} style={{ margin: '0 40px', padding: '10px 20px', borderBottom: '3px solid transparent', transition: 'border-bottom-color 0.3s', fontWeight: 'normal', color: '#323F73', cursor: 'pointer' }}>Gantt View</h3>
        </div>

      </div>
    </div>
  );
};

export default ProjectProgress;
