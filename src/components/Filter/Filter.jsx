import styles from './Filter.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contactFormReducer';
import { selectFilter } from 'redux/selectors';

const filterId = nanoid();

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className={styles.filterWrap}>
      <label htmlFor={filterId} className={styles.filterLabel}>
        Find contacts by name
      </label>
      <input
        className={styles.filterInput}
        type="text"
        name="filter"
        value={filter}
        id={filterId}
        onChange={({ target }) => {
          dispatch(setFilter(target.value));
        }}
      />
    </div>
  );
};
