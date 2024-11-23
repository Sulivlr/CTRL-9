import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTransactionIsRemoving, selectTransactions} from './transactionSlice';
import {useEffect} from 'react';
import {deleteTransaction, fetchTransactions} from './transactionThunk';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinners/ButtonSpinner';

const TransactionsList = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const isDeleting = useAppSelector(selectTransactionIsRemoving);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const onRemove =  async (id: string) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      await dispatch(fetchTransactions());
      toast.success('Transaction removed');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map((transaction) => (
        <div className="card mb-2">
          <div className="card-body d-flex justify-content-between">
            <span>
              {transaction.createdAt + ' '}
              {transaction.category.name}
            </span>
            <span style={{color: transaction.category.type === 'income' ? 'green' : 'red'}}>
              {transaction.category.type === 'income' ? '+' : '-'}
              {transaction.amount} KGS</span>
            <div>
            <button
              className="btn btn-danger"
              onClick={() => {onRemove(transaction.id)}}
              disabled={isDeleting === transaction.id}
            >
              {isDeleting === transaction.id && <ButtonSpinner/>}
              Delete
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;