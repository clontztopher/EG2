import * as React from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Paper,
  Button
} from '@material-ui/core';

import SourceForm from './SourceForm';
import PreviewTable from './PreviewTable';
import SettingsList from './SettingsList';
import FilterModule from './FilterModule';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

interface Props {
  processFile(): void;
}

const Window = ({ processFile }: Props) => {
  const classes = useStyles();
  return (
    <Container>
      {/* Outer Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid container item xs={4} spacing={3} direction="column">
          {/* Source Form */}
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant="h6">Source File</Typography>
              <SourceForm />
            </Paper>
          </Grid>
          {/* Source Form */}

          {/* Settings List */}
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant="h6">Saved Settings</Typography>
              <SettingsList />
            </Paper>
          </Grid>
          {/* Settings List */}

          {/* Filters */}
          <Grid item>
            <Paper className={classes.paper}>
              <Typography variant="h6">Filters</Typography>
              <FilterModule />
            </Paper>
          </Grid>
          {/* Filters */}

          {/* Process Button */}
          <Grid item>
            <Paper className={classes.paper}>
              <Button variant="contained" color="primary" onClick={processFile}>
                Process File
              </Button>
            </Paper>
          </Grid>
          {/* Process Button */}
        </Grid>
        {/* Left Column */}

        {/* Right Column */}
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h6">Columns</Typography>
            <PreviewTable />
          </Paper>
        </Grid>
        {/* Right Column */}
      </Grid>
      {/* Outer Grid */}
    </Container>
  );
};

export default Window;
