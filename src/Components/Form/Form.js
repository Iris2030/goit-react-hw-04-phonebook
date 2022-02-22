import { useState } from "react";
import s from "./Form.module.css";
import PropTypes from "prop-types";

export default function Form({ addContact, allContacts }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const contactNames = allContacts.map((contact) => contact.name);

    if (contactNames.includes(event.currentTarget.name.value)) {
      alert(`${event.currentTarget.name.value} is alredy in contacts`);
      resetForm();
      return;
    }

    addContact(name, number);

    resetForm();
  };

  const resetForm = () => {
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={s.label}>Name</label>
      <input
        className={s.input}
        value={name}
        onChange={handleInput}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={s.label}>Number</label>
      <input
        className={s.input}
        value={number}
        onChange={handleInput}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
  allContacts: PropTypes.array.isRequired,
};
