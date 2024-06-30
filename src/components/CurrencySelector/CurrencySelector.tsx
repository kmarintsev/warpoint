import React from 'react';
import style from './CurrencySelector.module.css';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
}

const currencies = [
  { symbol: 'RUB', label: '₽' },
  { symbol: 'USD', label: '$' },
  { symbol: 'CNY', label: '¥' },
  { symbol: 'KZT', label: '₸' },
];

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onSelectCurrency,
}) => {
  return (
    <div className={style.currencySelector}>
      <select
        value={selectedCurrency}
        onChange={(e) => onSelectCurrency(e.target.value)}
        className={style.currencyDropdown}
      >
        {currencies.map((currency) => (
          <option key={currency.symbol} value={currency.symbol}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;