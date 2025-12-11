import { Menu, MenuItem, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const PersonActionsMenu = ({
  anchorEl,
  setAnchorEl,
  person,
  onEdit,
  onDelete,
  isDeleting,
}: any) => (
  <Menu
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={() => setAnchorEl(null)}
  >
    <MenuItem disabled>
      <Typography>ID: {person.id}</Typography>
    </MenuItem>
    <MenuItem
      onClick={() => {
        onEdit(person);
        setAnchorEl(null);
      }}
    >
      <EditIcon fontSize="small" /> Edit
    </MenuItem>
    <MenuItem
      onClick={() => onDelete(person.id)}
      sx={{ color: "error.main" }}
      disabled={isDeleting}
    >
      <DeleteIcon fontSize="small" /> Delete
    </MenuItem>
  </Menu>
);

export default PersonActionsMenu;
