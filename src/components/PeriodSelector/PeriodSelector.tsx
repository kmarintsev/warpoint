import React from 'react';
import style from './PeriodSelector.module.css';

interface PeriodSelectorProps {
  selectedPeriod: 'month' | 'year';
  onSelectPeriod: (period: 'month' | 'year') => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onSelectPeriod,
}) => {
  return (
    <div className={style.periodSelector}>
      <button
        onClick={() => onSelectPeriod('month')}
        className={`${style.periodButton} ${selectedPeriod === 'month' ? style.active : ''}`}
      >
        Месяц
      </button>
      <button
        onClick={() => onSelectPeriod('year')}
        className={`${style.periodButton} ${selectedPeriod === 'year' ? style.active : ''}`}
      >
        Год
      </button>
    </div>
  );
};

export default PeriodSelector;