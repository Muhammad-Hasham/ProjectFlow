import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const LogsTable = () => {
  const [logs, setLogs] = useState([]);

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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: '#F7F1E5' }}>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" align="center">Previous Data</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">New Data</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">Updated By</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">Task ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">Project ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">User ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">Created At</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">Updated At</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" align="center">Type of Request</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map(log => (
            <TableRow key={log._id}>
              <TableCell>{JSON.stringify(log.prevData)}</TableCell>
              <TableCell>{JSON.stringify(log.newData)}</TableCell>
              <TableCell>{log.updatedBy}</TableCell>
              <TableCell>{log.taskId}</TableCell>
              <TableCell>{log.projectId}</TableCell>
              <TableCell>{log.userId}</TableCell>
              <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(log.updatedAt).toLocaleString()}</TableCell>
              <TableCell>{log.typeofRequest}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
