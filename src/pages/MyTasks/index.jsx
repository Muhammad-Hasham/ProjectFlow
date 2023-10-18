import React from "react";

import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

import { Button, Img, Line, SelectBox, Text } from "components";

const dropdownboxOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const dropdownboxOneOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const MyTasksPage = () => {
  const navigate = useNavigate();

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
                onClick={() => navigate("/")}
              >
                ProjectFlow
              </Text>
              <Text
                className="common-pointer ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
                onClick={() => navigate("/dashboard")}
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
                  className="text-base text-indigo-800 tracking-[0.44px]"
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
          <div className="flex flex-col items-end justify-start w-[73%] md:w-full">
            <Text
              className="common-pointer text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start mt-[87px] w-[95%] md:w-full">
              <Text
                className="md:mt-0 mt-1 sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
                size="txtPoppinsBold34"
              >
                My Tasks
              </Text>
              <SelectBox
                className="font-medium h-10 md:ml-[0] ml-[216px] md:mt-0 mt-[7px] sm:px-5 px-[34px] text-left text-xs tracking-[0.36px] w-[18%] md:w-full"
                placeholderClassName="text-blue_gray-900"
                indicator={
                  <Img
                    className="h-[38px] w-[38px]"
                    src="images/img_arrowdown.svg"
                    alt="arrow_down"
                  />
                }
                isMulti={false}
                name="dropdownbox"
                options={dropdownboxOptionsList}
                isSearchable={false}
                placeholder="Sort"
                color="white_A700"
                variant="underline"
              />
              <SelectBox
                className="font-medium h-10 md:ml-[0] ml-[38px] md:mt-0 mt-[7px] sm:px-5 px-[34px] text-left text-xs tracking-[0.36px] w-[22%] md:w-full"
                placeholderClassName="text-blue_gray-900"
                indicator={
                  <Img
                    className="h-[38px] w-[38px]"
                    src="images/img_arrowdown.svg"
                    alt="arrow_down"
                  />
                }
                isMulti={false}
                name="dropdownbox_One"
                options={dropdownboxOneOptionsList}
                isSearchable={false}
                placeholder="Project"
                color="white_A700"
                variant="underline"
              />
              <Button
                className="common-pointer cursor-pointer leading-[normal] mb-[7px] min-w-[109px] md:ml-[0] ml-[31px] text-base text-center tracking-[0.44px]"
                onClick={() => navigate("/newtask")}
                shape="round"
                color="indigo_800_01"
              >
                Create
              </Button>
            </div>
            <div className="h-[636px] sm:h-[697px] md:h-[785px] mt-[62px] relative w-full">
              <div className="absolute bg-gray-50 flex flex-col h-full inset-[0] items-center justify-center m-auto p-[35px] sm:px-5 rounded-[30px] w-full">
                <div className="flex flex-col items-start justify-start mt-[13px] w-[95%] md:w-full">
                  <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start md:ml-[0] ml-[31px] w-[92%] md:w-full">
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Due
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[270px] md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Completed
                    </Text>
                    <Text
                      className="mb-0.5 md:ml-[0] ml-[299px] text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Overdue
                    </Text>
                  </div>
                  <Line className="bg-indigo-800 h-px mt-4 w-full" />
                  <div className="flex flex-col gap-[38px] items-start justify-start md:ml-[0] ml-[31px] mt-7 w-[57%] md:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        <span className="text-indigo-800 font-poppins text-left font-bold">
                          <>
                            Task #1
                            <br />
                          </>
                        </span>
                        <span className="text-indigo-800 font-poppins text-left font-normal">
                          <>
                            Due: 01/01/23
                            <br />
                            Priority:{" "}
                          </>
                        </span>
                        <span className="text-orange-A700 font-poppins text-left font-normal">
                          Medium
                        </span>
                      </Text>
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        <span className="text-indigo-800 font-poppins text-left font-bold">
                          <>
                            Task #1
                            <br />
                          </>
                        </span>
                        <span className="text-indigo-800 font-poppins text-left font-normal">
                          <>
                            Due: 01/01/23
                            <br />
                            Priority:{" "}
                          </>
                        </span>
                        <span className="text-deep_orange-500_01 font-poppins text-left font-normal">
                          Medium
                        </span>
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        <span className="text-indigo-800 font-poppins text-left font-bold">
                          <>
                            Task #1
                            <br />
                          </>
                        </span>
                        <span className="text-indigo-800 font-poppins text-left font-normal">
                          <>
                            Due: 02/01/23
                            <br />
                            Priority:{" "}
                          </>
                        </span>
                        <span className="text-red-700_01 font-poppins text-left font-normal">
                          High
                        </span>
                      </Text>
                      <Text
                        className="text-base text-indigo-800 tracking-[0.44px]"
                        size="txtPoppinsBold16"
                      >
                        <span className="text-indigo-800 font-poppins text-left font-bold">
                          <>
                            Task #1
                            <br />
                          </>
                        </span>
                        <span className="text-indigo-800 font-poppins text-left font-normal">
                          <>
                            Due: 01/01/23
                            <br />
                            Priority:{" "}
                          </>
                        </span>
                        <span className="text-deep_orange-500_01 font-poppins text-left font-normal">
                          Medium
                        </span>
                      </Text>
                    </div>
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsBold16"
                    >
                      <span className="text-indigo-800 font-poppins text-left font-bold">
                        <>
                          Task #1
                          <br />
                        </>
                      </span>
                      <span className="text-indigo-800 font-poppins text-left font-normal">
                        <>
                          Due: 03/01/23
                          <br />
                          Priority:{" "}
                        </>
                      </span>
                      <span className="text-green-A700 font-poppins text-left font-normal">
                        Normal
                      </span>
                    </Text>
                    <Text
                      className="text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsBold16"
                    >
                      <span className="text-indigo-800 font-poppins text-left font-bold">
                        <>
                          Task #1
                          <br />
                        </>
                      </span>
                      <span className="text-indigo-800 font-poppins text-left font-normal">
                        <>
                          Due: 04/01/23
                          <br />
                          Priority:{" "}
                        </>
                      </span>
                      <span className="text-orange-A700 font-poppins text-left font-normal">
                        Medium
                      </span>
                    </Text>
                  </div>
                </div>
              </div>
              <Text
                className="absolute right-[0] text-base text-indigo-800 top-[19%] tracking-[0.44px]"
                size="txtPoppinsBold16"
              >
                <span className="text-indigo-800 font-poppins text-left font-bold">
                  <>
                    Task #1
                    <br />
                  </>
                </span>
                <span className="text-indigo-800 font-poppins text-left font-normal">
                  <>
                    Due: 01/01/23
                    <br />
                    Priority:{" "}
                  </>
                </span>
                <span className="text-green-A700_01 font-poppins text-left font-normal">
                  Normal
                </span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTasksPage;
