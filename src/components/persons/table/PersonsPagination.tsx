import { Box, Typography, Pagination } from "@mui/material";

type TProps = {
  totalPages: number;
  page: number;
  onChange: (page: number) => void;
  totalCount: number;
  currentItems: number;
};

const PersonsPagination = ({
  totalPages,
  page,
  onChange,
  totalCount,
  currentItems,
}: TProps) => (
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
