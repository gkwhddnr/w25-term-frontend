import React from 'react';
import { Link } from 'react-router-dom';

function UnitList({ units }) {
    
    // 1. 유닛을 주 목록 (Main Group)에 따라 분류
    const mainGroups = units.reduce((acc, unit) => {
        const category = unit.category || '기타'; // category가 null이면 '기타'로 설정

        // 악마 그룹에 포함되는 유닛
        if (category === '악마' || category === '악인' || category === '적대자' || category === '타락천사' || category === '건물') {
            acc['악마'] = acc['악마'] || [];
            acc['악마'].push(unit);
        // 천사 그룹에 포함되는 유닛
        } else if (category === '천사') {
            acc['천사'] = acc['천사'] || [];
            acc['천사'].push(unit);
        // 💡 수정: 위의 어떤 그룹에도 속하지 않으면 모두 '기타' 그룹으로 보냅니다.
        } else { 
            acc['기타'] = acc['기타'] || [];
            acc['기타'].push(unit);
        }
        return acc;
    }, {});


    // 2. 각 주 목록 내부를 '하위 목록 (Subgroup)'으로 세부 그룹화
    const finalGroupedStructure = {};

    for (const [mainGroupName, mainGroupUnits] of Object.entries(mainGroups)) {
        
        // 세부 분류 키를 결정하는 함수
        const getSubGroupKey = (unit) => {
            const hierarchy = unit.hierarchy || unit.classification || unit.category;
            
            // 악마 주 목록 내 하위 분류
            if (mainGroupName === '악마') {
        
            // 계급(hierarchy) 기반 분류를 먼저 확인합니다.
            if (hierarchy === '대악마') return '대악마';
            if (hierarchy === '상급악마') return '상급 악마';
            if (hierarchy === '중급악마') return '중급 악마';
            if (hierarchy === '하급악마') return '하급 악마'; 
            if (hierarchy === '적대자') return '적대자';

            // category 기반 분류를 그 다음으로 확인합니다.
            if (unit.category === '타락천사') return '타락천사'; 
            if (unit.category === '건물') return '건물'; 
            if (unit.category === '악인') return '악인'; 
            
            return '기타 악마'; // 위의 어디에도 속하지 않는 경우
        }
            
            
            if (mainGroupName === '천사') {
                if (hierarchy && hierarchy.includes('영웅')) return '영웅급 천사'; 
                return '일반 천사'; 
            }
            
            
            if (mainGroupName === '기타') {
                return '기타 목록';
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


    const mainGroupOrder = ['악마', '천사', '기타']; 
    
    const subgroupOrder = {
        '악마': ['하급 악마', '중급 악마', '상급 악마', '대악마', '적대자', '타락천사', '건물', '악인', '기타 악마'],
        '천사': ['일반 천사', '영웅급 천사'],
        '기타': ['기타 목록'], 
    };
    
    
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
    const sloganStyle = {
        color: '#FF4500', // 오렌지 레드
        fontSize: '1.5em',
        textAlign: 'center',
        margin: '20px auto 40px auto', // 위아래 여백을 더 줍니다.
        padding: '10px 20px',
        maxWidth: '700px',
        border: '3px solid #8B0000', // 다크 레드 테두리
        borderRadius: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textShadow: '0 0 10px #FFD700, 0 0 5px #FF0000', // 금색과 빨간색이 섞인 그림자 효과
        boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)', // 바깥쪽에 옅은 빨간색 그림자
        fontWeight: 'bold',
        letterSpacing: '2px',
    };
    const mainSectionTitleStyle = {
        color: '#FF4500', 
        textShadow: '0 0 5px #FFD700',
        borderBottom: '3px double #FF4500',
        paddingBottom: '10px',
        marginBottom: '20px',
        fontSize: '2em',
        textAlign: 'center',
    };
    const subSectionTitleStyle = {
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
            <h1 style={titleStyle}>스타크래프트 유즈맵 지옥 디펜스 유닛 정보</h1>
            
            <div style={sloganStyle}>
                지옥에 처 들어오는 천사의 무리로부터 왕좌를 지켜내고<br />
                지옥의 지배자가 되어라!
            </div>

            {mainGroupOrder.filter(key => finalGroupedStructure[key]).map(mainGroupName => (
                <div key={mainGroupName} style={sectionBoxStyle}>
                    <h2 style={mainSectionTitleStyle}>
                        {mainGroupName === '악마' ? '' : mainGroupName === '천사' ? '' : ''} {mainGroupName} 목록
                    </h2>

                    {/* 하위 그룹 출력 (요청된 순서대로 정렬) */}
                    {subgroupOrder[mainGroupName]
                        .filter(subKey => finalGroupedStructure[mainGroupName] && finalGroupedStructure[mainGroupName][subKey]) 
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