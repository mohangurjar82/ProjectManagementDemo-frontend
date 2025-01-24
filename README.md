# Project Management System

This project is a **Project Management System** built with React, designed to streamline the management of projects and tasks. It provides two main user views: Admin and User. Each view is tailored to meet the specific needs of its respective users.

## Features

### User View

- **Project Overview**: Displays the names of all projects the user is assigned to.
- **Task Management**: Allows users to view and add tasks for a specific project.

### Admin View

- **Project Management**:
  - Displays the names of all active projects.
  - Shows the list of users assigned to each project.
  - Provides options to assign or unassign users to/from projects.
- **Detailed Task View**:
  - Includes a "View Project" button for each project, redirecting to a detailed breakdown of tasks.
  - Show Total Hours
  - Displays task breakdown with the following details:
    - Task name
    - Start time
    - End time
    - Duration
    - Description
  - Calculates and shows the total hours spent on the project.

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

## Setup and Installation

1. **Clone the Repository**  
   Clone the project repository from your version control system to your local machine.

   ```bash
   git clone "https://github.com/mohangurjar82/ProjectManagementDemo-frontend.git"
   ```

2. cd <project-directory...>

3. npm install (use '--force' if dependencies not installed properly)

4. Set ENV variable - REACT_APP_API_BASE_URL= http://localhost:3001

5. npm run start
