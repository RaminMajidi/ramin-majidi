import { Box, Typography, Pagination } from "@mui/material";

const PersonsPagination = ({
  totalPages,
  page,
  onChange,
  totalCount,
  currentItems,
}: any) => (
  <Box display="flex" justifyContent="space-between" mt={3}>
    <Typography color="textSecondary">
      Showing {currentItems} of {totalCount}
    </Typography>
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, p) => onChange(p)}
    />
  </Box>
);

export default PersonsPagination;
