import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Text } from "components";
import Navigation from "pages/Sidebar";
import { useSpring } from 'react-spring';
import Lottie from 'lottie-react';

const MyProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const id = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem('role');
    
    const fetchProjects = async () => {
      try {
        let endpoint = `http://127.0.0.1:3000/api/v1/projects`;

        if (role === 'Project Manager') {
          endpoint = `http://127.0.0.1:3000/api/v1/users/${id}/projects`;
        }

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const apiProjects = data.data.projects;

        const mappedProjects = apiProjects.map((project) => ({
          id: project._id,
          title: project.name,
          dueDate: project.end_date,
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const dummyProjects = [
    {
      id: '1',
      title: 'Project 1',
      dueDate: '2023-12-01',
    },
    {
      id: '2',
      title: 'Project 2',
      dueDate: '2023-12-15',
    },
    // Add more dummy projects as needed
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar */}
      <Navigation />
      <div className="flex md:flex-1 flex-col md:gap-10 gap-[97px] justify-start md:mt-0 mt-[68px] w-3/4 md:w-full">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
          size="txtPoppinsRegular16"
          onClick={() => navigate("/myprofile")}
        >
          My Profile
        </Text>

        <div className="flex flex-col gap-[51px] items-start justify-start w-full">
          <div className="flex sm:gap-10 gap-[639px] items-start justify-start md:ml-[0] ml-[3px] w-[92%] md:w-full">
            <Text
              className="ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800 flex items-center"
              size="txtPoppinsBold34"
            >
              Projects
            </Text>
            <Button
              className="common-pointer cursor-pointer leading-[normal] min-w-[109px] mt-2.5 text-base text-center tracking-[0.44px]"
              onClick={() => {
                handleAddButtonClick();
                navigate("/newproject");
              }}
              shape="round"
              color="indigo_800_01"
            >
              Create
            </Button>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <Img
                  className="h-[100px] w-[100px]"
                  src="images/loading.gif"
                  alt="Loading"
                />
              </div>
            )}
          </div>

          <div className="ml-[50px] gap-16 md:gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full">
            {(projects.length > 0 ? projects : dummyProjects).map((project) => (
              <div
                key={project.id}
                style={{
                  cursor: 'pointer', // Add pointer cursor
                 
                  backgroundColor: '#EBD9B4',
                  display: 'flex',
                  flex: '1',
                  flexDirection: 'column',
                  height: '252px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '7px',
                  paddingLeft: '5px', // Adjust according to your needs
                  paddingRight: '5px', // Adjust according to your needs
                  width: '100%',
                  borderRadius: '30px',
                }}
                onClick={() => navigate(`/details/${project.id}`)}
              >
                <div className="flex flex-col items-center justify-start mt-2.5 w-[71%] md:w-full">
                  <div className="flex flex-col items-center justify-end p-[31px] sm:px-5 rounded-[15px] w-full">
                  <Img
                             style={{
                              height: '70px', // Adjust the height as needed for mobile
                              maxHeight: '100%', // Allow height to auto-adjust on larger screens
                              objectFit: 'cover',
                              width: '100%',
                            }}
                              src="images/work.png"
                              alt="Project Image"
                            />
                  </div>
                  <Text
                    
                    style ={{color: '#1F2544',
                    marginTop: '20px',
                    marginBottom: '10px',
                    letterSpacing: '0.44px',}}
                    size="txtPoppinsRegular16"
                  >
                    {project.title}
                  </Text>
                  <Text
                    style ={{color: '#1F2544',
                    marginTop: '10px',
                    marginBottom: '15px',
                    letterSpacing: '0.44px',}}
                    size="txtPoppinsRegular16"
                  >
                    Due {project.dueDate ? project.dueDate.substring(0, 10) : ""}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;
