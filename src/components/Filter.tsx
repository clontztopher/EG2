import * as React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  createStyles,
  IconButton
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

import { Column, IFilter, ColumnTypes } from '../types';

interface FilterProps {
  fltr: IFilter;
  cols: Column[];
  filterList: string[];
  removeFilter(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: '120px'
    }
  })
);

const Filter = ({ cols, filterList, fltr, removeFilter }: FilterProps) => {
  const classes = useStyles();
  // TODO: update filter if changed
  console.log(cols);
  const handleChange = () => {};
  return (
    <Grid container justify="space-between" direction="row">
      {/* Column Name */}
      <FormControl className={classes.select}>
        <InputLabel id={`col-label-${fltr.id}`}>Column Target</InputLabel>
        <Select
          className={classes.select}
          defaultValue={'Column'}
          labelId={`col-label-${fltr.id}`}
          id={`select-${fltr.id}`}
          value={fltr.attr}
          onChange={handleChange}
        >
          {cols
            .filter(col => col.type !== ColumnTypes.IGNORE)
            .map((col, i) => (
              <MenuItem value={col.name} key={i}>
                {col.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {/* Filter Type */}
      {/* Filter Value */}
      <IconButton onClick={removeFilter}>
        <Cancel color="secondary" />
      </IconButton>
    </Grid>
  );
};

export default Filter;
