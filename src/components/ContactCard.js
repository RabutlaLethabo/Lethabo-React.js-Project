import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.jpg';

const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className="item" style={{ display: 'flex', alignItems: 'center' }}>
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content" style={{ textAlign: 'left' }}>
            <Link 
            to={`/contact/${id}`}
            state={{ contact: props.contact }} // Pass contact object in state
            style={{ color: 'black', textDecoration: 'none' }}
            >
                <div className="header">{name}</div>
                <div>{email}</div>
            </Link>

            <Link
            to={`/edit`}
            state={{ contact: props.contact }}
            >
            <i 
                className="edit alternate outline icon"
                style={{ color: 'blue' }}
            ></i>
            </Link>
            <i 
            className="trash alternate outline icon"
            style={{ color: 'red', marginRight: '15px', marginLeft:'20px'}}
            onClick={() => props.clickHandler(id)}
            ></i>
        </div>
        </div>
    );
};

export default ContactCard;
