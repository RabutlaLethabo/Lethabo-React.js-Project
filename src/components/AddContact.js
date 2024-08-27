import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Link, Navigate } from 'react-router-dom'; // Import Navigate

class AddContact extends React.Component {
    state = {
        name: '',
        email: '',
        redirect: false, // Add redirect state
    };

    add = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('All fields are Mandatory!!');
            return;
        }
        if (typeof this.props.addContactHandler === 'function') {
            this.props.addContactHandler(this.state);
        } else {
            console.error('addContactHandler is not a function');
        }
        this.setState({ name: '', email: '', redirect: true }); // Set redirect state
    };

    render() {
        // Redirect if redirect state is true
        if (this.state.redirect) {
            return <Navigate to="/" />;
        }

        const buttonStyle = {
            marginRight: 'auto', // Aligns the button to the right
        };
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="someone@gmail.com"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <button className="ui button blue">ADD</button>
                    <Link to="/">
                        <button className='ui button blue left' style={buttonStyle}>List</button>
                    </Link>
                </form>
            </div>
        );
    }
}

AddContact.propTypes = {
    addContactHandler: PropTypes.func.isRequired, // Ensure addContactHandler is a required function
};

export default AddContact;
