import React, { useState, useEffect, useContext } from "react";
import AdminProjectList from "../Components/AdminProjectList";
import "./style.css";
import { UserContext } from "../Components/userContext";
import instance from "../services/axiosInstance";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const { userDetail } = useContext(UserContext);

  useEffect(() => {
    if (userDetail?.user?.uuid) {
      instance
        .get(`/api/v1/projects/active`)
        .then((response) => setProjects(response.data))
        .catch((error) => console.error(error));
    }
  }, [userDetail]);

  const fetchProjects = async () => {
    if (userDetail?.user?.uuid) {
      try {
        const response = await instance.get(`/api/v1/projects/active`);
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
        <AdminProjectList fetchProjects={fetchProjects} projects={projects} />
      </div>
    </>
  );
};

export default AdminDashboard;
