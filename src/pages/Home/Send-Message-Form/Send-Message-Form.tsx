import React, { ChangeEvent, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { firestoreDB, messagesTable } from '../../../firebase';
import { isEmptyObject } from '../../../helpers';

import { SendMessageFormProps } from './Send-Message-Form.props';

/**
 * Renders SendMessageModal
 */
const SendMessageForm: React.FC<SendMessageFormProps> = () => {
  const username = sessionStorage.getItem('username');
  const [formValues, setFormValues] = useState({
    recepient: '',
    title: '',
    text: ''
  });

  const handleSubmit = async () => {
    const { recepient, title, text } = formValues || {};

    if (!isEmptyObject(formValues)) {
      await setDoc(doc(firestoreDB, messagesTable, uuidv4()), {
        sender: username,
        recepient,
        title,
        text
      });
    }

    setFormValues({
      recepient: '',
      title: '',
      text: ''
    });
  };

  const handleChangeRecepient = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const recepient = e.target.value;

    setFormValues({
      ...formValues,
      recepient
    });
  };

  const handleChangeTitle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const title = e.target.value;

    setFormValues({
      ...formValues,
      title
    });
  };

  const handleChangeMessage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = e.target.value;

    setFormValues({
      ...formValues,
      text
    });
  };

  return (
    <Stack>
      <Card
        sx={{
          mx: 'auto',
          width: '400px',
          p: 2
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <Typography variant='h6'>Send Message</Typography>
        </Stack>
        <Stack spacing={3}>
          <TextField
            value={formValues.recepient}
            fullWidth
            label='Recepient'
            onChange={handleChangeRecepient}
          />
          <TextField
            value={formValues.title}
            fullWidth
            label='Title'
            onChange={handleChangeTitle}
          />
          <TextField
            value={formValues.text}
            fullWidth
            label='Message'
            multiline
            rows={5}
            onChange={handleChangeMessage}
          />
        </Stack>
        <Button
          fullWidth
          size='large'
          variant='contained'
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Card>
    </Stack>
  );
};

export { SendMessageForm };
