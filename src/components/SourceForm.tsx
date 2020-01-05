import * as React from 'react';
import { makeStyles, Button, Typography, Grid } from '@material-ui/core';

import { StateContext, DispatchContext } from '../contexts/store';
import { PreviewContext } from '../contexts/streaming';
import { setSource } from '../store/actions';

const useStyles = makeStyles(theme => ({
  hiddenInput: {
    display: 'none'
  }
}));

const SourceForm = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const getPreview = React.useContext(PreviewContext);

  const classes = useStyles();
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleInput = async () => {
    const files = fileInput.current?.files;
    if (files) {
      const file = files[0];
      const { data, errors, meta } = await getPreview(file);
      dispatch(setSource(data, file));
    }
  };

  return (
    <Grid container>
      <Grid item xs>
        <Typography>{state.sourceFile?.name || `File Name`}</Typography>
      </Grid>
      <Grid item xs container justify="flex-end">
        <input
          type="file"
          ref={fileInput}
          onChange={handleInput}
          className={classes.hiddenInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInput.current?.click()}
        >
          Select Source
        </Button>
      </Grid>
    </Grid>
  );
};

export default SourceForm;
