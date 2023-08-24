import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { ContactActionTypes, SET_CONTACTS } from "../store/contactActions";
import "./styles.css";

// Interface defining the structure of a contact
export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  status: string;
}

// Contacts component definition
const Contacts: React.FC = () => {
  // Retrieve contacts from Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch<Dispatch<ContactActionTypes>>();

  // State variables for form inputs, modal visibility, and editing contact
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch contacts from API and update Redux store
  const fetchContacts = async () => {
    try {
      const response = await axios.get("https://contact-meeno.onrender.com/api/contacts");
      dispatch({ type: SET_CONTACTS, payload: response.data });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Create a new contact
  const createContact = async () => {
    try {
      await axios.post("https://contact-meeno.onrender.com/api/contacts", {
        firstName,
        lastName,
        status,
      });
      setFirstName("");
      setLastName("");
      setStatus("active");
      fetchContacts();
      closeModal();
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  // Edit an existing contact
  const editContact = (contact: Contact) => {
    setEditingContact(contact);
    openModal();
  };

  // Update an edited contact
  const updateContact = async () => {
    if (editingContact) {
      try {
        await axios.put(
          `https://contact-meeno.onrender.com/api/contacts/${editingContact._id}`,
          {
            firstName,
            lastName,
            status,
          }
        );
        setFirstName("");
        setLastName("");
        setStatus("active");
        setEditingContact(null);
        fetchContacts();
        closeModal();
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }
  };
  // Delete a contact
  const deleteContact = async (id: string) => {
    try {
      console.log("Deleting contact with ID:", id);
      await axios.delete(`https://contact-meeno.onrender.com/api/contacts/${id}`);
      console.log("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  // Open the modal for creating/editing a contact
  const openModal = () => {
    setShowCreateForm(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowCreateForm(false);
    setEditingContact(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Contact Page</h2>
      {/* Create Contact Form */}
      <div className="mb-4 text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openModal}
        >
          Create Contact
        </button>
        <Modal
          isOpen={showCreateForm}
          onRequestClose={closeModal}
          contentLabel="Create Contact Modal"
          className="modal-content"
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {editingContact ? "Edit Contact" : "Create Contact"}
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="p-2 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <select
                className="p-2 border rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={editingContact ? updateContact : createContact}
                >
                  {editingContact ? "Update" : "Save"}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Contact List */}
      <div className="flex justify-center align-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-20 p-20">
          {contacts.length === 0 ? (
            <p className="text-center">
              No Contacts Found. Please add contacts from the Create Contact
              Button.
            </p>
          ) : (
            contacts.map((contact: Contact) => (
              <div
                key={contact._id}
                className="p-4 border rounded shadow-md flex justify-center items-center"
              >
                <div className="text-center">
                  <p>
                    Name: {contact.firstName} {contact.lastName}
                  </p>
                  <p>Status: {contact.status}</p>
                  <div className="mt-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => editContact(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
