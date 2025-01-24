import React, { useState } from "react";
import instance from "../services/axiosInstance";
import "./AdminProjectList.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";

const AdminProjectList = ({ projects, fetchProjects }) => {
  const [assignmentInputs, setAssignmentInputs] = useState({});
  const [removalInputs, setRemovalInputs] = useState({});
  const [users1, setUsers1] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (projectId, userId) => {
    setAssignmentInputs((prevState) => ({
      ...prevState,
      [projectId]: userId,
    }));
  };

  const handleRemoveInputChange = (projectId, userId) => {
    setRemovalInputs((prevState) => ({
      ...prevState,
      [projectId]: userId,
    }));
  };

  const handleViewProject = async (project) => {
    try {
      const response = await instance.get(
        `/api/v1/projects/${project?.uuid}/task_breakdown`
      );

      navigate("/view", { state: { taskList: response?.data } });
    } catch (error) {
      console.error("Error during user removal:", error);
    }
  };

  const handleDropdownOpen = async (projectId) => {
    try {
      const response = await instance.get(
        `/api/v1/users/assigned_users?project_id=${projectId}`
      );
      setUsers1(response.data);
    } catch (error) {
      console.error("Error fetching assigned users", error);
    }
  };

  const handleRemove = async (projectId, userId) => {
    if (!userId) {
      console.error("Please select a user to remove.");
      return;
    }

    try {
      const payload = {
        user_id: userId,
        project_id: projectId,
      };

      const response = await instance.delete("/api/v1/projects/remove_user", {
        data: payload,
      });

      if (response.status === 200) {
        console.log("User removed successfully:", response.data);
        fetchProjects();
      } else {
        console.error("Failed to remove user from project");
      }
    } catch (error) {
      console.error("Error during user removal:", error);
    }
  };

  const handleAssign = async (projectId) => {
    const assignedUserId = assignmentInputs[projectId];
    const userIdAsNumber = Number(assignedUserId);

    if (userIdAsNumber) {
      try {
        const payload = {
          user_id: userIdAsNumber,
          project_id: projectId,
        };

        const response = await instance.post("/api/v1/assign_user", payload);
        if (response.status === 200) {
          setAssignmentInputs((prevState) => ({
            ...prevState,
            [projectId]: "",
          }));
          fetchProjects();
        } else {
          console.error("Failed to assign user to project");
        }
      } catch (error) {
        console.error("Error during assignment:", error);
      }
    } else {
      console.error("Please select a user to assign.");
    }
  };

  return (
    <div className="admin-container">
      <table className="admin-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">S.No</th>
            <th className="table-header">Project Name</th>
            <th className="table-header">Assigned Users</th>
            <th className="table-header">Assign Users</th>
            <th className="table-header">Remove Assigned User</th>
            <th className="table-header">View Project</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project, projectIndex) => (
            <tr key={project.id} className="table-row">
              <td className="table-cell">{projectIndex + 1}</td>
              <td className="table-cell">{project.name}</td>
              <td className="table-cell">
                {project?.users && project?.users?.length > 0 ? (
                  <ul>
                    {project.users.map((user) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                ) : (
                  "No users assigned"
                )}
              </td>

              <td className="table-cell">
                <div className="action-container">
                  <select
                    value={assignmentInputs[project.id] || ""}
                    onChange={(e) =>
                      handleInputChange(project.id, e.target.value)
                    }
                    onFocus={() => handleDropdownOpen(project?.id)}
                    className="input-field"
                  >
                    <option value="">Select User</option>
                    {users1 && users1.length > 0 ? (
                      users1.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No User Available</option>
                    )}
                  </select>
                  <button
                    onClick={() => handleAssign(project.id)}
                    className="assign-button"
                  >
                    Assign
                  </button>
                </div>
              </td>
              <td className="table-cell">
                <div className="action-container">
                  <select
                    value={removalInputs[project.id] || ""}
                    onChange={(e) =>
                      handleRemoveInputChange(project.id, e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">Select User</option>
                    {project.users && project?.users?.length > 0 ? (
                      project.users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No User Available</option>
                    )}
                  </select>
                  <button
                    onClick={() =>
                      handleRemove(project.id, removalInputs[project.id])
                    }
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleViewProject(project);
                  }}
                  className="view-project-button"
                >
                  View Project
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectList;
