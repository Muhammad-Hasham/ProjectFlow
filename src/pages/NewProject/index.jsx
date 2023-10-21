import React, { useState } from "react";
import { Button, Text } from "components";
import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { MyDatePicker } from "components";

const NewProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    teamMembers: "",
    startDate:null,
    dueDate: null,
    description: "",
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
      alert("Please fill out all required fields.")
      return;
    }
  
    // Create a new project object with the form data
    const projectData = {
      name: formData.projectName,
      end_date: formData.dueDate,
      description: formData.description,
    };
      let token=localStorage.getItem("token");
    // Send a POST request to the backend
    fetch("http://127.0.0.1:3000/api/v1/projects", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
  
        
        alert("Project Created Successfully")
        navigate("/myprojects");
      })
      .catch((error) => {
        // Handle API error, e.g., show an error message
        alert("Project creation failed")
        console.error("Project creation failed", error);
      });
  };

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[66px] items-start justify-start md:px-5 w-[92%] md:w-full">
          <div className="h-[1024px] relative w-[23%] md:w-full">
            <Sidebar className="!sticky !w-[299px] border border-black-900 border-solid flex h-screen md:hidden justify-start m-auto overflow-auto top-[0]"></Sidebar>
            <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
              <Text
                className="text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                size="txtPoppinsBold22"
                onClick={() => navigate("/dashboard")}
              >
                ProjectFlow
              </Text>
              <Text
                className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Text>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text
                  className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/myprojects")}
                >
                  Projects
                </Text>
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/mytasks")}
                >
                  My Tasks
                </Text>
                <Text
                  className="md:ml-[0] ml-[9px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/apps")}
                >
                  Apps
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
            <Text
              className="md:ml-[0] ml-[849px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <Text
              className="md:ml-[0] ml-[23px] mt-[89px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
              size="txtPoppinsBold34"
            >
              New Project
            </Text>
            <div className="bg-gray-50 flex flex-col items-center justify-end mt-8 p-[39px] sm:px-5 rounded-[30px] w-full">
              <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
                {/* Project Creation Date */}
                <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full">
                  <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                    Project Start Date
                  </Text>
                  <MyDatePicker selectedDate={formData.startDate} handleDateChange={handleStartDateChange} />
                </div>

                {/* Project Name */}
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                    <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                      Project Name
                    </Text>
                    <div className="h-12 relative w-[76%] md:w-full">
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className="text-base w-full"
                      />
                    </div>
              </div>
                

                {/* Team Members */}
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[37px] w-[97%] md:w-full">
                  <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                    Team Members
                  </Text>
                  <input type="text" className="border-b border-indigo-800_01 text-base w-[76%]" />
                </div>

                {/* Project Creation Date */}
                <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full">
                  <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                    Due Date
                  </Text>
                  <MyDatePicker
                    selectedDate={formData.dueDate}
                    handleDateChange={handleDueDateChange}
                  />
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-9 w-[97%] md:w-full">
                  <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                    Description
                  </Text>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border border-indigo-800 border-solid h-[70px] md:mt-0 mt-2.5 w-[74%]"
                    placeholder="Enter project description"
                  />
                </div>


                <Button
        className="cursor-pointer leading-[normal] min-w-[84px] md:ml-[0] ml-[745px] mt-[63px] text-base text-center tracking-[0.44px]"
        shape="round"
        color="indigo_800_01"
        onClick={handleCreateProject} // Handle the project creation when the button is clicked
      >
        Create
      </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 };

export default NewProjectPage;