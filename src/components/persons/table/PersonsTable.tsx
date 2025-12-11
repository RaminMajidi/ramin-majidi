import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  LinearProgress,
  TableBody,
} from "@mui/material";
import PersonRow from "./PersonRow";
import ErrorBoundary from "../../ErrorBoundary";
import type { TGetPersonsParams, TPerson } from "../../../types/person.types";

import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

type TProps = {
  persons: TPerson[];
  isFetching: boolean;
  onEdit: (p: TPerson) => void;
  onDelete: (id: number) => Promise<void>;
  params: TGetPersonsParams;
  setParams: React.Dispatch<React.SetStateAction<TGetPersonsParams>>;
  isDeleting: boolean;
};

const PersonsTable = ({
  persons,
  isFetching,
  onEdit,
  onDelete,
  setParams,
  params,
  isDeleting,
}: TProps) => {
  // ****************************************************
  const handleCodeOrderingChange = (_: unknown, ordering: string) => {
    setParams((prev) => ({ ...prev, ordering }));
  };
  return (
    <ErrorBoundary>
      <TableContainer component={Paper}>
        {isFetching && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">type</TableCell>
              <TableCell align="center">governmental</TableCell>
              <TableCell align="center">family</TableCell>
              <TableCell align="center">
                Name
                {params.ordering == "-code" ? (
                  <NorthIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "code")}
                  />
                ) : (
                  <SouthIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "-code")}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                Code
                {params.ordering == "-name" ? (
                  <NorthIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "name")}
                  />
                ) : (
                  <SouthIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "-name")}
                  />
                )}
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No persons found
                </TableCell>
              </TableRow>
            ) : (
              persons.map((p: any) => (
                <PersonRow
                  key={p.id}
                  person={p}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ErrorBoundary>
  );
};

export default PersonsTable;
