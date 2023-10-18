import React from "react";

import { Sidebar } from "react-pro-sidebar";

import { Button, Img, Line, List, Text } from "components";
import SignupRoleDropdownbox from "components/SignupRoleDropdownbox";

import { useNavigate } from "react-router-dom";


const NewTaskPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[66px] items-center justify-start md:px-5 w-[92%] md:w-full">
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
                  className="md:ml-[0] ml-[9px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/apps")}
                >
                  Apps
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start w-[73%] md:w-full">
            <Text
              className="md:ml-[0] ml-[849px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <div className="flex flex-row sm:gap-10 items-center justify-between md:ml-[0] ml-[13px] mt-[57px] w-[94%] md:w-full">
              <Text
                className="sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
                size="txtPoppinsBold34"
                onClick={() => navigate("/newtask")}
              >
                New Task
              </Text>
              <div className="h-[91px] relative w-[11%]">
                <div className="bg-white-A700_01 border border-indigo-800 border-solid h-[91px] m-auto rounded-[47px] w-full"></div>
                <Img
                  className="absolute h-[54px] inset-[0] justify-center m-auto object-cover w-[54px]"
                  src="images/img_image9.png"
                  alt="imageNine"
                />
              </div>
            </div>
            <div className="bg-gray-50 flex flex-col items-center justify-end mt-[25px] p-[33px] sm:px-5 rounded-[30px] w-full">
              <div className="flex flex-col items-start justify-start mt-7 w-[94%] md:w-full">
                <div className="flex md:flex-col flex-row md:gap-10 items-end justify-between w-[97%] md:w-full">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Task Creation Date
                  </Text>
                  <Line className="bg-indigo-800_01 h-px mb-1 md:mt-0 mt-[18px] w-[76%]" />
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[38px] w-[97%] md:w-full">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Task Name
                  </Text>
                  <div className="h-12 relative w-[76%] md:w-full">
                    <Text
                      className="absolute h-full inset-y-[0] my-auto right-[0] md:text-3xl sm:text-[28px] text-[32px] text-white-A700 tracking-[0.44px]"
                      size="txtPoppinsExtraBold32"
                    >
                      P
                    </Text>
                    <Line className="absolute bg-indigo-800_01 h-px inset-x-[0] mx-auto top-[38%] w-full" />
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[15px] w-[97%] md:w-full">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Task Creator
                  </Text>
                  <Line className="bg-indigo-800_01 h-px mb-[5px] md:mt-0 mt-[17px] w-[76%]" />
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mt-10 w-[97%] md:w-full">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Task Assignee
                  </Text>
                  <Line className="bg-indigo-800_01 h-px mb-[7px] md:mt-0 mt-[15px] w-[76%]" />
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start mt-[22px] w-[83%] md:w-full">
                  <Text
                    className="md:mt-0 mt-3.5 text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Due Date
                  </Text>
                  <Img
                    className="h-[52px] md:h-auto md:ml-[0] ml-[133px] object-cover w-[52px]"
                    src="images/img_image10.png"
                    alt="imageTen"
                  />
                  <Text
                    className="md:ml-[0] ml-[120px] md:mt-0 mt-[15px] text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Last Updation Date
                  </Text>
                  <Img
                    className="h-[52px] md:h-auto md:ml-[0] ml-[93px] object-cover w-[52px]"
                    src="images/img_image10.png"
                    alt="imageEleven"
                  />
                </div>
                <List
                  className="flex flex-col gap-6 mt-[19px] w-1/2"
                  orientation="vertical"
                >
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Priority
                    </Text>
                    <SignupRoleDropdownbox
                      className="flex flex-col h-[38px] md:h-auto items-center justify-center w-[213px]"
                      menulabel="Medium"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Status
                    </Text>
                    <SignupRoleDropdownbox className="flex flex-col h-[38px] md:h-auto items-center justify-center w-[213px]" />
                  </div>
                </List>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-8 w-[97%] md:w-full">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    Description
                  </Text>
                  <div className="bg-gray-50 border border-indigo-800 border-solid h-[70px] md:mt-0 mt-1 w-[76%]"></div>
                </div>
                <div className="flex flex-row sm:gap-10 items-center justify-between mt-16 w-full">
                  <Text
                    className="text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                  >
                    + Add a subtask
                  </Text>
                  <Button
                    className="cursor-pointer leading-[normal] min-w-[84px] text-base text-center tracking-[0.44px]"
                    shape="round"
                    color="indigo_800_01"
                    onClick={() => navigate("/mytasks")}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTaskPage;
