import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { v4 as uuidv4 } from 'uuid';
import api from '../api/contacts'
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import './App.css';
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); 

  // Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  // Add a new contact
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),  // Call uuidv4 to generate a unique id
      ...contact
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  // Update a contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(contacts.map(contact=>{
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };

  // Remove a contact by id
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  //Search handler
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  // Load contacts from the API on component mount
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route 
            path='/' 
            element={
              <ContactList 
                contacts={searchTerm.length < 1 ? contacts : searchResults} 
                getContactId={removeContactHandler} 
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            } 
          />
          <Route 
            path='/add' 
            element={
              <AddContact addContactHandler={addContactHandler} />
            } 
          />
          <Route 
            path='/edit' 
            element={
              <EditContact 
                updateContactHandler={updateContactHandler} 
              />
            } 
          />
          <Route 
            path='/contact/:id' 
            element={
              <ContactDetails /> 
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
