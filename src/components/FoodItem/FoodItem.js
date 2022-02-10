import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Alert, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
const editIcon = <FontAwesomeIcon icon={faPen} />

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function FoodItem() {
    const [food, setFood] = React.useState([]);
    const [student, setStudent] = React.useState([]);
    const [check, setCheck] = React.useState(false);
    const [updateStatusSuccess, setUpdateStatusSuccess] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false)
    const [deleteStudentSuccess, setDeleteStudentSuccess] = React.useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - food.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // getting all food
    React.useEffect(() => {
        fetch('https://safe-hamlet-21940.herokuapp.com/allFood')
            .then(res => res.json())
            .then(data => setFood(data))
    }, [])

    // delete food
    const handleDeleteFood = id => {
        // console.log(id)
        const proceed = window.confirm('Are you sure to delete this food?');
        if (proceed) {
            fetch(`https://safe-hamlet-21940.herokuapp.com/foodDelete/${id}`, {
                method: 'DELETE',
                // headers: { 'content-type': 'application/json' },
                // body: JSON.stringify(id)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        const remainingFood = food.filter(singleFood => singleFood._id !== id);
                        setFood(remainingFood);
                        setDeleteSuccess(true);
                    }
                })
        }
    }

    // getting all student
    React.useEffect(() => {
        fetch('https://safe-hamlet-21940.herokuapp.com/allStudent')
            .then(res => res.json())
            .then(std => setStudent(std))
    }, [])

    // delete student
    const handleDeleteStudent = id => {
        // console.log(id)
        const proceed = window.confirm('Are you sure to delete this student?');
        if (proceed) {
            fetch(`https://safe-hamlet-21940.herokuapp.com/studentDelete/${id}`, {
                method: 'DELETE',
                // headers: { 'content-type': 'application/json' },
                // body: JSON.stringify(id)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        const remainingStudent = student.filter(singleStudent => singleStudent._id !== id);
                        setFood(remainingStudent);
                        setDeleteStudentSuccess(true);
                    }
                })
        }
    }

    // update status
    const handleUpdateStatus = id => {
        const proceed = window.confirm('Are you sure to Update this student?')
        if (proceed) {
            fetch(`https://safe-hamlet-21940.herokuapp.com/updateStatus/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(student)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        setUpdateStatusSuccess(true);
                        window.location.reload();
                    }
                })
        }
    }

    console.log(student)



    return (
        <>
            <h2>Food Items: {food.length}</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                            ? food.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : food
                        ).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row._id}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.price}
                                </TableCell>

                                <TableCell style={{ width: 160 }} align="center">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <NavLink to={`/editFood/${row._id}`}>
                                            <Button title="Edit" sx={{ color: 'green', fontSize: '1rem' }}>{editIcon}</Button>
                                        </NavLink>


                                        <Button
                                            title="Delete Food"
                                            sx={{ color: 'red' }}
                                            onClick={() => handleDeleteFood(row._id)}
                                        >{deleteIcon}

                                        </Button>

                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={food.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <br />
            {deleteSuccess && <Alert severity="success">Food deleted successfully !</Alert>}



            {/* student */}

            <h2>Students: {student.length}</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                            ? student.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : student
                        ).map((std) => (
                            <TableRow key={std._id}>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std._id}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std.fullName}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std.roll}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std.age}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std.class}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std.hall}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {std.status}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    <input type="checkbox" onChange={(e) => setCheck(e.target.checked)} onClick={() => handleUpdateStatus(std?._id)} />
                                </TableCell>

                                <TableCell style={{ width: 160 }} align="center">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <NavLink to={`/editStudent/${std._id}`}>
                                            <Button title="Edit" sx={{ color: 'green', fontSize: '1rem' }}>{editIcon}</Button>
                                        </NavLink>


                                        <Button
                                            title="Delete Student"
                                            sx={{ color: 'red' }}
                                            onClick={() => handleDeleteStudent(std._id)}
                                        >{deleteIcon}

                                        </Button>

                                    </Box>
                                </TableCell>
                                <NavLink className="navlink" to={`/modal/${std._id}`}>
                                    <TableCell style={{ width: 160 }} align="center">
                                        <Button> Serve </Button>
                                    </TableCell>
                                </NavLink>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={food.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <br />
            {deleteStudentSuccess && <Alert severity="success">Student deleted successfully !</Alert>}


        </>
    );
}