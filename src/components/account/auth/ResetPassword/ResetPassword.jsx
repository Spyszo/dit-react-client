/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export default function Login(props) {
  const [data, setData] = useState({
    email: '',
    resetToken: '',
  });

  const [show, setShow] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
  });

  const handleFirstStep = () => {
    setShow({
      firstStep: true,
      secondStep: false,
      thirdStep: false,
    });
  };

  const handleSecondStep = (email) => {
    setData({ ...data, email });
    setShow({
      firstStep: false,
      secondStep: true,
      thirdStep: false,
    });
  };

  const handleThirdStep = (resetToken) => {
    setData({ ...data, resetToken });
    setShow({
      firstStep: false,
      secondStep: false,
      thirdStep: true,
    });
  };

  const handleShowLogin = () => {
    props.showLoginWindow();
  };

  return (
    <Box height="80%" display="flex" marginTop="15%" flexDirection="column" alignItems="center">
      {
        show.firstStep
         && (
         <FirstStep
           goToSecondStep={handleSecondStep}
           goBack={handleShowLogin}
         />
         )
      }

      {
        show.secondStep
        && (
        <SecondStep
          email={data.email}
          goToThirdStep={handleThirdStep}
          goBackToFirstStep={handleFirstStep}
        />
        )
      }

      {
        show.thirdStep
        && (
        <ThirdStep
          email={data.email}
          resetToken={data.resetToken}
          hideThis={handleShowLogin}
          goBackToSecondStep={handleSecondStep}
        />
        )
      }
    </Box>
  );
}
