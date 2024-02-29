import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import ProjectProgress from './details';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "toTrain",
    "Walk to train stop",
    "walk",
    null,
    null,
    5 * 60 * 1000,
    100,
    null,
  ],
  ["music", "Listen to music", "music", null, null, 70 * 60 * 1000, 100, null],
  [
    "wait",
    "Wait for train",
    "wait",
    null,
    null,
    10 * 60 * 1000,
    100,
    "toTrain",
  ],
  ["train", "Train ride", "train", null, null, 45 * 60 * 1000, 75, "wait"],
  ["toWork", "Walk to work", "walk", null, null, 10 * 60 * 1000, 0, "train"],
  ["work", "Sit down at desk", null, null, null, 2 * 60 * 1000, 0, "toWork"],
];

const data = [columns, ...rows];

const options = {
  height: 1000, // Reduced height to make the chart smaller
  gantt: {
    defaultStartDateMillis: new Date(2015, 3, 28),
    criticalPathEnabled: true,
    criticalPathStyle: {
      stroke: "#e64a19",
      strokeWidth: 4,
    },
    innerGridTrack: { fill: "#fff3e0" },
    innerGridDarkTrack: { fill: "#ffcc80" },
  },
};

const GanttComponent = ({
  loading,
  successPopupAnimation,
  statisticsData,
  pieChartSize,
  hovered,
  pieChartData,
  tasks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Gantt Chart');
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [task, setTask] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNavigate = () => {
    console.log(`Navigate to ${selectedCategory} view`);
  };

  const handleDeletionProject = () => {
    console.log(`Delete project in ${selectedCategory} view`);
  };

  const handleEventClick = (event) => {
    console.log(`Clicked on event: ${event.title}`);
  };

  return (
    <div>
      <ProjectProgress
        handleCategoryChange={handleCategoryChange}
        handleNavigate={handleNavigate}
        handleDeletionProject={handleDeletionProject}
        loading={loading}
        successPopupAnimation={successPopupAnimation}
        statisticsData={statisticsData}
        pieChartSize={pieChartSize}
        hovered={hovered}
        pieChartData={pieChartData}
        tasks={tasks}
      />
      <Chart
      style={{marginTop: "-350px", marginLeft: "170px", marginRight: "auto"}}
        chartType="Gantt"
        width="85%"
        height="100%" 
        
        data={data}
        options={options}
      />
    </div>
  );
};

export default GanttComponent;
