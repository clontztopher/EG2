import * as React from 'react';
import {
  TableRow,
  TableCell,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField
} from '@material-ui/core';

import { ColumnTypes, Column } from '../types';

interface PreviewTableProps {
  sample: string;
  col: Column;
  onColumnChange: any;
  onNameChange: any;
}

const PreviewTableRow = ({
  sample,
  col,
  onColumnChange,
  onNameChange
}: PreviewTableProps) => (
  <TableRow key={`data${col.index}`}>
    <TableCell>{col.index}</TableCell>
    <TableCell>{sample}</TableCell>
    <TableCell>
      {col.type !== ColumnTypes.IGNORE ? (
        <TextField
          label="Name"
          value={col.name || col.name}
          onChange={e => onNameChange(col.index, e.target.value)}
        />
      ) : (
        col.name
      )}
    </TableCell>
    <TableCell>
      <FormControl>
        <Select
          autoWidth
          value={col ? col.type : ColumnTypes.IGNORE}
          onChange={e => onColumnChange(col.index, e.target.value)}
        >
          <InputLabel id={`input-${col.index}`}>Type</InputLabel>
          <MenuItem value={ColumnTypes.IGNORE}>Ignore</MenuItem>
          <MenuItem value={ColumnTypes.DATE}>Date</MenuItem>
          <MenuItem value={ColumnTypes.EMAIL}>Email</MenuItem>
          <MenuItem value={ColumnTypes.NUMBER}>Number</MenuItem>
          <MenuItem value={ColumnTypes.STRING}>String</MenuItem>
        </Select>
      </FormControl>
    </TableCell>
  </TableRow>
);

export default PreviewTableRow;
