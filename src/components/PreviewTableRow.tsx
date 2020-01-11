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

import { ColumnTypes, Column, SourceHeader } from '../types';

interface PreviewTableRowProps {
  header: SourceHeader;
  column?: Column;
  onColumnChange: any;
  onNameChange: any;
}

const PreviewTableRow = ({
  header,
  column,
  onColumnChange,
  onNameChange
}: PreviewTableRowProps) => (
  <TableRow key={header.index}>
    <TableCell>{header.index}</TableCell>
    <TableCell>{header.sample}</TableCell>
    <TableCell>
      <FormControl>
        <Select
          autoWidth
          value={column ? column.type : ColumnTypes.IGNORE}
          onChange={e => onColumnChange(header.index, e.target.value)}
        >
          <InputLabel id={`input-${header.index}`}>Type</InputLabel>
          <MenuItem value={ColumnTypes.IGNORE}>Ignore</MenuItem>
          <MenuItem value={ColumnTypes.DATE}>Date</MenuItem>
          <MenuItem value={ColumnTypes.EMAIL}>Email</MenuItem>
          <MenuItem value={ColumnTypes.NUMBER}>Number</MenuItem>
          <MenuItem value={ColumnTypes.STRING}>String</MenuItem>
        </Select>
      </FormControl>
    </TableCell>
    <TableCell>
      {column ? (
        <TextField
          label="Name"
          value={column.name}
          onChange={e => onNameChange(column.index, e.target.value)}
        />
      ) : null}
    </TableCell>
  </TableRow>
);

export default PreviewTableRow;
