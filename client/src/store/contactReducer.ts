import { SET_CONTACTS, ContactActionTypes } from "./contactActions";
import { Contact } from "../Components/Contacts";

// Define the type for the Contact state
interface ContactState {
  contacts: Contact[];
}

// Define initial state for contacts
const initialState: ContactState = {
  contacts: [],
};

// Reducer function
const contactReducer = (
  state = initialState,
  action: ContactActionTypes
): ContactState => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    // Other cases...
    default:
      return state;
  }
};

export default contactReducer;
