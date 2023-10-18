import React from "react";
import { Sidebar } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Img, Text } from "components";

const GraphsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  if (!state) {
    // Handle the case where project data is missing.
    return <div>Project not found</div>;
  }

  const { name, startDate, endDate, projectStatus } = state;

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-end mx-auto md:pr-10 sm:pr-5 pr-[83px] w-full">
        <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full">
          <div className="h-[1024px] relative w-[23%] md:w-full">
            <Sidebar className="!sticky !w-[299px] border border-black-900 border-solid flex h-screen md:hidden justify-start m-auto overflow-auto top-[0]"></Sidebar>
            <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
              <Text
                className="text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                size="txtPoppinsBold22"
                onClick={() => navigate("/")}
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
                  className="md:ml-[0] ml-[7px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/apps")}
                >
                  Apps
                </Text>
              </div>
            </div>
          </div>
          <div className="flex md:flex-1 flex-col justify-start md:mt-0 mt-[68px] w-[77%] md:w-full">
            <Text
              className="md:ml-[0] ml-[37px] mt-[81px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
              size="txtPoppinsBold34"
            >
              {name}
            </Text>
            <div className="font-inter h-[1024px] md:h-[1056px] ml-7 md:ml-[0] mt-8 relative w-[97%] md:w-full">
              <div className="border border-black-900 border-solid flex flex-col h-full items-center justify-start m-auto rounded-[50px] w-full">
                <div className="bg-gradient1  h-[1024px] rounded-[50px] w-full"></div>
              </div>
              <div className="absolute flex flex-col h-[400px] sm:h-auto inset-x-[0] items-center justify-start mx-auto top-[26%] w-[400px]">
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                >
                  Start Date: {startDate}
                </Text>
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                >
                  End Date: {endDate}
                </Text>
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                >
                  Project Status: {projectStatus}
                </Text>
                {/* Add project-specific content here, such as charts and data */}
                {/* Example chart: */}
                <div className="my-4 w-full h-[300px]">
                  {/* Add your chart component here */}
                </div>
                {/* Example data display: */}
                <div className="text-base text-indigo-800 tracking-[0.44px]">
                  Project Data:
                  {/* Replace with actual project data display */}
                  <ul>
                    <li>Task 1: In progress</li>
                    <li>Task 2: Completed</li>
                    <li>Task 3: Not started</li>
                    {/* Add more project data here */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphsPage;
