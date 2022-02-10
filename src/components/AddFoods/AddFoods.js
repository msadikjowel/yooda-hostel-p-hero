import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { TextField, Alert } from "@mui/material"
import Header from '../Header/Header'

const AddFood = () => {
    const [addFood, setAddFood] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // react hook form

    const onSubmit = data => {

        fetch('https://safe-hamlet-21940.herokuapp.com/addFood', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

                setAddFood(true);
                reset();
            })
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontWeight: '600', margin: '3rem 0' }}>Add Foods</h2>

                <form onSubmit={handleSubmit(onSubmit)}>


                    <TextField
                        required
                        id="standard-basic" label="Food Name" variant="standard"
                        {...register("name", { required: true })} type="text"
                        sx={{ m: 1, width: '75%' }}
                    />

                    <TextField
                        required
                        id="standard-required" label="Price $" variant="standard"
                        {...register("price")}
                        type="number"
                        sx={{ m: 1, width: '75%' }} /> <br />

                    {(errors.name || errors.phone) && <span>This field is required</span>} <br />

                    <input className="formBtn" type="submit" value="Add Food" /> <br />


                    {/* success alert after added */}
                    {addFood && <Alert severity="success">Food Added Successfully ! </Alert>}
                </form>
            </div>
        </>
    );
};

export default AddFood;