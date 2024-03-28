import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// Define a theme with spacing and colors
const theme = createTheme({
  spacing: 2,
  palette: {
    primary: {
      main: '#1976d2', // Adjust color as needed
    },
    secondary: {
      main: '#f50057', // Adjust color as needed
    },
  },
});

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:3000/api/v1/logs', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.data && response.data.data && Array.isArray(response.data.data.logs)) {
          setLogs(response.data.data.logs); // Set the logs state if logs array is nested under data object
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleLogout = async () => {
    try {
      let token = localStorage.getItem('token');
      const response = await fetch("http://127.0.0.1:3000/api/v1/users/logout", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('photo');
        navigate("/signin");
      } else {
        console.error("Error logging out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            ProjectFlow Logs
          </Typography>
          <Button color="primary" variant="outlined" onClick={handleLogout}>Logout</Button>
        </Box>
        <Divider />
        {logs.map((log, index) => (
          <Paper key={log._id} elevation={3} style={{ backgroundColor: index % 2 === 0 ? '#f3f3f3' : '#e0e0e0', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
            {log.prevData && (
              <Box maxWidth="100%" overflow="auto">
                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Previous Data</Typography>
                <Typography variant="body1" gutterBottom>{JSON.stringify(log.prevData)}</Typography>
              </Box>
            )}
            {log.newData && (
              <Box maxWidth="100%" overflow="auto">
                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>New Data</Typography>
                <Typography variant="body1" gutterBottom>{JSON.stringify(log.newData)}</Typography>
              </Box>
            )}
            {log.updatedBy && (
              <>
                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Updated By</Typography>
                <Typography variant="body1" gutterBottom>{log.updatedBy}</Typography>
              </>
            )}
            {log.taskId && (
              <>
                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Task ID</Typography>
                <Typography variant="body1" gutterBottom>{log.taskId}</Typography>
              </>
            )}
            {log.projectId && (
              <>
                 <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Project ID</Typography>
                 <Typography variant="body1" gutterBottom>{log.projectId}</Typography>
              </>
            )}
            {log.userId && (
              <>
                  <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>User ID</Typography>
                  <Typography variant="body1" gutterBottom>{log.userId}</Typography>
              </>
            )}
            {log.typeofRequest==="create" && (
              <>
                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Created At</Typography>
            <Typography variant="body1" gutterBottom>{new Date(log.createdAt).toLocaleString()}</Typography>
              </>
            )}
            {log.typeofRequest==="update" && (
              <>
                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Updated At</Typography>
                <Typography variant="body1" gutterBottom>{new Date(log.updatedAt).toLocaleString()}</Typography>
              </>
            )}
            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>Type of Request</Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{
                color:
                  log.typeofRequest === 'create'
                    ? 'green'
                    : log.typeofRequest === 'delete'
                    ? 'red'
                    : log.typeofRequest === 'update'
                    ? 'orange'
                    : 'inherit', // Fallback to default color
              }}
            >
              {log.typeofRequest}
          </Typography>

          </Paper>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default LogsTable;
