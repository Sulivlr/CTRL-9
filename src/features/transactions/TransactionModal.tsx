import {TYPES} from '../../constants';
import ButtonSpinner from '../../components/Spinners/ButtonSpinner';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectShowTransactionModal} from './transactionSlice';
import {hideTransactionModal, selectTransactionIsCreating} from './transactionSlice';
import {TransactionMutation} from '../../types';
import {fetchCategories} from '../categories/categoriesThunks';
import {selectCategories} from '../categories/categoriesSlice';
import {createTransaction, fetchTransactions} from './transactionThunk';

const TransactionModal = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectTransactionIsCreating);
  const isOpen = useAppSelector(selectShowTransactionModal);
  const categories = useAppSelector(selectCategories);
  const [type, setType] = useState<string>('');
  const [transaction, setTransaction] = useState<TransactionMutation>({
    category: '',
    amount: '',
  });

  const closeModal = useCallback(() => {
    dispatch(hideTransactionModal());
  }, [dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setTransaction((prevState) => ({...prevState, [name]: value}));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const apiTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount),
      createdAt: new Date().toISOString(),
    };
    await dispatch(createTransaction(apiTransaction)).unwrap();
    dispatch(fetchTransactions());
    dispatch(hideTransactionModal());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const selectedCategories = useMemo(() => {
    return categories.filter((category) => category.type === type);
  }, [categories, type]);


  return (
    <>
      <div className="modal-backdrop show" style={{display: isOpen ? 'block' : 'none'}}/>
      <div className="modal" style={{display: isOpen ? 'block' : 'none'}}>
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Create Transaction</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                  name="type"
                  required
                  className="form-select"
                  id="type"
                  value={type}
                  onChange={event => setType(event.target.value)}
                >
                  <option value="">Select a type</option>
                  {TYPES.map((type) => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">Category</label>
                <select
                  name="category"
                  id="category"
                  required
                  disabled={type === ''}
                  className="form-select"
                  value={transaction.category}
                  onChange={onChange}
                >
                  <option value="">Select a Category</option>
                  {selectedCategories.map((category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">Amount</label>
                <input
                  name="amount"
                  required
                  type="number"
                  className="form-control"
                  id="amount"
                  value={transaction.amount}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button
                type="submit"
                disabled={isCreating}
                className="btn btn-primary">
                {isCreating && <ButtonSpinner/>}
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransactionModal;