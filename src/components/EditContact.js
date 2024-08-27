import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import PropTypes from 'prop-types';

const EditContact = ({ updateContactHandler }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [contact, setContact] = useState({
        id: '',
        name: '',
        email: '',
    });

    // Use useEffect to initialize state with data from location
    useEffect(() => {
        if (location.state?.contact) {
            setContact(location.state.contact);
        }
    }, [location.state]);

    const update = (e) => {
        e.preventDefault();
        if (contact.name === '' || contact.email === '') {
            alert('All fields are Mandatory!!');
            return;
        }
        if (typeof updateContactHandler === 'function') {
            updateContactHandler(contact);
        } else {
            console.error('updateContactHandler is not a function');
        }
        navigate('/'); // Redirect to home after update
    };

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="someone@gmail.com"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                </div>
                <button className="ui button blue">Update</button>
                <button 
                    type="button" 
                    className="ui button blue left" 
                    style={{ marginRight: 'auto' }}
                    onClick={() => navigate('/')}
                >
                    List
                </button>
            </form>
        </div>
    );
};



export default EditContact;
