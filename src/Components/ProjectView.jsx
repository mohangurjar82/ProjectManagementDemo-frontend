import React, { useContext } from "react";
import { UserContext } from "./userContext";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectView = () => {
  const { userDetail } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { taskList } = location.state || {};

  return (
    <div>
      <Navbar
        projectDetail={taskList}
        projectView={true}
        userDetail={userDetail?.user}
        onLogout={() => navigate("/")}
      />
      <div>
        <table className="admin-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">S.No</th>
              <th className="table-header">Task Name</th>
              <th className="table-header">Task Description</th>
              <th className="table-header">Start Time</th>
              <th className="table-header">End Time</th>
              <th className="table-header">Durations</th>
            </tr>
          </thead>
          <tbody>
            {taskList?.tasks?.length > 0 ? (
              taskList.tasks.map((project, projectIndex) => (
                <tr key={project.id} className="table-row">
                  <td className="table-cell">{projectIndex + 1}</td>
                  <td className="table-cell">{project.task}</td>
                  <td className="table-cell">{project.description}</td>
                  <td className="table-cell">{project.start_time}</td>
                  <td className="table-cell">{project.end_time}</td>
                  <td className="table-cell">{project.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  style={{ textAlign: "center", margin: "50px" }}
                  colSpan="6"
                  className="table-cell"
                >
                  No Task Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectView;
