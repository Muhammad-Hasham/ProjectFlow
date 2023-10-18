import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "components";

const SignuprolePage = () => {
  const navigate = useNavigate();

  const roles = ["Project Manager", "Team Member", "Client"];

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
            className="sm:ml-[0] ml-[79px] sm:mt-0 mt-[27px] text-base text-indigo_800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
            onClick={() => navigate("/signin")}
          >
            Signin
          </Text>
          <Button
            className="cursor-pointer leading-[normal] mb-[867px] min-w-[109px] sm:ml-[0] ml-[92px] sm:mt-0 mt-[13px] text-base text-center tracking-[0.44px]"
            shape="round"
            color="indigo_800"
            onClick={() => navigate("/signup")}
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
        <div className="absolute bg-gray-50 flex flex-col h-max inset-[0] items-center justify-center m-auto max-w-[1023px] p-10 md:px-5 rounded-[30px] w-full">
          <div className="flex flex-col justify-start mb-1.5 w-[33%] md:w-full">
            <a
              href="javascript:"
              className="ml-28 md:ml-[0] text-center text-indigo-800 text-xl"
            >
              <Text size="txtPoppinsBold20">Sign Up</Text>
            </a>
            <Text
              className="mt-11 text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
            >
              What is your role in the organization?
            </Text>
            <div className="flex flex-row gap-[65px] items-center justify-end md:ml-[0] ml-[41px] mt-[39px] w-[84%] md:w-full">
              <Text
                className="text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
              >
                Role
              </Text>
              <select
                className="flex flex-col h-[38px] md:h-auto items-center justify-center w-[159px] rounded-md border border-indigo-800"
                defaultValue={roles[0]}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="common-pointer cursor-pointer leading-[normal] min-w-[109px] md:ml-[0] ml-[97px] mr-[105px] mt-[83px] text-base text-center tracking-[0.44px]"
              onClick={() => navigate("/dashboard")}
              shape="round"
              color="indigo_800"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignuprolePage;
