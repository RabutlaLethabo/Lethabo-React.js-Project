import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import user from '../images/user.jpg';

const ContactDetails = () => {
    const location = useLocation();
    const contact = location.state?.contact || {}; // Safely access contact or default to an empty object
    const { name = 'No Name', email = 'No Email' } = contact; // Default values

    // Inline styles for the component
    const cardStyle = {
        margin: '20px auto',
        padding: '15px',
        backgroundColor: '#fff',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '5px',
        maxWidth: '300px'
    };

    const imageStyle = {
        width: '250px',
        height: '300px',
        borderRadius: '5px'
    };

    const contentStyle = {
        marginTop: '10px'
    };

    const nameStyle = {
        fontSize: '1.5em', // Larger font size for name
        fontWeight: 'bold', // Make the name bold
        color: '#333',
        margin: '10px 0'
    };

    const emailStyle = {
        fontSize: '1.2em', // Larger font size for email
        color: '#666'
    };

    return (
        <div style={cardStyle} className='ui card centered'>
            <div className='image'>
                <img src={user} alt='user' style={imageStyle} />
            </div>
            <div className='content' style={contentStyle}>
                <div style={nameStyle} className='header'>{name}</div>
                <div style={emailStyle} className='description'>{email}</div>
            </div>
            <div>
                <Link to="/">
                    <button className='ui button blue'>List</button>
                </Link>
            </div>
        </div>
        
    );
};

export default ContactDetails;
