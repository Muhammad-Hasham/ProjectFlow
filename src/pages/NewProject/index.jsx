import React, { useState, useEffect } from 'react';
import { Button, Text } from 'components';
import { useNavigate } from 'react-router-dom';
import Navigation from 'pages/Sidebar';
import { useSpring, animated } from 'react-spring';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    startDate: null,
    dueDate: null,
    description: '',
  });

  const [popUp, setPopUp] = useState({
    type: null, // 'success' or 'error'
  });

  const handleDueDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProject = () => {
    if (!formData.projectName || !formData.description || !formData.dueDate) {
      console.error('Please fill out all required fields.');
      setPopUp({ type: 'error' });
      return;
    }

    

    const projectData = {
      name: formData.projectName,
      end_date: formData.dueDate,
      description: formData.description,
    };

    let token = localStorage.getItem('token');

    fetch('http://127.0.0.1:3000/api/v1/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPopUp({ type: 'success' });
        navigate('/myprojects');
      })
      .catch((error) => {
        setPopUp({ type: 'error' });
        console.error('Project creation failed', error);
      });
  };

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
    pointerEvents: popUp.type ? 'auto' : 'none',
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  useEffect(() => {
    // Set a timer to clear the pop-up after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setPopUp({ type: null });
    }, 3000);

    // Clear the timer when the component unmounts or when popUp.type changes
    return () => clearTimeout(timer);
  }, [popUp.type]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* Sidebar */}
        <Navigation />
        {/* New Project Form */}
        <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
          <Text
            className="md:ml-[0] ml-[849px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
            onClick={() => navigate('/myprofile')}
          >
            My Profile
          </Text>
          <Text
            className="ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800 flex items-center"
            size="txtPoppinsBold34"
          >
            New Project
          </Text>
          <div style={{
            marginLeft: '45px',
            backgroundColor: '#EBD9B4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '8px',
            padding: '39px',
            paddingLeft: '5px',
            paddingRight: '5px',
            borderRadius: '30px',
            width: '100%',
          }}
          >
            <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
              {/* Project Name */}
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                <Text style={{
                  marginTop: '0rem',
                  color: '#1F2544',
                  letterSpacing: '0.44px',
                }}
                size="txtPoppinsRegular16">
                  Project Name
                </Text>
                <div style={{
                  borderBottom: '1px solid #1F2544', // Border color for indigo-800
                  fontSize: '1rem', // Font size for text-base
                  width: '70%', // Width as specified
                }}>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    style={{
                      fontSize: '1rem', // Equivalent to text-base
                      width: '60%', // Equivalent to w-full
                      backgroundColor: 'transparent', // Equivalent to bg-gray-50
                      border: 'none', // Equivalent to border-none
                      borderBottom: '0.5px #1F2544', // Border color for indigo-800
                      outline: 'none', // Equivalent to focus:outline-none
                    }}
                  />
                </div>
              </div>

        {/* Start Date and Due Date */}
        <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              color: '#1F2544',
              letterSpacing: '0.44px',
            }}
            size="txtPoppinsRegular16">
              Start Date
            </Text>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginLeft: '25px', cursor: 'pointer' }} onClick={() => document.getElementById('start-date-picker')?.click()} />
            <animated.div style={fadeIn}>
              <DatePicker id="start-date-picker" selected={formData.startDate} onChange={handleStartDateChange} className="hidden" />
            </animated.div>
            {formData.startDate && (
              <Text style={{ marginLeft: '10px', color: '#1F2544' }}>
                {formData.startDate.toLocaleDateString()}
              </Text>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              color: '#1F2544',
              letterSpacing: '0.44px',
              marginRight: '250px', // Adjusted for uniformity
            }}
            size="txtPoppinsRegular16">
              Due Date
            </Text>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '20px', cursor: 'pointer' }} onClick={() => document.getElementById('due-date-picker')?.click()} />
            <animated.div style={fadeIn}>
              <DatePicker id="due-date-picker" selected={formData.dueDate} onChange={handleDueDateChange} className="hidden" />
            </animated.div>
            {formData.dueDate && (
              <Text style={{ marginLeft: '10px', color: '#1F2544', marginRight: '250px' }}>
                {formData.dueDate.toLocaleDateString()}
              </Text>
            )}
          </div>
        </div>

              {/* Description */}
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-9 w-[97%] md:w-full">
                <Text style={{
                  color: '#1F2544',
                  letterSpacing: '0.44px',
                }} size="txtPoppinsRegular16">
                  Description
                </Text>
                <div style={{
                  borderBottom: '1px solid #1F2544', // Border color for indigo-800
                  fontSize: '1rem', // Font size for text-base
                  width: '70%', // Width as specified
                }}>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{
                      fontSize: '1rem', // Equivalent to text-base
                      width: '60%', // Equivalent to w-full
                      backgroundColor: 'transparent', // Equivalent to bg-gray-50
                      border: 'none', // Equivalent to border-none
                      borderBottom: '0.5px #1F2544', // Border color for indigo-800
                      outline: 'none', // Equivalent to focus:outline-none
                    }}
                  />
                </div>
              </div>

              {/* Button to Invite */}
              <Button
                className="cursor-pointer leading-[normal] min-w-[84px] ml-[635px] mt-[63px] text-base text-center tracking-[0.44px] shake-on-hover"
                shape="round"
                style={{ backgroundColor: "#860A35", color: "#ffffff" }}
                onClick={() => navigate('/invite', { state: formData })}
              >
                Invite
              </Button>


              {/* Button to Create Project */}
              <Button
                className="cursor-pointer leading-[normal] min-w-[84px] ml-[745px] mt-[-42px] text-base text-center tracking-[0.44px]"
                shape="round"
                color="indigo_800"
                onClick={handleCreateProject}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>

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
          {popUp.type === 'success' ? 'Project Created Successfully!' : 'Project Creation Failed. Please try again.'}
        </p>
      </animated.div>
    </>
  );
};

export default NewProjectPage;
