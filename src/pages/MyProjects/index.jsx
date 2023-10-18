import React, { useState, useEffect } from "react";
import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { Button, Img, Text } from "components";

const MyProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project data from your API or database here
    // Example: fetch("your_api_url_here")
    //   .then((response) => response.json())
    //   .then((data) => setProjects(data));

    // Simulated project data for demonstration
    const simulatedProjects = [
      { id: 1, title: "Project A", dueDate: "01/15/2023" },
      { id: 2, title: "Project B", dueDate: "02/28/2023" },
      // Add more projects as needed
    ];
    setProjects(simulatedProjects);
  }, []);

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mx-auto md:px-5 w-full">
          <div className="h-[1024px] relative w-[22%] md:w-full">
            <Sidebar className="!sticky !w-[299px] border border-black-900 border-solid flex h-screen md:hidden justify-start m-auto overflow-auto top-[0]"></Sidebar>
            <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
              <Text
                className="text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                size="txtPoppinsBold22"
                onClick = {() => navigate("/")}
              >
                ProjectFlow
              </Text>
              <Text
                className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
                onClick = {() => navigate("/dashboard")}
              >
                Dashboard
              </Text>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text
                  className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick = {() => navigate("/myprojects")}
                >
                  Projects
                </Text>
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick = {() => navigate("/mytasks")}
                >
                  My Tasks
                </Text>
                <Text
                  className="md:ml-[0] ml-[9px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick = {() => navigate("/apps")}
                >
                  Apps
                </Text>
              </div>
            </div>
          </div>
          <div className="flex md:flex-1 flex-col md:gap-10 gap-[97px] justify-start md:mt-0 mt-[68px] w-3/4 md:w-full">
            <Text
              className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick = {() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <div className="flex flex-col gap-[51px] items-start justify-start w-full">
              <div className="flex flex-row sm:gap-10 gap-[639px] items-start justify-start md:ml-[0] ml-[3px] w-[92%] md:w-full">
                <Text
                  className="mb-[7px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
                  size="txtPoppinsBold34"
                >
                  My Projects
                </Text>
                <Button
                  className="common-pointer cursor-pointer leading-[normal] min-w-[109px] mt-2.5 text-base text-center tracking-[0.44px]"
                  onClick={() => navigate("/newproject")}
                  shape="round"
                  color="indigo_800_01"
                >
                  Create
                </Button>
              </div>
              <div className="gap-16 md:gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="common-pointer bg-cover bg-no-repeat flex flex-1 flex-col h-[252px] items-center justify-end p-7 sm:px-5 w-full"
                    style={{ backgroundImage: "url('images/img_group6.svg')" }}
                    onClick={() => navigate(`/graphs/${project.id}`, { state: project })}
                    
                  >
                    
                    <div className="flex flex-col items-center justify-start mt-2.5 w-[71%] md:w-full">
                      <div className="bg-light_green-600 flex flex-col items-center justify-end p-[31px] sm:px-5 rounded-[15px] w-full">
                        <Img
                          className="h-6 md:h-auto object-cover w-[90%]"
                          src="images/img_image2.png"
                          alt="Project Image"
                        />
                      </div>
                      <Text
                        className="mt-[33px] text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        {project.title}
                      </Text>
                      <Text
                        className="mt-[15px] text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Due {project.dueDate}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjectsPage;
