/* eslint-disable no-console */
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import connect from 'socket.io-client';
import userContext from '../../../context/userContext';
import { setNotification } from '../../layout/Notification';

const ENDPOINT = 'http://localhost:4000';

export default function DrawingBoard() {
  console.log('test');

  const history = useHistory();

  const { userData } = useContext(userContext);

  const { roomId } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let socket = {};
    if (userData.accessToken) {
      const { accessToken } = userData;
      console.log('Connecting to socket with access token');
      socket = connect(ENDPOINT, { query: { accessToken, roomId } });
    } else {
      console.log('Connecting to socket as guest');
      socket = connect(ENDPOINT, { query: { roomId } });
    }

    socket.on('redirectToRoom', (newRoomId) => {
      history.push(`/room/${newRoomId}`);
    });

    socket.on('newUser', (user) => {
      console.log(usersList);
      setUsersList((prevList) => [...prevList, { ...user }]);
      setNotification({
        open: true,
        severity: 'info',
        message: `User ${user.displayName} has joined!`,
      });
    });

    socket.on('message', (message) => {
      setNotification({
        open: true,
        severity: 'info',
        message,
      });
    });

    socket.on('userLeft', (userId) => {
      setUsersList((prevList) => prevList.filter((element) => element.id !== userId));
    });
  }, [roomId]);
  return (
    <>
      <h1>{`Room nr: ${roomId}`}</h1>
      <h2>{`Users: ${usersList.map((element) => element.displayName)}`}</h2>
    </>
  );
}
