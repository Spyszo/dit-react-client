import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    borderRadius: 4,
    height: 50,
  },
}));

export default function AccountOverview() {
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
      <ListItem button onClick={handleToggle('autoJoin')} className={classes.listItem}>
        <ListItemIcon><AddCircleIcon /></ListItemIcon>
        <ListItemText id="switch-list-label-autoJoin" primary="Automatycznie dołącz do nowego pokoju" />
        <Switch
          edge="end"
          onChange={handleToggle('autoJoin')}
          checked={checked.indexOf('autoJoin') !== -1}
          inputProps={{ 'aria-labelledby': 'switch-list-label-autoJoin' }}
        />
      </ListItem>

      <ListItem button onClick={handleToggle('offline')} className={classes.listItem}>
        <ListItemIcon><SignalWifiOffIcon /></ListItemIcon>
        <ListItemText id="switch-list-label-Offline" primary="Offline" />
        <Switch
          edge="end"
          onChange={handleToggle('offline')}
          checked={checked.indexOf('offline') !== -1}
          inputProps={{ 'aria-labelledby': 'switch-list-label-Offline' }}
        />
      </ListItem>
    </List>
  );
}
