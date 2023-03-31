import React, { useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [timeSpent, setTimeSpent] = useState({});

  const addProject = (title) => {
    setProjects([...projects, { title }]);
  };

  const addTask = (title, projectId) => {
    setTasks([...tasks, { title, projectId }]);
  };

  const trackTime = (taskId, time) => {
    setTimeSpent({ ...timeSpent, [taskId]: (timeSpent[taskId] || 0) + time });
  };

  return (
    <div id='body'>
        <div>Project Manager</div>
        <div id="project-body">
          <div>Projects</div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.elements.title.value;
            addProject(title);
            e.target.reset();
          }}>
            <input type="text" name="title" placeholder="Project Title" required />
            <button type="submit">Create Project</button>
          </form>

          <div>
            {projects.map((project, index) => (
              <div key={index}>{project.title}</div>
            ))}
          </div>
        </div>

        <div className="tasks">
          <div>Tasks</div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.elements.title.value;
            const projectId = e.target.elements.projectId.value;
            addTask(title, projectId);
            e.target.reset();
          }}>
            <input type="text" name="title" placeholder="Task Title" required />
            <select name="projectId" required>
              <option value="">Select a project</option>
              {projects.map((project, index) => (
                <option key={index} value={index}>{project.title}</option>
              ))}
            </select>
            <button type="submit">Create Task</button>
          </form>

          <div>
            {tasks.map((task, index) => (
              <div key={index}>
                <div className="task-header">
                  <div className="task-title">{task.title}</div>
                  <div className="task-project">{projects[task.projectId].title}</div>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const time = parseInt(e.target.elements.time.value);
                  trackTime(index, time);
                  e.target.reset();
                }}>
                  <input type="number" name="time" placeholder="Time Spent (in minutes)" required />
                  <button type="submit">Track Time</button>
                </form>
                <div className="task-time">Time Spent: {timeSpent[index] || 0} minutes</div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default App;