import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const LogsTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs from API
    axios.get('/api/logs')
      .then(response => {
        setLogs(response.data); // Assuming the API returns an array of logs
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
      <TableHead style={{backgroundColor: '#F7F1E5'}}>
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
