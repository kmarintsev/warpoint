import style from './PriceList.module.css'; // Импортируем стили


interface PricingListProps {
  items: string[];
  bulletColor: string;
}

const PricingList: React.FC<PricingListProps> = ({ items, bulletColor }) => {
  return (
    <ul className={style.pricingList}>
      {items.map((item, index) => (
        <li key={index} className={style.listItem}>
          <span className={style.bullet} style={{ backgroundColor: bulletColor }}></span> {item}
        </li>
      ))}
    </ul>
  );
};

export default PricingList;