import React from 'react';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ChatProps } from './Chat.props';

/**
 * Renders Chat
 */
const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <Stack spacing={2}>
      <Typography variant='h4'>
        Messages with {messages[0].recepient}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='right'>Title</TableCell>
              <TableCell align='right'>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => {
              const { id, title, text } = message;

              return (
                <TableRow
                  key={id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer'
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {id}
                  </TableCell>
                  <TableCell align='right'>{title}</TableCell>
                  <TableCell align='right'>{text}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export { Chat };
