import React, { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { Button, Img, Text } from 'components';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const Navigation=() => {
  const navigate = useNavigate();
return (
  <div style={{ width: '23%', position: 'relative', backgroundColor: '#EDEFF5' }}>
        <Sidebar
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #EDEFF5 0%, #99BC85 100%)',
            cursor: 'pointer',
          }}
        >
          <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
            <animated.div>
              <Text className="font-bold text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl">
                ProjectFlow
              </Text>
            </animated.div>
            <animated.div>
              <Text onClick={() => navigate('/dashboard')} className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]">
                Dashboard
              </Text>
            </animated.div>
            <animated.div>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text onClick={() => navigate('/myprojects')} className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]">
                  Projects
                </Text>
                <Text onClick={() => navigate('/mytasks')} className="text-base text-indigo-800 tracking-[0.44px]">
                  My Tasks
                </Text>
                <Text onClick={() => navigate('/apps')} className="md:ml-[0] ml-[7px] text-base text-indigo-800 tracking-[0.44px]">
                  Apps
                </Text>
              </div>
            </animated.div>
          </div>
        </Sidebar>

      </div>
      
      )

        }

export default Navigation;