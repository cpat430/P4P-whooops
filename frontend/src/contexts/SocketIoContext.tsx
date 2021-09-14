import React, { createContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// The entire frontend should access this socket io if necessary
const singletonIo = io();

export const SocketIoContext = createContext<Socket>(singletonIo);

export const SocketIoProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  return (
    <SocketIoContext.Provider value={singletonIo}>
      {children}
    </SocketIoContext.Provider>
  );
};
