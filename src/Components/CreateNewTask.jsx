import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  CircularProgress,
} from "@mui/material";
import instance from "../services/axiosInstance";

const CreateNewTask = ({ open, onClose, projectId, fetchProjects }) => {
  const [taskName, settaskName] = useState("");
  const [taskDescription, settaskDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAllTasks = () => {
    instance
      .get(`/api/v1/projects/${projectId}/tasks`)
      .then((response) => {
        fetchProjects();
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      name: taskName,
      description: taskDescription,
      start_time: startTime,
      end_time: endTime,
      duration: Number(duration),
    };

    instance
      .post(`/api/v1/projects/${projectId}/tasks`, requestBody)
      .then((response) => {
        getAllTasks();
        onClose();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    settaskName("");
    settaskDescription("");
    setStartTime("");
    setEndTime("");
    setDuration(0);
    onClose();
  };

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (end > start) {
        const diffInMilliseconds = end - start;
        const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
        setDuration(diffInHours.toFixed(2));
      } else {
        setDuration(0);
      }
    }
  }, [startTime, endTime]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: "green", textAlign: "center" }}>
        Add Task
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Task Name"
              value={taskName}
              onChange={(e) => settaskName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Task Description"
              value={taskDescription}
              onChange={(e) => settaskDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Start Time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="End Time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Duration (hours)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              inputProps={{ min: 1 }}
              required
              disabled
            />
          </FormControl>

          {loading && (
            <CircularProgress size={24} style={{ marginLeft: "50%" }} />
          )}

          <DialogActions>
            <Button
              onClick={handleClose}
              color="danger"
              variant="outlined"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="success"
              variant="outlined"
              disabled={loading}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewTask;
