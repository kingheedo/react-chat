import { useCallback } from 'react';
import { Socket, io } from 'socket.io-client';

type Sockets = {
  [key: string]: Socket;
};

type ReturnType = {
  socket: Socket | undefined;
  disconnect: () => void;
};

const sockets: Sockets = {};

const useSocket = (workspace: string): ReturnType => {
  if (!workspace) {
    return {
      socket: undefined,
      disconnect: () => null,
    };
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io(`http://localhost:3095/ws-${workspace}`, {
      transports: ['websocket'],
    });
    sockets[workspace].connect();
  }

  const disconnect = () => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  };

  return {
    socket: sockets[workspace],
    disconnect,
  };
};

export default useSocket;
