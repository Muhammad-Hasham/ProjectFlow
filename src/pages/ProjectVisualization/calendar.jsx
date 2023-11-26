import React, { useState } from 'react';
import { Text, Button } from 'components';
import Navigation from 'pages/Sidebar'; // Assuming Sidebar is imported from 'pages'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('Calendar'); // Default to Calendar view
  const navigate = useNavigate();

  // Mock data for tasks with due dates
  const [events, setEvents] = useState([
    { id: 1, title: 'Task 1', start: new Date('2023-12-01'), end: new Date('2023-12-02') },
    { id: 2, title: 'Task 2', start: new Date('2023-12-05'), end: new Date('2023-12-06') },
    { id: 3, title: 'Task 3', start: new Date('2023-12-10'), end: new Date('2023-12-11') },
    // Add more tasks as needed
  ]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNavigate = () => {
    // Add navigation logic based on the selected category
    console.log(`Navigate to ${selectedCategory} view`);
  };

  const handleDeletionProject = () => {
    // Add deletion logic based on the selected category
    console.log(`Delete project in ${selectedCategory} view`);
  };

  const handleEventClick = (event) => {
    // Add logic for handling event clicks if needed
    console.log(`Clicked on event: ${event.title}`);
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

          <Button color="indigo_800_01" shape="round" onClick={handleNavigate} style={{ marginLeft: '10px', color: '#ffffff' }}>
            Navigate
          </Button>
        </div>
        <div>
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
        </div>
        
        <div>
          {/* Calendar Component content */}
          <div style={{ marginTop: '20px', marginLeft: '60px' }}>
            <h3>Calendar View</h3>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleEventClick}
              eventPropGetter={(event, start, end, isSelected) => {
                const backgroundColor = isSelected ? '#4299E1' : '#2C5282';
                const borderColor = isSelected ? '#4299E1' : '#2C5282';
                return { style: { backgroundColor, borderColor } };
              }}
            />
          </div>
        </div>

 
      </div>
    </div>
  );
};

export default CalendarComponent;
