import React, { useEffect, useState } from 'react';
import { Alert } from "@mui/material"
import Header from '../Header/Header'
import { useParams } from 'react-router-dom';

const EditStudents = () => {
    const { id } = useParams()
    const [addStudent, setAddStudent] = useState(false)

    const [student, setStudent] = useState({})

    useEffect(() => {
        fetch(`https://safe-hamlet-21940.herokuapp.com/student/${id}`)
            .then(res => res.json())
            .then(data => setStudent(data))
    }, [])

    // handleStateChange
    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedStudent = { ...student, fullName: updatedName };
        setStudent(updatedStudent)
    }
    const handleRollChange = e => {
        const updatedRoll = e.target.value;
        const updatedStudent = { ...student, roll: updatedRoll };
        setStudent(updatedStudent)
    }
    const handleAgeChange = e => {
        const updatedAge = e.target.value;
        const updatedStudent = { ...student, age: updatedAge };
        setStudent(updatedStudent)
    }
    const handleClassChange = e => {
        const updatedClass = e.target.value;
        const updatedStudent = { ...student, class: updatedClass };
        setStudent(updatedStudent)
    }
    const handleHallChange = e => {
        const updatedHall = e.target.value;
        const updatedStudent = { ...student, hall: updatedHall };
        setStudent(updatedStudent)
    }
    const handleStatusChange = e => {
        const updatedStatus = e.target.value;
        const updatedStudent = { ...student, status: updatedStatus };
        setStudent(updatedStudent)
    }

    // react hook form

    const handleSubmitChange = e => {
        e.preventDefault()

        fetch(`https://safe-hamlet-21940.herokuapp.com/student/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(student)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    setAddStudent(true);
                    setStudent({})
                }
            })
    };

    return (
        <>
            <Header />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontWeight: '600', margin: '3rem 0' }}>Edit: {student.fullName}</h2>

                <form onSubmit={handleSubmitChange}>


                    <input type="text" onChange={handleNameChange} value={student.fullName || ''}></input>
                    <input type="text" onChange={handleRollChange} value={student.roll || ''}></input>
                    <input type="number" onChange={handleAgeChange} value={student.age || ''}></input>
                    <input type="text" onChange={handleClassChange} value={student.class || ''}></input>
                    <input type="text" onChange={handleHallChange} value={student.hall || ''}></input>
                    <input type="text" onChange={handleStatusChange} value={student.status || ''}></input>

                    <input className="formBtn" type="submit" value="Submit Changes" /> <br />


                    {/* success alert after added */}
                    {addStudent && <Alert severity="success">Student updated Successfully ! </Alert>}
                </form>
            </div>
        </>
    );
};

export default EditStudents;