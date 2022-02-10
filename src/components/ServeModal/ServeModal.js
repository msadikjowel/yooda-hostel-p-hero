import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { TextField, Alert, Button } from "@mui/material"
import Header from '../Header/Header'
import { NavLink, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

const link = <FontAwesomeIcon icon={faArrowAltCircleRight} />


const ServeModal = () => {
    const { id } = useParams()
    const [distribute, setDistribute] = useState({})
    const [food, setFood] = useState([]);
    const [addFood, setAddFood] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const date = new Date().toLocaleDateString('en-US');
    console.log(date)

    // get single student data
    useEffect(() => {
        fetch(`https://safe-hamlet-21940.herokuapp.com/distribution/${id}`)
            .then(res => res.json())
            .then(data => setDistribute(data))
    }, [])

    // getting all food
    React.useEffect(() => {
        fetch('https://safe-hamlet-21940.herokuapp.com/allFood')
            .then(res => res.json())
            .then(data => setFood(data))
    }, [])

    // react hook form

    const onSubmit = data => {
        console.log(data)
        fetch('https://safe-hamlet-21940.herokuapp.com/distributed', {
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
                <h2 style={{ fontWeight: '600', margin: '3rem 0' }}>Distribution Form <span style={{ fontSize: '1rem' }}><NavLink to="/distributed">View all distribution list {link}</NavLink></span></h2>

                <form onSubmit={handleSubmit(onSubmit)}>


                    <TextField
                        required
                        value={distribute?.fullName}
                        id="standard-basic"
                        // label="Food Name" 
                        variant="standard"
                        {...register("name", { required: true })} type="text"
                        sx={{ m: 1, width: '75%' }}
                    />

                    <TextField
                        required
                        id="standard-required"
                        // label="Price $" 
                        value={distribute?.roll}
                        variant="standard"
                        {...register("roll", { required: true })}
                        type="text"
                        sx={{ m: 1, width: '75%' }} /> <br />

                    <TextField
                        required
                        id="standard-required"
                        // label="Price $" 
                        value={date}
                        variant="standard"
                        {...register("date", { required: true })}
                        type="text"
                        sx={{ m: 1, width: '75%' }} /> <br />

                    <select {...register("shift")} sx={{ m: 1, width: '100%' }}>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>

                    </select> <br />

                    <select {...register("food")} sx={{ m: 1, width: '100%' }}>
                        {
                            food.map((f) => (<option value={f.name}>{f.name}</option>))
                        }


                    </select> <br />

                    {(errors.name || errors.phone) && <span>This field is required</span>} <br />


                    <Box>
                        {!addFood ? <Box><input className="formBtn" type="submit" value="Distribute" /> <br /></Box> :
                            <Button type='submit' variant="disabled">Distributed</Button>}
                    </Box>


                    {/* success alert after added */}
                    {addFood && <Alert severity="success">Distributed Successfully ! </Alert>}
                </form>
            </div>

        </>
    );
};

export default ServeModal;