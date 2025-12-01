import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UnitList from './pages/UnitList.jsx';
import UnitDetail from './pages/UnitDetail.jsx';
import OpeningScene from './components/OpeningScene.jsx'; // 새로 추가
import { units } from './data/units';

function App() {
  // 초기 로딩 상태 관리 (true: 오프닝 씬 표시, false: 메인 앱 표시)
  const [isLoading, setIsLoading] = useState(true);

  // 오프닝 씬이 완료되었을 때 호출되는 핸들러
  const handleOpeningFinish = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {isLoading ? (
        <OpeningScene onFinish={handleOpeningFinish} />
      ) : (
        <Routes>
          <Route path="/" element={<UnitList units={units} />} />
          <Route path="/unit/:id" element={<UnitDetail units={units} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;