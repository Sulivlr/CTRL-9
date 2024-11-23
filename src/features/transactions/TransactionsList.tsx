import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { selectTransactions} from './transactionSlice';
import {useEffect} from 'react';
import {fetchTransactions} from './transactionThunk';

const TransactionsList = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;