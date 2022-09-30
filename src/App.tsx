import React from 'react';
import { Stack } from '@mui/system';

import { Router } from './Router';

function App() {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Router />
    </Stack>
  );
}

export default App;
