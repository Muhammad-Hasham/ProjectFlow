import React from "react";

import { Sidebar } from "react-pro-sidebar";

import { Button, Img, Text } from "components";

import { useNavigate } from "react-router-dom";

const AppsPage = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[63px] items-start justify-start md:px-5 w-[90%] md:w-full">
          <div className="h-[1024px] relative w-[24%] md:w-full">
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
          <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
            <Text
              className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <Text
              className="mt-[95px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
              size="txtPoppinsBold34"
            >
              Applications
            </Text>
            <div className="flex flex-col items-center justify-start ml-10 md:ml-[0] mr-[29px] mt-12 w-[93%] md:w-full">
              <div className="md:gap-5 gap-[53px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div
                    className="bg-cover bg-no-repeat flex flex-col h-[293px] items-center justify-end p-[31px] sm:px-5 w-full"
                    style={{ backgroundImage: "url('images/img_group6.svg')" }}
                  >
                    <div className="flex flex-col justify-start mt-[3px] w-[97%] md:w-full">
                      <div className="flex flex-row gap-[34px] items-center justify-start w-[86%] md:w-full">
                        <div className="flex flex-col items-center justify-start w-[33%]">
                          <div className="bg-light_green-600 flex flex-col items-center justify-start p-[7px] rounded-[15px] w-full">
                            <Img
                              className="h-[57px] md:h-auto object-cover w-[57px]"
                              src="images/img_image13.png"
                              alt="imageThirteen"
                            />
                          </div>
                        </div>
                        <Text
                          className="text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsBold16"
                        >
                          Application Name
                        </Text>
                      </div>
                      <Text
                        className="md:ml-[0] mt-[52px] mx-4 text-base text-indigo-800 tracking-[0.44px] w-[90%] sm:w-full"
                        size="txtPoppinsRegular16"
                      >
                        This is an application that does this work and makes
                        something easier to do
                      </Text>
                      <Button
                        className="cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[218px] mt-[18px] text-base text-center tracking-[0.44px]"
                        shape="round"
                        color="indigo_800_01"
                      >
                        + Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div
                    className="bg-cover bg-no-repeat flex flex-col h-[293px] items-center justify-end p-[31px] sm:px-5 w-full"
                    style={{ backgroundImage: "url('images/img_group6.svg')" }}
                  >
                    <div className="flex flex-col justify-start mt-[3px] w-[97%] md:w-full">
                      <div className="flex flex-row gap-[34px] items-center justify-start w-[86%] md:w-full">
                        <div className="flex flex-col items-center justify-start w-[33%]">
                          <div className="bg-light_green-600 flex flex-col items-center justify-start p-[7px] rounded-[15px] w-full">
                            <Img
                              className="h-[57px] md:h-auto object-cover w-[57px]"
                              src="images/img_image13.png"
                              alt="imageThirteen"
                            />
                          </div>
                        </div>
                        <Text
                          className="text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsBold16"
                        >
                          Application Name
                        </Text>
                      </div>
                      <Text
                        className="md:ml-[0] mt-[52px] mx-4 text-base text-indigo-800 tracking-[0.44px] w-[90%] sm:w-full"
                        size="txtPoppinsRegular16"
                      >
                        This is an application that does this work and makes
                        something easier to do
                      </Text>
                      <Button
                        className="cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[218px] mt-[18px] text-base text-center tracking-[0.44px]"
                        shape="round"
                        color="indigo_800_01"
                      >
                        + Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div
                    className="bg-cover bg-no-repeat flex flex-col h-[293px] items-center justify-end p-[31px] sm:px-5 w-full"
                    style={{ backgroundImage: "url('images/img_group6.svg')" }}
                  >
                    <div className="flex flex-col justify-start mt-[3px] w-[97%] md:w-full">
                      <div className="flex flex-row gap-[34px] items-center justify-start w-[86%] md:w-full">
                        <div className="flex flex-col items-center justify-start w-[33%]">
                          <div className="bg-light_green-600 flex flex-col items-center justify-start p-[7px] rounded-[15px] w-full">
                            <Img
                              className="h-[57px] md:h-auto object-cover w-[57px]"
                              src="images/img_image13.png"
                              alt="imageThirteen"
                            />
                          </div>
                        </div>
                        <Text
                          className="text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsBold16"
                        >
                          Application Name
                        </Text>
                      </div>
                      <Text
                        className="md:ml-[0] mt-[52px] mx-4 text-base text-indigo-800 tracking-[0.44px] w-[90%] sm:w-full"
                        size="txtPoppinsRegular16"
                      >
                        This is an application that does this work and makes
                        something easier to do
                      </Text>
                      <Button
                        className="cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[218px] mt-[18px] text-base text-center tracking-[0.44px]"
                        shape="round"
                        color="indigo_800_01"
                      >
                        + Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div
                    className="bg-cover bg-no-repeat flex flex-col h-[293px] items-center justify-end p-[31px] sm:px-5 w-full"
                    style={{ backgroundImage: "url('images/img_group6.svg')" }}
                  >
                    <div className="flex flex-col justify-start mt-[3px] w-[97%] md:w-full">
                      <div className="flex flex-row gap-[34px] items-center justify-start w-[86%] md:w-full">
                        <div className="flex flex-col items-center justify-start w-[33%]">
                          <div className="bg-light_green-600 flex flex-col items-center justify-start p-[7px] rounded-[15px] w-full">
                            <Img
                              className="h-[57px] md:h-auto object-cover w-[57px]"
                              src="images/img_image13.png"
                              alt="imageThirteen"
                            />
                          </div>
                        </div>
                        <Text
                          className="text-base text-indigo-800 tracking-[0.44px]"
                          size="txtPoppinsBold16"
                        >
                          Application Name
                        </Text>
                      </div>
                      <Text
                        className="md:ml-[0] mt-[52px] mx-4 text-base text-indigo-800 tracking-[0.44px] w-[90%] sm:w-full"
                        size="txtPoppinsRegular16"
                      >
                        This is an application that does this work and makes
                        something easier to do
                      </Text>
                      <Button
                        className="cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[218px] mt-[18px] text-base text-center tracking-[0.44px]"
                        shape="round"
                        color="indigo_800_01"
                      >
                        + Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppsPage;
