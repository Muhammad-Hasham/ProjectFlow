import React, { useState, useEffect } from "react";
import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { Text } from "components";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const CalendarViewPage = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("Project 1"); // You can set the initial value
  const [selectedDate, setSelectedDate] = useState(null);

  // Simulate fetching project name from the database using a useEffect
  useEffect(() => {
    // Replace this with your API call to fetch project name
    const fetchProjectNameFromDatabase = async () => {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { projectName: "Project 1" }; // Replace with actual data
    };

    fetchProjectNameFromDatabase().then((data) => {
      setProjectName(data.projectName);
    });
  }, []);

  // Sample events data (replace with your own data)
  const events = [
    {
      title: "Meeting 1",
      start: new Date(2023, 9, 1, 10, 0),
      end: new Date(2023, 9, 1, 12, 0),
    },
    {
      title: "Meeting 2",
      start: new Date(2023, 9, 5, 14, 0),
      end: new Date(2023, 9, 5, 16, 0),
    },
    // Add more events here
  ];

  // Function to handle the date click event
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Filter events based on the selected date
  const filteredEvents = events.filter((event) =>
    moment(event.start).isSame(selectedDate, "day")
  );

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-start justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row gap-6 items-center justify-start md:px-5 w-[95%] md:w-full">
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
          <div className="flex flex-col md:gap-10 gap-[65px] items-center justify-start w-[77%] md:w-full">
            <div className="flex flex-col justify-start w-full">
              <Text
                className="md:ml-[0] ml-[891px] text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
                onClick={() => navigate("/myprofile")}
              >
                My Profile
              </Text>
              <Text
                className="md:ml-[0] ml-[27px] mt-[81px] sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
                size="txtPoppinsBold34"
              >
                {projectName}
              </Text>
              <div className="h-[33px] md:h-[70px] mt-11 relative w-full">
                <div className="absolute flex flex-col items-center justify-start left-[3%] top-[0] w-[64%]">
                  <div className="flex flex-row items-start justify-between w-full">
                    <Text
                      className="common-pointer mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                      onClick={() => navigate("/graphs")}
                    >
                      Analytics
                    </Text>
                    <Text
                      className="common-pointer text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                      onClick={() => navigate("/kanbanview")}
                    >
                      Kanban View
                    </Text>
                    <Text
                      className="mb-0.5 text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsBold16"
                    >
                      Calendar View
                    </Text>
                  </div>
                </div>
                <img
                  className="absolute bottom-[0] h-[11px] inset-x-[0] mx-auto"
                  src="images/img_line5.svg"
                  alt="lineFive"
                />
              </div>
            </div>
            <div className="bg-white-A700 border border-gray-200 border-solid flex flex-col font-inter gap-14 h-[800px] md:h-[600px] items-start justify-center max-w-[816px] pb-0.5 pt-[72px] rounded-[12px] shadow-bs w-full">
              <div className="flex flex-col items-center justify-start w-800">
                <Calendar
                  value={selectedDate} // Set the selected date
                  onChange={handleDateClick} // Handle date clicks
                  calendarType="US"
                  locale="en-US"
                  view="month"
                  tileContent={({ date, view }) => {
                    if (view === "month") {
                      // Customize the appearance of dates with events
                      const eventDates = events
                        .filter((event) => moment(event.start).isSame(date, "day"))
                        .map((event) => (
                          <div key={event.title}>{event.title}</div>
                        ));
                      return eventDates;
                    }
                    return null;
                  }}
                />
              </div>
              <div>
                {selectedDate && (
                  <div>
                    <h3>Events for {moment(selectedDate).format("MMMM D, YYYY")}</h3>
                    <ul>
                      {filteredEvents.map((event, index) => (
                        <li key={index}>{event.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarViewPage;
