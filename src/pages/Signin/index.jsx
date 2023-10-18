import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Line, Text } from "components";

const SigninPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white-A700 font-poppins h-[1024px] mx-auto md:pl-10 sm:pl-5 pl-[94px] relative w-full">
        <div className="absolute bg-gradient1  flex sm:flex-col flex-row sm:gap-5 h-full inset-y-[0] items-start justify-end my-auto p-12 md:px-5 right-[0] w-1/2">
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
            onClick={() => navigate("/signin")}
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
        <div className="absolute bg-gray-50 flex flex-col h-max inset-[0] justify-center m-auto max-w-[1023px] p-[42px] md:px-5 rounded-[30px] w-full">
          <a
            href="javascript:"
            className="mt-[30px] mx-auto text-center text-indigo-800 text-xl"
          >
            <Text size="txtPoppinsBold20">Sign In</Text>
          </a>
          <Text
            className="md:ml-[0] ml-[104px] mr-[716px] mt-[73px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
          >
            Email Address
          </Text>
          <Line className="bg-indigo-800_01 h-px md:ml-[0] ml-[257px] mr-[81px] mt-1 w-[65%]" />
          <Text
            className="md:ml-[0] ml-[104px] mr-[755px] mt-[72px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
          >
            Password
          </Text>
          <Line className="bg-indigo-800_01 h-px md:ml-[0] ml-[257px] mr-[81px] mt-[3px] w-[65%]" />
          <Button
            className="common-pointer cursor-pointer leading-[normal] min-w-[109px] mt-[77px] mx-auto text-base text-center tracking-[0.44px]"
            onClick={() => navigate("/dashboard")}
            shape="round"
            color="indigo_800"
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
