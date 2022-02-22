import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Form from './Components/Form/Form';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';
import Container from './Components/Container/Container';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
  );

  const [filter, setFilter] = useState('');

  function addContact(name, number) {
    const contactItem = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts([...contacts, contactItem]);
  }

  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }

  function getFilteredContacts() {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  //   componentDidMount(){
  // this.setState(prev => ({
  // contacts:JSON.parse(localStorage.getItem('contacts')) ?? prev.contacts

  // }))
  //   };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1 className={s.title}>Phonebook</h1>
      <Form addContact={addContact} allContacts={contacts} />

      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}
