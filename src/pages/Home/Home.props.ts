import { HTMLAttributes } from 'react';

export type Message = {
  id: string;
  recepient: string;
  title: string;
  text: string;
  sender: string;
};

/**
 * Home Props
 */
interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

export type { HomeProps };
