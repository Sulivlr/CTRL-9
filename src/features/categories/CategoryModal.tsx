import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {hideCategoriesModal, showModalCloseModal} from './categoriesSlice';
import React, {useCallback, useState} from 'react';
import {TYPES} from '../../constants';
import {Category} from '../../types';

const CategoryModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(showModalCloseModal);
  const closeModal = useCallback(() => {
    dispatch(hideCategoriesModal());
  }, [dispatch]);

  const [category, setCategory] = useState<Category>({
    type: '',
    name: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setCategory((prevState) => ({...prevState, [name]: value}));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(category)
  }

  return (
    <>
      <div className="modal-backdrop show" style={{display: isOpen ? 'block' : 'none'}}/>
      <div className="modal" style={{display: isOpen ? 'block' : 'none'}}>
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <option value="">Select a type</option>
                <select
                  name="type"
                  required
                  className="form-select"
                  id="type"
                  value={category.type}
                  onChange={onChange}
                >
                  {TYPES.map((type) => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Name</label>
                <input
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  value={category.name}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;