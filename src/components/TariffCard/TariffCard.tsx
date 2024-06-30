import React from "react";
import PricingList from "../PriceList/PriceList";
import style from "./TariffCard.module.css";

interface Tariff {
  type: string;
  bgColor: string;
  features: string[];
  pricePerMonth: number;
  pricePerYear: number;
}

interface TariffCardProps {
  tariff: Tariff;
  selectedTariff: Tariff | null;
  onSelectTariff: (tariff: Tariff) => void;
  calculateTotalPrice: (tariff: Tariff) => number;
  selectedCurrency: string;
}

const TariffCard: React.FC<TariffCardProps> = ({
  tariff,
  selectedTariff,
  onSelectTariff,
  calculateTotalPrice,
  selectedCurrency,
}) => {
  return (
    <div
      className={`${style.tariff} ${
        selectedTariff === tariff ? style.selected : ""
      }`}
      onClick={() => onSelectTariff(tariff)}
    >
      <div
        className={style.tariffWrapper}
        style={{ backgroundColor: tariff.bgColor }}
      >
        <p className={style.titleTraff}>{tariff.type}</p>
      </div>
      <div className={style.featuresWrapper}>
        <PricingList items={tariff.features} bulletColor={tariff.bgColor} />
      </div>
      <div className={style.divider}></div>
      <div className={style.price}>
        <p>
          {tariff.type === "FREE"
            ? "Бесплатно"
            : `${calculateTotalPrice(tariff)} ${selectedCurrency}`}
        </p>
      </div>
    </div>
  );
};

export default TariffCard;
