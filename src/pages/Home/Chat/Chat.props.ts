import { HTMLAttributes } from 'react';
import { Message } from '../Home.props';

/**
 * Chat Props
 */
interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  readonly messages: Array<Message>;
}

export type { ChatProps };
