import * as React from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import PreviewTableRow from './PreviewTableRow';
import { Column, ColumnTypes } from '../types';

import { StateContext, DispatchContext } from '../contexts/store';
import { updateColType, updateColName } from '../store/actions';

const PreviewTable = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const cols = state.settings?.columns;

  const handleColumnChange = (idx: number, colType: ColumnTypes) =>
    dispatch(updateColType(idx, colType));

  const handleNameChange = (idx: number, name: string) =>
    dispatch(updateColName(idx, name));

  return cols && cols.length > 0 ? (
    <TableContainer style={{ maxHeight: '600px', overflowY: 'scroll' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Index</Typography>
            </TableCell>
            <TableCell>
              <Typography>Sample</Typography>
            </TableCell>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Type</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cols.map((col: Column, i: number) => (
            <PreviewTableRow
              sample={state.sourceSample[0][i]}
              col={col}
              onColumnChange={handleColumnChange}
              onNameChange={handleNameChange}
              key={i}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default PreviewTable;
