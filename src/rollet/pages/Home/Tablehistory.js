import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

const MyTableComponent = ({ res }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the number of pages
  const pageCount = Math.ceil(res?.length / itemsPerPage);

  // Get the data for the current page
  const paginatedData = res?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No.</TableCell>
              <TableCell align="center">BetNumber/Amount</TableCell>
              <TableCell align="center">Win Amount</TableCell>
              <TableCell align="center"> Color</TableCell>
              <TableCell align="center">Result No</TableCell>
              <TableCell align="center">Win</TableCell>
              <TableCell align="center">Total Win</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {(page - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell align="center" className="!flex flex-col gap-2">
                  <div>
                {row?.number?.split(",")?.map((i)=>{
                    return <span className="border-2 mr-1 py-[0.5px] px-1 border-gray-600">
                        {i === "37"
                          ? "Blue"
                          : i === "38"
                          ? "Black"
                          : i === "39"
                          ? "Red"
                          : i}
                    </span>
                  }) || " "} 
                </div>
                <div> {row?.amount_string?.split(",")?.map((i) => {
                    return <span className="border-2 mr-1 px-1 border-gray-600">{i}</span>
                  }) || " "}
                  </div>

                </TableCell>
                <TableCell align="center">
                  {Number(row?.amount || 0)?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center">
                  {row?.result_color}
                </TableCell>
                <TableCell align="center">
                  {Number(row?.result_number)?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center">
                  {row?.win_string?.split(" ")?.map((i) => { return Number(i || 0)?.toFixed(1) + "," }) || ""}
                </TableCell>
                <TableCell align="center">
                  {Number(row?.win || 0)?.toFixed(2) || 0}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        sx={{ my: 2 }}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
};

export default MyTableComponent;
