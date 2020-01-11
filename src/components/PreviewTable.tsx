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
import { isEmpty } from 'ramda';

import PreviewTableRow from './PreviewTableRow';
import { Column, ColumnTypes, SourceHeader } from '../types';

import { StateContext, DispatchContext } from '../contexts/store';
import { updateColType, updateColName } from '../store/actions';

const PreviewTable = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const headers = state.sourceData;
  const columns = state.settings.columns;

  const handleColumnChange = (id: number, colType: ColumnTypes) =>
    dispatch(updateColType(id, colType));

  const handleNameChange = (id: number, name: string) =>
    dispatch(updateColName(id, name));

  return !isEmpty(headers) ? (
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
              <Typography>Type</Typography>
            </TableCell>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {headers.map((header: SourceHeader, i: number) => (
            <PreviewTableRow
              header={header}
              column={columns.filter((col: Column) => col.index === i)[0]}
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
