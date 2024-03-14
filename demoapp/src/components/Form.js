import React, {useState} from 'react';

export default function Form({addContact}) {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[website, setWebsite] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name === '' || email === '' || website === ''){
            alert('field cannot be empty');
            return;
        }

        addContact({name,email,website});
        setName('');
        setEmail('');
        setWebsite('');
    }

    return (
        <form className="form">
            <h1>Contact Form</h1>
            <input
                className="input"
                placeholder="Name"
                value={name}
                onChange={e=>setName(e.target.value)} />
            <input
                className="input"
                placeholder="Email"
                value={email}
                onChange={e=>setEmail(e.target.value)} />
            <input
                className="input"
                placeholder="Website"
                value={website}
                onChange={e=>setWebsite(e.target.value)} />
            <button className="btn" type="submit" onClick={handleSubmit}>Add</button>
        </form>
    )
}