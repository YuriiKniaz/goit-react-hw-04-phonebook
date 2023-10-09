import list from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={list.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={list.listItem} key={id}>
          <p className={list.listPrg}>
            {name}: {number}
          </p>
          <button
            className={list.listBtn}
            type="submit"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

//
