import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { collection, query, where, getDocs } from 'firebase/firestore';

import { firestoreDB, messagesTable } from '../../firebase';

import { SendMessageForm } from './Send-Message-Form';
import { Chat } from './Chat';
import { HomeProps, Message } from './Home.props';

const getUniqueChats = (chats: Message[]) => {
  return [...new Map(chats.map((chat) => [chat['recepient'], chat])).values()];
};

/**
 * Renders Home
 */
const Home: React.FC<HomeProps> = () => {
  const [messages, setMessages] = useState([] as Array<Message>);
  const [selectedRecepient, setSelectedRecepient] =
    useState<Message['recepient']>('');

  const selectedChat = useMemo(() => {
    return messages.filter(
      (message) => message.recepient === selectedRecepient
    );
  }, [messages, selectedRecepient]);

  const handleSelectChat = (recepient: string) => {
    setSelectedRecepient(recepient);
  };

  const fetchMessages = useCallback(async () => {
    let messages: Array<Message> = [];
    const username = sessionStorage.getItem('username');
    const q = query(
      collection(firestoreDB, messagesTable),
      where('sender', '==', username)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const message = {
        id: doc.id,
        ...doc.data()
      } as Message;

      messages.push(message);
    });

    return messages;
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const messages = await fetchMessages();
      setMessages(messages);
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  const uniqueChats = getUniqueChats(messages);

  return (
    <>
      <Stack p={2} spacing={10}>
        <Stack>
          <Typography variant='h4'>Recepients List</Typography>
          <TableContainer
            component={Paper}
            sx={{
              mt: 2,
              mb: 4
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Recepient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueChats.map((chat) => {
                  const { id, recepient } = chat;

                  return (
                    <TableRow
                      key={id}
                      onClick={() => handleSelectChat(recepient)}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {recepient}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <SendMessageForm />
        </Stack>
        {Boolean(selectedRecepient) && <Chat messages={selectedChat} />}
      </Stack>
    </>
  );
};

export { Home };
