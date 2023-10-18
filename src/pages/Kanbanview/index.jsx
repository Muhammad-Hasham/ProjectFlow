import React from "react";

import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

import { Img, List, Text } from "components";

const KanbanviewPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-end mx-auto md:pr-10 sm:pr-5 pr-[81px] w-full">
        <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-[1359px] md:w-full">
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
          <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[77%] md:w-full">
            <Text
              className="md:ml-[0] ml-[891px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <Text
              className="md:ml-[0] ml-[33px] mt-[90px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
              size="txtPoppinsBold34"
            >
              Project 1
            </Text>
            <div className="sm:h-[149px] h-[33px] md:h-[61px] mr-0.5 mt-[35px] relative w-full">
              <div className="absolute flex flex-col items-center justify-start left-[3%] top-[0] w-[64%]">
                <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full">
                  <Text
                    className="common-pointer sm:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                    onClick={() => navigate("/graphs")}
                  >
                    Analytics
                  </Text>
                  <Text
                    className="mb-0.5 sm:ml-[0] ml-[181px] text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsBold16"
                  >
                    Kanban View
                  </Text>
                  <Text
                    className="common-pointer sm:ml-[0] ml-[158px] text-base text-indigo-800 tracking-[0.44px]"
                    size="txtPoppinsRegular16"
                    onClick={() => navigate("/calendarview")}
                  >
                    Calendar View
                  </Text>
                </div>
              </div>
              <Img
                className="absolute bottom-[0] h-[11px] inset-x-[0] mx-auto"
                src="images/img_line5.svg"
                alt="lineFive"
              />
            </div>
            <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between ml-4 md:ml-[0] mt-8 w-[99%] md:w-full">
              <div className="bg-gradient2  border border-indigo-800_01 border-solid flex flex-col gap-12 justify-start py-9 w-[22%] md:w-full">
                <Text
                  className="md:ml-[0] ml-[88px] text-base text-white-A700_01 tracking-[0.44px]"
                  size="txtPoppinsRegular16WhiteA70001"
                >
                  New
                </Text>
                <div className="h-[555px] md:h-[878px] mb-[323px] relative w-full">
                  <div className="absolute bg-gray-50 border border-indigo-800_01 border-solid h-[555px] inset-[0] justify-center m-auto w-full"></div>
                  <div
                    className="absolute bg-cover bg-no-repeat flex flex-col h-[143px] inset-x-[0] items-start justify-end mx-auto p-2.5 top-[8%] w-full"
                    style={{ backgroundImage: "url('images/img_group3.svg')" }}
                  >
                    <div className="flex flex-col items-start justify-start ml-4 md:ml-[0] mt-2">
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        Do something
                      </Text>
                      <Text
                        className="mt-[5px] text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Task description
                      </Text>
                      <Text
                        className="mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Due : 01/01/2023
                      </Text>
                      <Text
                        className="mt-2 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Assigned To: abc
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient3  border border-indigo-800_01 border-solid flex flex-col gap-11 justify-start py-[41px] w-[23%] md:w-full">
                <Text
                  className="md:ml-[0] ml-[60px] text-base text-white-A700 tracking-[0.44px]"
                  size="txtPoppinsRegular16WhiteA700"
                >
                  In Progress
                </Text>
                <List
                  className="bg-gray-50 border border-indigo-800_01 border-solid flex flex-col gap-5 items-center mb-[317px] p-0.5 w-full"
                  orientation="vertical"
                >
                  <div
                    className="bg-cover bg-no-repeat flex flex-1 flex-col h-[143px] items-start justify-end p-2.5 w-full"
                    style={{ backgroundImage: "url('images/img_group3.svg')" }}
                  >
                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[15px] mt-2">
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        Do something
                      </Text>
                      <Text
                        className="mt-[5px] text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Task description
                      </Text>
                      <Text
                        className="mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Due : 01/01/2023
                      </Text>
                      <Text
                        className="mt-2 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Assigned To: abc
                      </Text>
                    </div>
                  </div>
                  <div
                    className="bg-cover bg-no-repeat flex flex-1 flex-col h-[143px] items-start justify-end p-2.5 w-full"
                    style={{ backgroundImage: "url('images/img_group3.svg')" }}
                  >
                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[15px] mt-2">
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        Do something
                      </Text>
                      <Text
                        className="mt-[5px] text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Task description
                      </Text>
                      <Text
                        className="mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Due : 01/01/2023
                      </Text>
                      <Text
                        className="mt-2 text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsRegular16"
                      >
                        Assigned To: abc
                      </Text>
                    </div>
                  </div>
                </List>
              </div>
              <List
                className="sm:flex-col flex-row gap-[38px] grid sm:grid-cols-1 grid-cols-2 w-[49%] md:w-full"
                orientation="horizontal"
              >
                <div className="bg-gradient4  flex flex-col gap-11 justify-start sm:ml-[0] py-10 w-full">
                  <Text
                    className="md:ml-[0] ml-[90px] text-base text-white-A700 tracking-[0.44px]"
                    size="txtPoppinsRegular16WhiteA700"
                  >
                    Test
                  </Text>
                  <div className="bg-gray-50 border border-indigo-800_01 border-solid flex flex-col items-center justify-start mb-[319px] p-0.5 w-full">
                    <div
                      className="bg-cover bg-no-repeat flex flex-col h-[143px] items-start justify-end mb-[368px] mt-10 p-2.5 w-full"
                      style={{
                        backgroundImage: "url('images/img_group3.svg')",
                      }}
                    >
                      <div className="flex flex-col items-start justify-start md:ml-[0] ml-[15px] mt-2">
                        <Text
                          className="text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsBold16"
                        >
                          Do something
                        </Text>
                        <Text
                          className="mt-[5px] text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsRegular16"
                        >
                          Task description
                        </Text>
                        <Text
                          className="mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsRegular16"
                        >
                          Due : 01/01/2023
                        </Text>
                        <Text
                          className="mt-2 text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsRegular16"
                        >
                          Assigned To: abc
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient5  border border-pink-900 border-solid flex flex-col gap-[47px] items-center justify-start sm:ml-[0] py-[38px] w-full">
                  <Text
                    className="text-base text-white-A700 tracking-[0.44px]"
                    size="txtPoppinsRegular16WhiteA700"
                  >
                    Done
                  </Text>
                  <div className="bg-gray-50 border border-indigo-800_01 border-solid flex flex-col items-center justify-start mb-80 p-0.5 w-full">
                    <div
                      className="bg-cover bg-no-repeat flex flex-col h-[143px] items-start justify-end mb-[369px] mt-[39px] p-2.5 w-full"
                      style={{
                        backgroundImage: "url('images/img_group3.svg')",
                      }}
                    >
                      <div className="flex flex-col items-start justify-start md:ml-[0] ml-[15px] mt-2">
                        <Text
                          className="text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsBold16"
                        >
                          Do something
                        </Text>
                        <Text
                          className="mt-[5px] text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsRegular16"
                        >
                          Task description
                        </Text>
                        <Text
                          className="mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsRegular16"
                        >
                          Due : 01/01/2023
                        </Text>
                        <Text
                          className="mt-2 text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsRegular16"
                        >
                          Assigned To: abc
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanviewPage;
