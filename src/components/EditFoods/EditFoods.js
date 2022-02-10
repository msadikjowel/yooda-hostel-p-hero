import React, { useEffect, useState } from 'react';
import { Alert } from "@mui/material"
import Header from '../Header/Header'
import { useParams } from 'react-router-dom';

const EditFoods = () => {
    const { id } = useParams()
    const [addFood, setAddFood] = useState(false)

    const [food, setFood] = useState({})

    useEffect(() => {
        fetch(`https://safe-hamlet-21940.herokuapp.com/food/${id}`)
            .then(res => res.json())
            .then(data => setFood(data))
    }, [])

    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedFood = { name: updatedName, price: food.price };
        setFood(updatedFood)
    }
    const handlePriceChange = e => {
        const updatedPrice = e.target.value;
        const updatedFood = { name: food.name, price: updatedPrice };
        setFood(updatedFood)
    }

    // react hook form

    const handleSubmitChange = e => {
        e.preventDefault()

        fetch(`https://safe-hamlet-21940.herokuapp.com/food/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(food)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    setAddFood(true);
                    setFood({})
                }
            })
    };

    return (
        <>
            <Header />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontWeight: '600', margin: '3rem 0' }}>Edit: {food.name}</h2>

                <form onSubmit={handleSubmitChange}>


                    <input type="text" onChange={handleNameChange} value={food.name || ''}></input>
                    <input type="number" onChange={handlePriceChange} value={food.price || ''}></input>

                    <input className="formBtn" type="submit" value="Submit Changes" /> <br />


                    {/* success alert after added */}
                    {addFood && <Alert severity="success">Food updated Successfully ! </Alert>}
                </form>
            </div>
        </>
    );
};

export default EditFoods;