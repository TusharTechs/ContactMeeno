import { Contact } from "../Components/Contacts";

// Define action types
export const SET_CONTACTS = "SET_CONTACTS";

// Define action interfaces
export interface SetContactsAction {
  type: typeof SET_CONTACTS;
  payload: Contact[];
}

// Create a union type for all possible action types
export type ContactActionTypes = SetContactsAction;
