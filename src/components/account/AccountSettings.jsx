/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountAppearances from './AccountAppearances';
import AccountOverview from './AccountOverview';

export default function AccountSettings(props) {
  function TabPanel(props2) {
    const {
      children, value, index, ...other
    } = props2;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    paper: {
      height: theme.settingsDialog.height,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      overflow: 'visible',
    },
    tabPanel: {
      width: 500,
    },
    dialogTitle: {
      backgroundColor: theme.palette.background.light,
      paddingTop: 5,
      paddingBottom: 10,
    },
    dialogTitleTypography: {
      textAlign: 'center',
      marginTop: 8,
    },
    iconButton: {
      position: 'absolute',
      left: 6,
      top: 6,
      padding: 10,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog classes={{ paper: classes.paper }} open={props.show} onClose={props.hideThis} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
        <DialogTitle disableTypography classes={{ root: classes.dialogTitle }} id="form-dialog-title">
          <IconButton onClick={props.hideThis} classes={{ root: classes.iconButton }}>
            <CloseIcon />
          </IconButton>
          <Typography classes={{ root: classes.dialogTitleTypography }} variant="h5">Settings</Typography>
        </DialogTitle>

        <DialogContent>
          <div className={classes.content}>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="User Settings"
              className={classes.tabs}
            >
              <Tab label="Konto" {...a11yProps(0)} />
              <Tab label="Wygląd" {...a11yProps(1)} />
              <Tab label="Login" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0} className={classes.tabPanel}>
              <AccountOverview />
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabPanel}>
              <AccountAppearances />
            </TabPanel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
