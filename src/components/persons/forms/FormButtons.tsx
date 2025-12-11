import React from "react";
import { Grid, Stack, Button } from "@mui/material";

interface FormButtonsProps {
  isLoading: boolean;
  hasInitialData: boolean;
  onCancel?: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  isLoading,
  hasInitialData,
  onCancel,
}) => {
  return (
    <Grid size={12}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ mt: 3 }}
      >
        {onCancel && (
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={isLoading}
          >
            انصراف
          </Button>
        )}
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading
            ? "در حال ذخیره..."
            : hasInitialData
            ? "بروزرسانی"
            : "تایید"}
        </Button>
      </Stack>
    </Grid>
  );
};