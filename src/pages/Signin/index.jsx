import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "components";

const SigninPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white-A700 font-poppins h-[1024px] mx-auto md:pl-10 sm:pl-5 pl-[94px] relative w-full">
        <div className="absolute bg-gradient1 flex sm:flex-col flex-row sm:gap-5 h-full inset-y-[0] items-start justify-end my-auto p-12 md:px-5 right-[0] w-1/2">
          <Text
            className="sm:mt-0 mt-[27px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
          >
            Pricing
          </Text>
          <Text
            className="sm:ml-[0] ml-[93px] sm:mt-0 mt-[27px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
          >
            Academy
          </Text>
          <Text
            className="sm:ml-[0] ml-[79px] sm:mt-0 mt-[27px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
          >
            Signin
          </Text>
          <Button
            className="common-pointer cursor-pointer leading-[normal] mb-[867px] min-w-[109px] sm:ml-[0] ml-[92px] sm:mt-0 mt-[13px] text-base text-center tracking-[0.44px]"
            onClick={() => navigate("/signup")}
            shape="round"
            color="indigo_800"
          >
            Signup
          </Button>
        </div>
        <Text
          className="absolute left-[9%] text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl top-[7%]"
          size="txtPoppinsBold22"
          onClick={() => navigate("/")}
        >
          ProjectFlow
        </Text>
        <div className="absolute bg-gray-50 flex flex-col h-max inset-[0] items-start justify-center m-auto max-w-[1023px] p-[42px] md:px-5 rounded-[30px] w-full">
          <div className="flex flex-col md:gap-10 gap-[61px] justify-start md:ml-[0] ml-[104px] mt-[30px] w-[71%] md:w-full">
            <a
              href="javascript:"
              className="md:ml-[0] ml-[331px] text-center text-indigo-800 text-xl"
            >
              <Text size="txtPoppinsBold20">Sign In</Text>
            </a>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between w-full">
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                >
                  Email Address
                </Text>
                <input
                  type="email"
                  className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[73%]"
                  
                />
              </div>
              <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between mt-[53px] w-full">
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                >
                  Password
                </Text>
                <input
                  type="password"
                  className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[73%]"
                  
                />
              </div>
              <Button
                className="common-pointer cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[311px] mt-[70px] text-base text-center tracking-[0.44px]"
                onClick={() => navigate("/dashboard")}
                shape="round"
                color="indigo_800"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
