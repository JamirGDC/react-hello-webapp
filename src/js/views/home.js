import React, { useState } from 'react';
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../component/contact";
import { Context } from '../store/appContext';

export const Home = () => {


  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    agenda_slug: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
	await actions.createContact(full_name, email, agenda_slug, address, phone);
    
  };

  return (
    <div className="text-center mt-5">
      <div>
        <p>Contact List</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Full Name</p>
          <input
            type="text"
            name="fullName"
            value={formData.full_name}
            onChange={handleChange}
          />
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p>Agenda Slug</p>
          <input
            type="text"
            name="agendaSlug"
            value={formData.agenda_slug}
            onChange={handleChange}
          />
          <p>Address</p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <p>Phone</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
