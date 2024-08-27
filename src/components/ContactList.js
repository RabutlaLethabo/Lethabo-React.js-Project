import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => (
        <ContactCard 
            contact={contact} 
            clickHandler={deleteContactHandler} 
            key={contact.id} 
        />
    ));

    const buttonStyle = {
        marginLeft: 'auto', // Aligns the button to the right
    };

    const getSearchTerm = () =>{
        //console.log(inputEl.current.value)
        props.searchKeyword(inputEl.current.value)
    };

    return (
        <div className="main">
            <h2>Contact List</h2>
            <h2>Contact List
            <Link to="/add">
                <button className='ui button blue right' style={buttonStyle}>Add Contact</button>
            </Link>
            </h2>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input 
                    ref={inputEl}
                    type='text' 
                    placeholder='Search Contact' 
                    className='prompt'
                    value={props.term}
                    onChange={getSearchTerm}
                    />
                    <i className='search icon'></i>
                </div>
            </div>
            <div className='ui celled list'>{renderContactList.length > 0 ? renderContactList: "No Contacts Available"}</div>
        </div>
        
    );
};

export default ContactList;
