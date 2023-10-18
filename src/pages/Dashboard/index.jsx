import React,{useState, useEffect} from "react";

import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

import { Img, Line, List, Text } from "components";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Function to fetch data from the backend API
  const fetchData = async () => {
    try {
      // Fetch projects and tasks data from your API
      const projectsResponse = await fetch("YOUR_PROJECTS_API_URL");
      const projectsData = await projectsResponse.json();

      const tasksResponse = await fetch("YOUR_TASKS_API_URL");
      const tasksData = await tasksResponse.json();

      setProjects(projectsData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);


  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[70px] items-center justify-start md:px-5 w-[93%] md:w-full">
          <div className="h-[1024px] relative w-[23%] md:w-full">
            <Sidebar className="!sticky !w-[299px] border border-black-900 border-solid flex h-screen md:hidden justify-start m-auto overflow-auto top-[0]"></Sidebar>
            <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
              <Text
                className="text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                size="txtPoppinsBold22"
              >
                ProjectFlow
              </Text>
              <Text
                className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Dashboard
              </Text>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text
                  className="common-pointer md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/myprojects")}
                >
                  Projects
                </Text>
                <Text
                  className="common-pointer text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/mytasks")}
                >
                  My Tasks
                </Text>
                <Text
                  className="common-pointer md:ml-[0] ml-[7px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/apps")}
                >
                  Apps
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start w-[73%] md:w-full">
          <Text className="flex flex-row items-baseline justify-around md:ml-[0] ml-[800px] text-base text-indigo-800 tracking-[0.44px]"
              onClick = {()=> navigate('/myprofile')}>
              My Profile
            </Text>
            <div className="flex sm:flex-col flex-row gap-[58px] items-start justify-start md:ml-[0] ml-[139px] mt-2 w-[54%] md:w-full">
              <Img
                className="h-[148px] md:h-auto object-cover w-[36%] sm:w-full"
                src="images/img_image4.png"
                alt="imageFour"
              />
              <Text
                className="grid justify-center sm:mt-0 mt-[59px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
                size="txtPoppinsBold34"
              >
                Welcome , User
              </Text>
            </div>
            <List
              className="sm:flex-col flex-row md:gap-10 gap-[70px] grid md:grid-cols-1 grid-cols-2 justify-center mt-[49px] w-full"
              orientation="horizontal"
            >
              <div className="bg-gray-50 flex flex-1 flex-col items-center justify-start p-8 sm:px-5 rounded-[30px] w-full">
                <div className="flex flex-col md:gap-10 gap-[81px] justify-start mb-[186px] mt-[23px] w-full">
                  <Text
                    className="flex md:ml-[0] ml-[111px] text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                    size="txtPoppinsBold22"
                  >
                    My Projects
                  </Text>
                  <div className="flex flex-col items-start justify-start w-full">
                    <Text
                      className="common-pointer ml-1 md:ml-[0] text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                      onClick={() => navigate("/newproject")}
                    >
                      + Create a new Project
                    </Text>
                    <div className="flex flex-row items-start justify-between ml-1 md:ml-[0] mt-[42px] w-[84%] md:w-full">
                      {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between ml-1 md:ml-[0] mt-[42px] w-[84%] md:w-full">
                      <Text
                        className="common-pointer mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                        onClick={() => navigate(`/project/${project.id}`)}
                      >
                        {project.name}
                      </Text>
                      <Text className="mb-0.5 text-base text-indigo-800 tracking-[0.44px]">
                        Due {project.dueDate}
                      </Text>
                    </div>
                  ))}
                  </div>
                </div>
                </div>
              </div>
              <div className="bg-gray-50 flex flex-1 flex-col items-center justify-start p-[30px] sm:px-5 rounded-[30px] w-full">
                <div className="flex flex-col justify-start mb-[189px] mt-[26px] w-[99%] md:w-full">
                  <Text
                    className="flex md:ml-[0] ml-[139px] text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                    size="txtPoppinsBold22"
                  >
                    My Tasks
                  </Text>
                  <div className="flex flex-col gap-11 items-start justify-start md:ml-[0] ml-[17px] mt-[78px] w-[84%] md:w-full">
                    <Text
                      className="common-pointer text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                      onClick={() => navigate("/newtask")}
                    >
                      + Create a new Task
                    </Text>
                    <div className="flex flex-row items-center justify-between w-full">
                    {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between ml-1 md:ml-[0] mt-[42px] w-[84%] md:w-full">
                      <Text
                        className="common-pointer mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                        onClick={() => navigate(`/task/${task.id}`)}
                      >
                        {task.name}
                      </Text>
                      <Text className="mb-0.5 text-base text-indigo-800 tracking-[0.44px]">
                        Due {task.dueDate}
                      </Text>
                    </div>
                  ))}
                  </div>
                  </div>
                </div>
              </div>
            </List>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;