import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="dhiwise-navigation">
      <ul>
        <li>
          <Link to="/">Startingpage</Link>
        </li>
        <li>
          <Link to="/myprofile">MyProfile</Link>
        </li>
        <li>
          <Link to="/myprojects">MyProjects</Link>
        </li>
        <li>
          <Link to="/signin">Signin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/signuprole">Signuprole</Link>
        </li>
        <li>
          <Link to="/kanbanview">Kanbanview</Link>
        </li>
        <li>
          <Link to="/newtask">NewTask</Link>
        </li>
        <li>
          <Link to="/apps">Apps</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/mytasks">MyTasks</Link>
        </li>
        <li>
          <Link to="/graphs">Graphs</Link>
        </li>
        <li>
          <Link to="/calendarview">CalendarView</Link>
        </li>
        <li>
          <Link to="/newproject">NewProject</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
