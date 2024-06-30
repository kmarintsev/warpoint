import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TariffCard from '../TariffCard/TariffCard';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import PeriodSelector from '../PeriodSelector/PeriodSelector';
import style from './Tariffs.module.css';

interface Tariff {
  type: string;
  bgColor: string;
  features: string[];
  pricePerMonth: number;
  pricePerYear: number;
}

const tariffs: Tariff[] = [
  {
    type: 'FREE',
    bgColor: 'rgb(43, 176, 83)',
    features: ['Warpoint', 'Warpoint', 'Warpoint'],
    pricePerMonth: 0,
    pricePerYear: 0,
  },
  {
    type: 'STANDARD',
    bgColor: 'rgb(0, 143, 205)',
    features: ['Warpoint', 'Warpoint', 'Warpoint'],
    pricePerMonth: 100,
    pricePerYear: 1000,
  },
  {
    type: 'BUSINESS',
    bgColor: 'rgb(230, 124, 244)',
    features: ['Warpoint', 'Warpoint', 'Warpoint'],
    pricePerMonth: 150,
    pricePerYear: 1400,
  },
];

const Tariffs: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('month');
  const [exchangeRates, setExchangeRates] = useState<{ [currency: string]: number }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<'RUB' | 'USD' | 'CNY' | 'KZT'>('RUB');
  const [totalPrice, setTotalPrice] = useState<string>('0');

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    const response = await fetch('https://www.cbr-xml-daily.ru/latest.js');
    const data = await response.json();
    setExchangeRates({
      RUB: 1,
      USD: data.rates.USD,
      CNY: data.rates.CNY,
      KZT: data.rates.KZT,
    });
  };

  const handleSelectTariff = (tariff: Tariff) => {
    setSelectedTariff(tariff);
  };

  const handleSelectPeriod = (period: 'month' | 'year') => {
    setSelectedPeriod(period);
  };

  const handleSelectCurrency = (currency: string) => {
    if (currency === 'RUB' || currency === 'USD' || currency === 'CNY' || currency === 'KZT') {
      setSelectedCurrency(currency);
    }
  };

  const calculatePrice = useCallback((tariff: Tariff) => {
    const rate = exchangeRates[selectedCurrency];
    const price = selectedPeriod === 'month' ? tariff.pricePerMonth : tariff.pricePerYear;
    return selectedCurrency === 'RUB' ? price : Math.round(price * rate);
  }, [exchangeRates, selectedCurrency, selectedPeriod]);

  const updateTotalPrice = useCallback(() => {
    if (selectedTariff) {
      if (selectedTariff.type === 'FREE') {
        setTotalPrice('Бесплатно');
      } else {
        const price = calculatePrice(selectedTariff);
        setTotalPrice(price.toString());
      }
    }
  }, [selectedTariff, calculatePrice]);

  useEffect(() => {
    updateTotalPrice();
  }, [selectedTariff, selectedPeriod, selectedCurrency, exchangeRates, updateTotalPrice]);

  const handlePayment = () => {
    navigate('/payment', { state: { totalPrice, selectedCurrency } });
  };

  return (
    <div>
      <h1 className={style.title}>Tariffs</h1>
      <div className={style.wrapper}>
        {tariffs.map((tariff, index) => (
          <TariffCard
            key={index}
            tariff={tariff}
            selectedTariff={selectedTariff}
            onSelectTariff={(tariff) => {
              handleSelectTariff(tariff);
              updateTotalPrice();
            }}
            calculateTotalPrice={calculatePrice}
            selectedCurrency={selectedCurrency}
          />
        ))}
      </div>
      <CurrencySelector
        selectedCurrency={selectedCurrency}
        onSelectCurrency={(currency) => {
          handleSelectCurrency(currency);
          updateTotalPrice();
        }}
      />
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onSelectPeriod={(period) => {
          handleSelectPeriod(period);
          updateTotalPrice();
        }}
      />
      {selectedTariff && (
        <div className={style.totalPriceContainer}>
          <p className={style.totalPrice}>Итоговая сумма: {totalPrice} {selectedTariff.type !== 'FREE' && selectedCurrency}</p>
          {selectedTariff.type !== 'FREE' && (
            <button className={style.paymentButton} onClick={handlePayment}>
              Перейти к оплате
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Tariffs;
