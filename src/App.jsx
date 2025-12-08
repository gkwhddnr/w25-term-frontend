import React, { useState, useEffect } from 'react';
// 🚨 BrowserRouter를 추가로 import 합니다.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import UnitList from './pages/UnitList.jsx';
import UnitDetail from './pages/UnitDetail.jsx';
import OpeningScene from './components/OpeningScene.jsx'; 

// 🚨 Axios 기반 API 모듈 import
import HellApi from './api/HellApi.js'; 

// ----------------------------------------------------
// App 컴포넌트 래핑을 위한 MainRouter 컴포넌트 정의
// ----------------------------------------------------
function AppRoutes({ units }) {
    return (
        <div style={{ minHeight: '100vh', width: '100%' }}>
            {/* Routes는 BrowserRouter의 자식으로 존재해야 합니다. */}
            <Routes>
                {/*  로드된 units 데이터를 컴포넌트에 전달 */}
                <Route path="/" element={<UnitList units={units} />} /> 
                {/* UnitDetail에서 ID로 데이터를 찾을 수 있도록 units 데이터 전달 */}
                <Route path="/unit/:id" element={<UnitDetail units={units} />} />
            </Routes>
        </div>
    );
}


function App() {
  // 앱의 로딩 상태 (true: 오프닝 씬 표시, false: 메인 앱 표시)
  const [isAppLoading, setIsAppLoading] = useState(true);
  
  // 백엔드에서 가져온 모든 유닛 데이터를 저장할 상태
  const [units, setUnits] = useState([]); 

  // 오프닝 씬 완료 상태 관리 (오프닝 씬이 끝났는지)
  const [isOpeningFinished, setIsOpeningFinished] = useState(false);

  // 오프닝 씬이 완료되었을 때 호출되는 핸들러
  const handleOpeningFinish = () => {
    setIsOpeningFinished(true);
  };
  
  // ----------------------------------------------------
  //  1. 데이터 호출 (useEffect)
  // ----------------------------------------------------
  useEffect(() => {
    const fetchAllUnits = async () => {
      try {
        // Angel, Devil, Building 데이터를 비동기적으로 동시에 호출
        const [angels, devils, buildings] = await Promise.all([
          HellApi.Angel.get(), // 모든 Angel 조회
          HellApi.Devil.get(), // 모든 Devil 조회
          HellApi.Building.get() // 모든 Building 조회
        ]);

        // 모든 데이터를 하나의 배열로 통합
        const allUnits = [...angels, ...devils, ...buildings];
    

        setUnits(allUnits);
        
      } catch (err) {
        console.error("Failed to fetch all units:", err);
        setUnits([]); 
      }
    };

    fetchAllUnits();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // ----------------------------------------------------
  // 2. 메인 화면 표시 조건 처리
  // ----------------------------------------------------
  useEffect(() => {
    if (units.length > 0 && isOpeningFinished) {
        setIsAppLoading(false);
    } 

    if (isOpeningFinished) {
        setIsAppLoading(false);
    }
  }, [isOpeningFinished]);


  // ----------------------------------------------------
  // 3. 렌더링
  // ----------------------------------------------------
  
  // (임시) 데이터 로딩 중이거나 오프닝 씬이 진행 중이라면 로딩 화면 표시
  if (isAppLoading || units.length === 0) {
     return (
        <div style={{ minHeight: '100vh', width: '100%' }}>
          <OpeningScene onFinish={handleOpeningFinish} />
        </div>
     );
  }

  return (
    <AppRoutes units={units} /> 
  );
}

export default App;