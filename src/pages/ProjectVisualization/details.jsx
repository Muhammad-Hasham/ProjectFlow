import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Text, Img, Button } from 'components';
import { PieChart } from 'react-minimal-pie-chart';
import Navigation from 'pages/Sidebar';
import KanbanComponent from './kanban';
import CalendarComponent from './calendar';

const ProjectStatistics = ({ statisticsData }) => {
  return (
    <div style={{ marginLeft: '50px', marginRight: '50px', width: '300px', height: '300px', marginTop: '70px' }}>
      <ResponsiveContainer>
        <LineChart data={statisticsData}>
          <XAxis label={{ value: 'Duration', position: 'insideBottom', offset: -10 }} />
          <YAxis label={{ value: 'Progress', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="progress" stroke="#860A35" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProjectProgress = ({ progress, statisticsData }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Statistics');

  const pieChartSize = 300;

  const pieChartData = [{ value: progress, color: '#860A35' }, { value: 100 - progress, color: '#e0e0e0' }];

  const progressAnimation = useSpring({
    opacity: 1,
    value: progress,
    from: { opacity: 0, value: 0 },
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDeletionProject = async () => {
    setLoading(true);

    // Simulate asynchronous operation (API call, etc.)
    setTimeout(() => {
      setLoading(false);
      setShowSuccessPopup(true);

      // Reset success message after a few seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }, 2000);
  };

  const successPopupAnimation = useSpring({
    opacity: showSuccessPopup ? 1 : 0,
    transform: `scale(${showSuccessPopup ? 1 : 0.5})`,
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedCategory === 'Kanban') {
      navigate(`/kanban`);
    }
    
    if (selectedCategory === 'Calendar') {
      navigate(`/calendar`);
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
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="Statistics">Statistics</option>
            <option value="Kanban">Kanban</option>
            <option value="Calendar">Calendar</option>
          </select>

          <button onClick={handleNavigate}>Navigate</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '50px' }}>
          {/* Update Button */}
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px' }}
            onClick={() => navigate(`/updateproject/`)}
            shape="round"
            color="indigo_800_01"
          >
            Update
          </Button>

          {/* Delete Button */}
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[10px] mt-2.5 text-base text-center tracking-[0.44px]"
            style={{ width: '100px', marginLeft: '50px', backgroundColor: '#BE3144', color: '#ffffff' }}
            onClick={handleDeletionProject}
            shape="round"
          >
            Delete
          </Button>
        </div>

        {/* Animated Pop-up */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <Img className="h-[100px] w-[100px]" src="images/loading.gif" alt="Loading" />
          </div>
        )}

        {/* Success Popup */}
        <animated.div
          style={successPopupAnimation}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md"
        >
          Project Deleted Successfully!
        </animated.div>

        <div style={{ display: 'flex', marginTop: '10px', marginLeft: '60px', alignItems: 'center' }}>
          {/* Bar chart for project statistics */}
          {selectedCategory === 'Statistics' && <ProjectStatistics statisticsData={statisticsData} />}
          

          {/* Animated Pie Chart */}
          <animated.div
            style={{
              position: 'relative',
              width: `${pieChartSize}px`,
              height: `${pieChartSize}px`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <PieChart
              style={{
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#323F73',
                fontWeight: 'bold',
                justifyContent: 'flex-end',
              }}
              animate
              animationDuration={1000}
              animationEasing="ease-out"
              center={[pieChartSize / 2, pieChartSize / 2]}
              data={pieChartData}
              label={({ dataEntry }) => Math.round(dataEntry.value) + '%'}
              labelPosition={50}
              labelStyle={{
                fontSize: '10px',
                fontFamily: 'sans-serif',
                fill: '#323F73',
                pointerEvents: 'none',
              }}
              lengthAngle={360}
              lineWidth={30}
              onClick={() => console.log('Click on pie chart')}
              onMouseEnter={() => console.log('Mouse enter')}
              onMouseLeave={() => console.log('Mouse leave')}
              paddingAngle={0}
              radius={100}
              startAngle={0}
              viewBoxSize={[pieChartSize, pieChartSize]}
            />
            {hovered && (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'center',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#323F73',
                  fontWeight: 'bold',
                }}
              >
                {Math.round(progress)}%
              </div>
            )}
          </animated.div>
        </div>
      </div>
    </div>
  );
};

// Example usage:
const ProjectVisualization = () => {
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch project details based on the project ID (replace with your actual logic)
    const projectId = 'your_project_id';
    const placeholderProjectDetails = {
      progress: 60,
      statisticsData: [
        { progress: 30 },
        { progress: 20 },
        { progress: 50 },
        // ... more data points
      ],
    };
    setProjectDetails(placeholderProjectDetails);
  }, []);

  if (!projectDetails) {
    // Placeholder loading state
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Img className="h-[100px] w-[100px]" src="images/loading.gif" alt="Loading" />
      </div>
    );
  }

  return (
    <div>
      {/* Render the progress component */}
      <ProjectProgress progress={projectDetails.progress} statisticsData={projectDetails.statisticsData} />
      {/* Render the statistics component */}
    </div>
  );
};

export default ProjectVisualization;
