import * as React from 'react';
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  IconButton,
  Button
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { isEmpty } from 'ramda';

import Filter from './Filter';
import { StateContext, DispatchContext } from '../contexts/store';
import { addFilter, deleteFilter, makeFilterGroup } from '../store/actions';
import filterSet from '../filters/filterSet';

const useStyles = makeStyles({
  fltrGroup: {}
});

const FilterModule = () => {
  const { settings } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const classes = useStyles();

  const onRemoveFilter = (id: string) => () => dispatch(deleteFilter(id));
  const onCreateGroup = () => dispatch(makeFilterGroup());
  const onAddFilter = (gid: string) => () => dispatch(addFilter(gid));

  const fGroups = [];
  for (let group in settings.filterGroups) {
    const collection = settings.filterGroups[group].map(id =>
      settings.filters.find(f => f.id === id)
    );
    fGroups.push({ gid: group, filters: collection });
  }

  return (
    <Grid container direction="column">
      {!isEmpty(fGroups)
        ? fGroups.map(({ gid, filters }, i) => (
            <List className={classes.fltrGroup} key={i}>
              {!isEmpty(filters)
                ? filters.map((fltr, j) => (
                    <ListItem key={j}>
                      <Filter
                        fltr={fltr!}
                        cols={settings.columns}
                        filterList={Object.keys(filterSet)}
                        removeFilter={onRemoveFilter(fltr!.id)}
                      />
                    </ListItem>
                  ))
                : null}
              <ListItem>
                <IconButton onClick={onAddFilter(gid)}>
                  <AddCircle color="action" />
                </IconButton>
              </ListItem>
            </List>
          ))
        : null}
      <Grid item>
        <IconButton onClick={onCreateGroup}>
          <AddCircle color="action" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FilterModule;
