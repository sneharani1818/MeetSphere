import { useContext } from 'react';
import SocketContext from './Socket';

export const useSocket = () => {
    return useContext(SocketContext);
};
