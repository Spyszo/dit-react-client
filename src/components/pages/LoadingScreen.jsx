/* eslint-disable react/prop-types */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';

require('../../loader.css');

export default function LoadingScreen(props) {
  const { show } = props;

  const useStyles = makeStyles((theme) => ({
    loaderWhiteSpace: {
      backgroundColor: theme.palette.background.main,
      '& .plane': {
        backgroundColor: theme.palette.background.contrastText,
      },
      '& p': {
        color: theme.palette.background.contrastText,
      },
    },
    text: {
      backgroundColor: 'red',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <CSSTransition
        in={show}
        timeout={500}
        classNames="whitespace"
        unmountOnExit
      >
        <div id="whitespace" className={classes.loaderWhiteSpace}>
          <section id="global">

            <div id="top" className="mask">
              <div className="plane" />
            </div>
            <div id="middle" className="mask">
              <div className="plane" />
            </div>

            <div id="bottom" className="mask">
              <div className="plane" />
            </div>

            <p><i>LOADING...</i></p>

          </section>
        </div>
      </CSSTransition>
    </>
  );
}
