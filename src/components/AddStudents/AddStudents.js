import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { TextField, Alert } from "@mui/material"
import Header from '../Header/Header'

const AddStudent = () => {
    const [addStudent, setAddStudent] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // react hook form

    const onSubmit = data => {
        fetch('https://safe-hamlet-21940.herokuapp.com/addStudent', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

                setAddStudent(true);
                reset();
            })
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontWeight: '600', margin: '3rem 0' }}>Add New Student</h2>

                <form onSubmit={handleSubmit(onSubmit)}>


                    <TextField
                        required
                        id="standard-basic" label="Full Name" variant="standard"
                        {...register("fullName", { required: true })} type="text"
                        sx={{ m: 1, width: '75%' }}
                    />

                    <TextField
                        required
                        id="standard-required" label="Roll"
                        variant="standard"
                        {...register("roll")}
                        type="number"
                        sx={{ m: 1, width: '75%' }} /> <br />
                    <TextField
                        required
                        id="standard-required" label="Age"
                        variant="standard"
                        {...register("age")}
                        type="number"
                        sx={{ m: 1, width: '75%' }} /> <br />
                    <TextField
                        required
                        id="standard-required" label="Class"
                        variant="standard"
                        {...register("class")}
                        type="text"
                        sx={{ m: 1, width: '75%' }} /> <br />
                    <TextField
                        required
                        id="standard-required" label="Hall Name"
                        variant="standard"
                        {...register("hall")}
                        type="text"
                        sx={{ m: 1, width: '75%' }} /> <br />
                    <TextField
                        required
                        id="standard-required" label="Active/InActive"
                        variant="standard"
                        {...register("status")}
                        type="text"
                        sx={{ m: 1, width: '75%' }} /> <br />

                    {(errors.name || errors.phone) && <span>This field is required</span>} <br />

                    <input className="formBtn" type="submit" value="Add Student" /> <br />


                    {/* success alert after added */}
                    {addStudent && <Alert severity="success">Student Added Successfully ! </Alert>}
                </form>
            </div>
        </>
    );
};

export default AddStudent;