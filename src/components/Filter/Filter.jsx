import formFiter from '../ContactForm/ContactForm.module.css';
export const Filter = ({ onFilterChange, filter }) => {
  return (
    <input
      className={formFiter.formInput}
      type="text"
      name="filter"
      onChange={onFilterChange}
      value={filter}
    />
  );
};
