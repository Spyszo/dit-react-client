import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover': {
      borderRadius: 5,
    },
    height: 50,
  },
}));

export default function AccountAppearances() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      <ListItem button className={classes.listItem}>
        <ListItemIcon><BrightnessHighIcon /></ListItemIcon>
        <ListItemText id="switch-list-label-darkTheme" primary="Dark mode" />
        <Switch
          edge="end"
          onChange={handleToggle('darkTheme')}
          checked={checked.indexOf('darkTheme') !== -1}
          inputProps={{ 'aria-labelledby': 'switch-list-label-darkTheme' }}
        />
      </ListItem>
    </List>
  );
}
