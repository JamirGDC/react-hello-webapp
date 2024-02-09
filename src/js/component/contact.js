import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';

export const Contact = ({ id, fullName, agenda_slug, email, address, phone }) => {
    const { store, actions } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({ fullName, email, address, phone });

    const ids = { id };
    const agenda_slugs = {agenda_slug};
    console.log(agenda_slugs);
    console.log(ids);

    const deleteContact = async () => {
        try {
            console.log("Deleting contacts...");
            await actions.deleteContact(ids.id);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            console.log("Contacts fetched!");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {

        actions.editContact(ids.id, editedContact.fullName, agenda_slugs.agenda_slug, editedContact.email, editedContact.address, editedContact.phone);
        
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <ul>
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Guardar</button>
                        <li>
                            Full Name: <input type="text" name="fullName" value={editedContact.fullName} onChange={handleChange} />
                        </li>
                        <li>
                            Email: <input type="text" name="email" value={editedContact.email} onChange={handleChange} />
                        </li>
                        <li>
                            Address: <input type="text" name="address" value={editedContact.address} onChange={handleChange} />
                        </li>
                        <li>
                            Phone: <input type="text" name="phone" value={editedContact.phone} onChange={handleChange} />
                        </li>
                    </>
                ) : (
                    <>
                        <button onClick={handleEdit}>Editar</button>
                        <li>Full Name: {fullName}</li>
                        <li>Email: {email}</li>
                        <li>Address: {address}</li>
                        <li>Phone: {phone}</li>
                    </>
                )}
                <button onClick={deleteContact}>Eliminar</button>
            </ul>
        </div>
    );
};
