import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import {
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import PersonActionsMenu from "./PersonActionsMenu";
import { useState } from "react";

const PersonRow = ({ person, onEdit, onDelete, isDeleting }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <TableRow hover>
      <TableCell align="center">{person.id}</TableCell>
      <TableCell align="center">
        <Box display="flex" justifyContent="center" gap={1}>
          <PersonIcon />
          <Typography>{person.display_name}</Typography>
        </Box>
      </TableCell>
      <TableCell align="center">{person.code}</TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disabled={isDeleting}
        >
          <MoreVertIcon />
        </IconButton>
        <PersonActionsMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          person={person}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      </TableCell>
    </TableRow>
  );
};

export default PersonRow;
