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
import { personTypeObject } from "../core/data";
import type { TPerson } from "../../../types/person.types";

type TProps = {
  person: TPerson;
  onEdit: (p: TPerson) => void;
  onDelete: (id: number) => Promise<void>;
  isDeleting: boolean;
};

const PersonRow = ({ person, onEdit, onDelete, isDeleting }: TProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <TableRow hover>
      <TableCell align="center">{person.id}</TableCell>
      <TableCell align="center">{personTypeObject[person.typ]}</TableCell>
      <TableCell align="center">{person.is_governmental ? "Yes" : "No"}</TableCell>
      <TableCell align="center">{person.natural_family || "____"}</TableCell>
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
