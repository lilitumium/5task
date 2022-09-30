import React, { useState } from 'react';
import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { firestoreDB, usersTable } from '../../firebase';

import { WelcomeProps } from './Welcome.props';

/**
 * Renders Welcome
 */
const Welcome: React.FC<WelcomeProps> = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUsername(value);
  };

  const handleSubmit = async () => {
    if (username) {
      setIsError(false);

      await setDoc(doc(firestoreDB, usersTable, uuidv4()), {
        username
      });

      sessionStorage.setItem('username', username);

      navigate('/chats');
    } else {
      setIsError(true);
    }
  };

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      maxWidth='md'
      mx='auto'
      flexGrow={1}
    >
      <Typography variant='h2'>Welcome</Typography>
      <Typography>Please input your username to continue</Typography>
      <TextField
        fullWidth
        label='Username'
        value={username}
        onChange={handleChange}
        error={isError}
        sx={{
          mt: 4
        }}
      />
      {isError && (
        <FormHelperText
          sx={{
            color: 'error.main'
          }}
        >
          Username is required
        </FormHelperText>
      )}
      <Button
        variant='contained'
        size='large'
        onClick={handleSubmit}
        sx={{
          mt: 2
        }}
      >
        Continue
      </Button>
    </Stack>
  );
};

export { Welcome };
