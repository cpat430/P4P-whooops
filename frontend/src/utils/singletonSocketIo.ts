import { io, Socket } from 'socket.io-client';

let singletonIo: Socket | null = null;

export const getSingletonSocketIo = (): Socket => {
  if (!singletonIo) {
    singletonIo = io();
  }
  return singletonIo;
};
