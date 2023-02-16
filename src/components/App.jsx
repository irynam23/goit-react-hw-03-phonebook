import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    // const contacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    // this.setState({ contacts });

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = contact => {
    if (
      this.state.contacts.some(({ name }) => {
        return name.toLowerCase() === contact.name.toLowerCase();
      })
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    const newContact = { ...contact, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value.trim().toLowerCase() });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  render() {
    const { contacts } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        {contacts.length ? (
          <>
            <Filter handleFilter={this.handleFilter} />
            <ContactList
              contacts={filteredContacts}
              handleDelete={this.handleDelete}
            />
          </>
        ) : (
          <p>No contacts added</p>
        )}
      </div>
    );
  }
}
