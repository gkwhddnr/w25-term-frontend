import React from 'react';
import { Link } from 'react-router-dom';

function UnitList({ units }) {
    
    // 🚨 1. 유닛을 주 목록 (Main Group)에 따라 분류
    const mainGroups = units.reduce((acc, unit) => {
        const category = unit.category || '기타';
        
        // 악마 그룹에 포함되는 유닛
        if (category === '악마' || category === '악인' || category === '적대자' || category === '타락천사' || category === '건물') {
            acc['악마'] = acc['악마'] || [];
            acc['악마'].push(unit);
        // 천사 그룹에 포함되는 유닛
        } else if (category === '천사') {
            acc['천사'] = acc['천사'] || [];
            acc['천사'].push(unit);
        // 기타 (현재는 모두 위 두 그룹에 포함되도록 설정했으나, 혹시 모를 경우 대비)
        } else {
            acc[category] = acc[category] || [];
            acc[category].push(unit);
        }
        return acc;
    }, {});


    // 🚨 2. 각 주 목록 내부를 '하위 목록 (Subgroup)'으로 세부 그룹화
    const finalGroupedStructure = {};

    for (const [mainGroupName, mainGroupUnits] of Object.entries(mainGroups)) {
        
        // 세부 분류 키를 결정하는 함수
        const getSubGroupKey = (unit) => {
            const hierarchy = unit.hierarchy || unit.classification || unit.category;
            
            // 😈 악마 주 목록 내 하위 분류
            if (mainGroupName === '악마') {
                if (unit.category === '타락천사') return '타락천사'; // 타락천사
                if (unit.category === '건물') return '건물'; // 건물
                if (unit.category === '악인') return '악인'; // 악인

                // 악마 계층 분류 (hierarchy/classification 필드 사용)
                if (hierarchy === '하급악마') return '하급 악마';
                if (hierarchy === '중급악마') return '중급 악마';
                if (hierarchy === '상급악마') return '상급 악마';
                if (hierarchy === '대악마') return '대악마';
                if (hierarchy === '적대자') return '적대자';
                
                return '기타 악마'; 
            }
            
            // 😇 천사 주 목록 내 하위 분류
            if (mainGroupName === '천사') {
                // '영웅급'이 포함된 경우
                if (hierarchy && hierarchy.includes('영웅')) return '영웅급 천사'; 
                return '일반 천사'; // 나머지 천사
            }
            
            return hierarchy;
        };

        const subgroup = mainGroupUnits.reduce((acc, unit) => {
            const key = getSubGroupKey(unit);
            acc[key] = acc[key] || [];
            acc[key].push(unit);
            return acc;
        }, {});

        finalGroupedStructure[mainGroupName] = subgroup;
    }


    // 🚨 3. 주 목록 및 하위 목록의 최종 출력 순서 정의
    const mainGroupOrder = ['악마', '천사'];
    const subgroupOrder = {
        '악마': ['하급 악마', '중급 악마', '상급 악마', '대악마', '적대자', '타락천사', '건물', '악인', '기타 악마'],
        '천사': ['일반 천사', '영웅급 천사'],
    };
    
    
    // --- 스타일 정의 (이전과 동일하게 유지) ---
    const containerStyle = {
      minHeight: '100vh',
      width: '100%',
      padding: '40px',
      background: 'radial-gradient(circle at 50% 120%, rgba(255, 69, 0, 0.15), rgba(0, 0, 0, 1) 70%), linear-gradient(to bottom, #100000, #000000)',
      backgroundAttachment: 'fixed',
      color: '#fffff0',
      fontFamily: `'Times New Roman', serif`,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
    const sectionBoxStyle = {
      marginBottom: '30px',
      border: '1px solid rgba(255, 100, 0, 0.7)', 
      backgroundColor: 'rgba(20, 5, 5, 0.9)', 
      padding: '15px',
      borderRadius: '5px',
      boxShadow: '0 0 15px rgba(255, 69, 0, 0.8)', 
      maxWidth: '800px',
      width: '100%',
    };
    const titleStyle = {
        color: '#FFD700',
        textShadow: '0 0 8px rgba(255, 100, 0, 0.7)',
        borderBottom: '2px solid rgba(255, 100, 0, 0.4)',
        paddingBottom: '15px',
        marginBottom: '40px',
        textAlign: 'center',
        fontSize: '2.5em',
        maxWidth: '800px',
        width: '100%',
    };
    const mainSectionTitleStyle = { // 😈 악마 / 😇 천사 섹션 제목
        color: '#FF4500', 
        textShadow: '0 0 5px #FFD700',
        borderBottom: '3px double #FF4500',
        paddingBottom: '10px',
        marginBottom: '20px',
        fontSize: '2em',
        textAlign: 'center',
    };
    const subSectionTitleStyle = { // 📜 하위 목록 제목 (하급 악마 등)
        color: '#ffd080',
        textShadow: '0 0 5px rgba(255, 150, 0, 0.5)',
        borderBottom: '1px solid rgba(255, 100, 0, 0.3)',
        paddingBottom: '10px',
        marginBottom: '15px',
        marginTop: '0',
        fontSize: '1.5em',
    };
    const listItemStyle = {
      marginBottom: '10px',
      borderBottom: '1px dotted rgba(255, 100, 0, 0.5)', 
      paddingBottom: '5px',
    };
    const linkStyle = {
      textDecoration: 'none',
      color: '#fffff0', 
      textShadow: '0 0 3px rgba(255, 200, 0, 0.5)',
      display: 'block',
    };
    const typeSpanStyle = {
      marginLeft: '10px',
      fontSize: '0.9em',
      color: '#ffaa00', 
    };
    
    // --- 렌더링 시작 ---

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>😈 지옥 디펜스 유닛 정보</h1>
            
            {mainGroupOrder.filter(key => finalGroupedStructure[key]).map(mainGroupName => (
                <div key={mainGroupName} style={sectionBoxStyle}>
                    <h2 style={mainSectionTitleStyle}>
                        {mainGroupName === '악마' ? '😈' : '😇'} {mainGroupName} 목록
                    </h2>

                    {/* 하위 그룹 출력 (요청된 순서대로 정렬) */}
                    {subgroupOrder[mainGroupName]
                        .filter(subKey => finalGroupedStructure[mainGroupName][subKey]) // 데이터가 있는 하위 키만 필터링
                        .map(subGroupKey => (
                            <div key={subGroupKey} style={{marginBottom: '20px'}}>
                                 <h3 style={subSectionTitleStyle}>📜 {subGroupKey} ({finalGroupedStructure[mainGroupName][subGroupKey].length}개)</h3>
                                 
                                 <ul style={{ listStyleType: 'none', padding: 0 }}>
                                     {finalGroupedStructure[mainGroupName][subGroupKey].map(unit => (
                                         <li key={unit.id} style={listItemStyle}>
                                             <Link to={`/unit/${unit.id}`} style={linkStyle}>
                                                 <strong>{unit.name}</strong> 
                                                 <span style={typeSpanStyle}>
                                                     (공격 타입: {unit.type || '없음'})
                                                 </span>
                                             </Link>
                                         </li>
                                     ))}
                                 </ul>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default UnitList;