import React, { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { Text } from 'components';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AppsIcon from '@mui/icons-material/Apps';

const Navigation = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (route) => {
    navigate(route);
    setSelectedMenuItem(route);
  };

  return (
    <div style={{ width: '23%', position: 'fixed', height: '100%',}}>
      <Sidebar
        style={{
         width: '100%',
          height: '100%',
          background: '#332941',
          cursor: 'pointer',
        }}
      >
        <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
          <animated.div>
            <Text style={{ color: '#FFF7F1', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)' }} className="font-bold text-[22px] text-center sm:text-lg md:text-xl">
              ProjectFlow
            </Text>
          </animated.div>
          <animated.div>
            <Text
              style={{ color: '#FFF7F1', cursor: 'pointer', backgroundColor: selectedMenuItem === '/dashboard' ? '#4A5568' : 'transparent' }}
              onClick={() => handleMenuItemClick('/dashboard')}
              className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
            >
              <DashboardIcon /> Dashboard
            </Text>
          </animated.div>
          <animated.div>
            <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
              <Text
                style={{ color: '#FFF7F1', cursor: 'pointer', backgroundColor: selectedMenuItem === '/myprojects' ? '#4A5568' : 'transparent' }}
                onClick={() => handleMenuItemClick('/myprojects')}
                className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]"
              >
                <AssignmentIcon /> Projects
              </Text>
              <Text
                style={{ color: '#FFF7F1', cursor: 'pointer', backgroundColor: selectedMenuItem === '/mytasks' ? '#4A5568' : 'transparent' }}
                onClick={() => handleMenuItemClick('/mytasks')}
                className="text-base text-indigo-800 tracking-[0.44px]"
              >
                <ListAltIcon /> My Tasks
              </Text>
              <Text
                style={{ color: '#FFF7F1', cursor: 'pointer', backgroundColor: selectedMenuItem === '/apps' ? '#4A5568' : 'transparent' }}
                onClick={() => handleMenuItemClick('/apps')}
                className="md:ml-[0] ml-[7px] text-base text-indigo-800 tracking-[0.44px]"
              >
                <AppsIcon /> Apps
              </Text>
            </div>
          </animated.div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Navigation;
