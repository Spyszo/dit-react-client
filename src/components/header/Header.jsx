import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AccountButton from '../account/AccountButton';
import ThemeToggler from './ThemeToggler';

export default function Header() {
  const useStyles = makeStyles(() => ({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }));

  const classes = useStyles();

  return (
    <Box
      display="flex"
      bgcolor="primaryIfLight.main"
      color="primaryIfLight.contrastText"
      flexDirection="row"
      alignItems="center"
    >
      {/* LEFT SPACE */}
      <Box flexGrow="1" />

      {/* CENTER SPACE */}
      <Box flexGrow="1" paddingTop="0.2em" display="flex" alignItems="center" justifyContent="center" fontSize="2em" fontWeight="bold" fontFamily="Indie Flower">
        <Link className={classes.link} to="/">DRAW IT TOGETHER</Link>
      </Box>

      {/* RIGHT SPACE */}
      <Box flexGrow="1" flexBasis="0" className="nav-right" display="flex" alignItems="center" justifyContent="flex-end">
        <ThemeToggler />
        <AccountButton />
      </Box>
    </Box>
  );
}
