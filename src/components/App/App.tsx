import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Tariffs from '../Page/Tariffs.tsx';
import Payment from '../Payment/Payment.tsx';
import style from './app.module.css'; // Подключаем стили

const App: React.FC = () => {
  return (
    <div className={style.main}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Link to="/tariffs" className={style.tariffButton}>
                Show Tariffs
              </Link>
            </div>
          }
        />
        <Route path="/tariffs" element={<Tariffs />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default App;