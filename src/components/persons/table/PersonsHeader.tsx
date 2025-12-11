import { Box, Typography, Button } from "@mui/material";

const PersonsHeader = ({ total, onAdd }: any) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
    <Typography variant="h4">Persons</Typography>
    <Typography color="textSecondary">Total: {total}</Typography>
    <Button variant="outlined" onClick={onAdd}>
      Add Person
    </Button>
  </Box>
);

export default PersonsHeader;