import React, { useState } from "react";
import CreateNewTask from "./CreateNewTask";
import "./UserProjectList.css";

const UserProjectList = ({ projects, fetchProjects }) => {
  const [addTask, setAddTask] = useState(false);
  const [projectId, setProjectId] = useState(null);

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">S.No</th>
            <th className="table-header">Project Name</th>
            <th className="table-header">Tasks</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, projectIndex) => (
            <tr key={project.id} className="table-row">
              <td className="table-cell">{projectIndex + 1}</td>
              <td className="table-cell">{project.name}</td>
              <td className="table-cell">
                {project.tasks && project.tasks.length > 0 ? (
                  <ul>
                    {project?.tasks?.map((user) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                ) : (
                  "No Task assigned"
                )}
                {/* No Task added */}
              </td>
              <td className="table-cell">
                <div className="action-container">
                  <button
                    className="assign-button"
                    onClick={() => {
                      setAddTask(true);
                      setProjectId(project.uuid);
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addTask && (
        <CreateNewTask
          projectId={projectId}
          fetchProjects={fetchProjects}
          open={addTask}
          onClose={() => setAddTask(false)}
        />
      )}
    </div>
  );
};

export default UserProjectList;
