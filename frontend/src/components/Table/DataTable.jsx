import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, TableSortLabel, Box, Typography, Avatar, Chip, Stack
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TableChartIcon from '@mui/icons-material/TableChart';

const DataTable = ({
  data,
  columns,
  sort,
  onSort,
  onPageChange,
  onRowsPerPageChange,
  totalRows,
  rowsPerPageOptions = [5, 10, 25],
  title,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleRequestSort = (property) => {
    if (onSort) {
        const isAsc = sort?.field === property && sort?.order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        onSort(property, newOrder);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage);
    }
  };

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ 
        p: 6, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        minHeight: 300,
        background: 'rgba(248, 250, 252, 0.5)',
        border: '2px dashed rgba(99, 102, 241, 0.3)',
        borderRadius: 3,
      }}>
        <Avatar sx={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          width: 80,
          height: 80,
          mb: 3,
        }}>
          <SearchOffIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
          No data available
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          There are no records to display at the moment.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ 
      width: '100%', 
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
    }}>
      {/* Table Header */}
      {title && (
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              width: 48,
              height: 48,
            }}>
              <TableChartIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Showing {data.length} of {totalRows} records
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <TableContainer>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow sx={{ 
              '& .MuiTableCell-head': { 
                fontWeight: 700, 
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                color: 'text.primary',
                borderBottom: '2px solid rgba(226, 232, 240, 0.8)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              } 
            }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sortDirection={sort?.field === column.id ? sort.order : false}
                  sx={{ py: 2 }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sort?.field === column.id}
                      direction={sort?.field === column.id ? sort.order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                      sx={{
                        '&.Mui-active': {
                          color: 'primary.main',
                        },
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {column.label}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow 
                hover 
                role="checkbox" 
                tabIndex={-1} 
                key={row.id || rowIndex}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: 'rgba(248, 250, 252, 0.3)',
                  },
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                {columns.map((column) => {
                  const value = column.render ? column.render(row) : row[column.id];
                  return (
                    <TableCell 
                      key={`${row.id}-${column.id}`} 
                      align={column.align || 'left'}
                      sx={{ 
                        py: 2,
                        borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ 
        borderTop: '1px solid rgba(226, 232, 240, 0.8)',
        background: 'rgba(248, 250, 252, 0.5)',
      }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              paddingLeft: 3,
              paddingRight: 3,
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontWeight: 600,
              color: 'text.primary',
            },
            '& .MuiTablePagination-select': {
              fontWeight: 600,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataTable;