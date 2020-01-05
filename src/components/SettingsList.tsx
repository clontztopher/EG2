import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  OutlinedInput,
  InputAdornment,
  Grid,
  Typography,
  IconButton,
  Link
} from '@material-ui/core';
import { Cancel, AddCircle } from '@material-ui/icons';

import { StateContext, DispatchContext } from '../contexts/store';
import { saveSettings, setFromSaved, removeSettings } from '../store/actions';

const SettingsList = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [settingsName, setName] = React.useState('');
  const handleSave = () => {
    if (settingsName !== '') {
      dispatch(saveSettings(settingsName, state.settings));
      setName('');
    }
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <List dense={true}>
          {Object.keys(state.savedSettings).map(settingsName => (
            <ListItem key={settingsName}>
              <Link
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch(setFromSaved(settingsName))}
              >
                <ListItemText primary={settingsName} />
              </Link>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeSettings(settingsName))}
                >
                  <Cancel color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item style={{ background: '#eaeaea' }}>
        <OutlinedInput
          labelWidth={0}
          type="text"
          id="new-settings-name"
          onChange={e => setName(e.target.value)}
          value={settingsName}
          style={{ background: 'white', width: '100%' }}
          placeholder="Settings Name"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSave}>
                <AddCircle />
              </IconButton>
              <Typography color="textSecondary">Save</Typography>
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  );
};

export default SettingsList;
