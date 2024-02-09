import React, { useContext, useState, useEffect } from 'react';
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../component/contact";
import { Context } from '../store/appContext';
import { Contact } from '../component/contact';

export const Home = () => {


  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    agenda_slug: 'jamirG',
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
	  await actions.createContact(formData.full_name, formData.email, formData.agenda_slug, formData.address, formData.phone);
    setFormData({
      full_name: '',
      email: '',
      address: '',
      phone: ''
    });
    
  };


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log("Fetching contacts...");
        await actions.getContacts();
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        console.log("Contacts fetched!");
      }
    };

    fetchContacts();
  }, []);

  console.log (store.contacts)


  return (
    <div className="text-center mt-5">
      <div>
        <p>Contact List</p>


        {store.contacts.map((contact) => (
          <Contact
            id={contact.id}
            fullName={contact.full_name}
            agenda_slug={contact.agenda_slug}
            email={contact.email}
            address={contact.address}
            phone={contact.phone}
          />
        ))}

        
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Full Name</p>
          <input
            type="text"
            name="full_name"
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
          <button type="submit">Create Contact</button>
        </form>
      </div>
    </div>
  );
};
