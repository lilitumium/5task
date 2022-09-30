import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, NotFound, Welcome } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/chats',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export { Router };
