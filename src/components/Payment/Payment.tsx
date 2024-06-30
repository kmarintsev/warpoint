import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Payment.module.css';

const Payment: React.FC = () => {
  const location = useLocation();
  const state = location.state as { totalPrice: string; selectedCurrency: string } || { totalPrice: '0', selectedCurrency: 'RUB' };
  const { totalPrice, selectedCurrency } = state;

  return (
    <div className={style.paymentContainer}>
      <h1 className={style.title}>Страница оплаты</h1>
      <p className={style.amount}>Итоговая сумма: {totalPrice} {selectedCurrency}</p>
      {/* Здесь можно добавить форму оплаты */}
    </div>
  );
};

export default Payment;