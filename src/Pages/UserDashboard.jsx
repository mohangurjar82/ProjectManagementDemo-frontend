import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import UserProjectList from "../Components/UserProjectList";
import { UserContext } from "../Components/userContext";
import instance from "../services/axiosInstance";
import Navbar from "../Components/Navbar";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const { userDetail } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetail?.user?.uuid) {
      instance
        .get(`/api/v1/users/${userDetail?.user?.uuid}/projects`)
        .then((response) => setProjects(response.data))
        .catch((error) => console.error(error));
    }
  }, [userDetail]);

  const fetchProjects = async () => {
    if (userDetail?.user?.uuid) {
      try {
        const response = await instance.get(
          `/api/v1/users/${userDetail?.user?.uuid}/projects`
        );
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar userDetail={userDetail?.user} onLogout={() => navigate("/")} />
      <div className="dashboard-container">
        <UserProjectList fetchProjects={fetchProjects} projects={projects} />
      </div>
    </>
  );
};

export default UserDashboard;
