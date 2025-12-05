import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HellBackground from '../../images/지옥디 사진/hell_background.png';

// (중략) auraStyles, themeStyles, fieldLabels 정의는 그대로 유지
const auraStyles = {
  '대악마': { boxShadow: '0 0 30px 12px rgba(255, 0, 0, 1), 0 0 60px 25px rgba(125, 0, 0, 0.9)', border: '5px solid #000000ff' },
  '적대자': { boxShadow: '0 0 30px 12px rgba(0, 0, 0, 1), 0 0 60px 25px rgba(50, 50, 50, 0.9)', border: '5px solid #000000' },
  '타락천사': { boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.6), 0 0 30px 10px rgba(255, 200, 0, 0.8)', border: '3px solid #DAA520' },
  '악인': { boxShadow: '0 0 25px 10px rgba(0, 236, 16, 0.85), 0 0 50px 20px rgba(255, 0, 0, 0.85)', border: '4px solid #d40000ff' },
  '일반 천사': { boxShadow: '0 0 25px 10px rgba(255, 255, 255, 1), 0 0 50px 20px rgba(200, 200, 255, 0.8)', border: '5px solid #F0F8FF' },
  '영웅급 천사': { boxShadow: '0 0 35px 15px rgba(0, 100, 255, 1), 0 0 70px 30px rgba(0, 100, 255, 0.8)', border: '6px solid #007FFF' },
  '기본': { boxShadow: '0 0 10px 3px rgba(200, 0, 0, 0.7), 0 0 20px 8px rgba(100, 0, 0, 0.5)', border: '2px solid #CC0000' }
};

const themeStyles = {
  container: {
    minHeight: '100vh', width: '100%', backgroundColor: '#000',
    backgroundImage: `url(${HellBackground})`, backgroundSize: 'cover',
    backgroundPosition: 'center', backgroundAttachment: 'fixed',
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0'
  },
  title: {
    color: '#FFD700', fontSize: '2em', textAlign: 'center', marginBottom: '20px',
    textShadow: '0 0 5px #FF4500, 0 0 10px #FF4500',
  },
  detailBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)', border: '2px solid #8B0000', borderRadius: '10px',
    padding: '30px', color: '#FAFAFA', maxWidth: '600px', width: '90%', boxShadow: '0 0 15px #8B0000', textAlign: 'center',
  },
  detailText: {
    margin: '10px 0', fontSize: '1.1em', lineHeight: '1.4', display: 'flex',
    flexWrap: 'wrap', justifyContent: 'space-between', borderBottom: '1px dotted rgba(255, 255, 255, 0.2)', paddingBottom: '5px',
  },
  buttonContainer: { textAlign: 'center', marginTop: '30px' },
  button: {
    display: 'inline-block', padding: '10px 20px', backgroundColor: '#8B0000',
    color: 'white', textDecoration: 'none', borderRadius: '5px',
    transition: 'background-color 0.3s', border: 'none', cursor: 'pointer', fontWeight: 'bold',
  },
  unitImage: {
    display: 'block', margin: '0 auto 20px auto', width: '196px', height: '196px',
    borderRadius: '5px', padding: '5px', cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border 0.3s ease-in-out',
  },
  unitImageHover: { transform: 'scale(1.1)' },
  label: { fontWeight: 'bold', color: '#FFD700', marginRight: '10px', minWidth: '120px' }
};

const fieldLabels = {
  name: "이름", nickname: "이명", type: "공격 타입", damage: "공격력",
  range: "사거리", speedofattack: "공격 속도", description: "설명", // Note: Service에서 speedofattack으로 키가 넘어올 수 있음
  health: "체력", health2: "체력", shield: "실드", reward: "보상", hierarchy: "계급", classification: "분류",
};


// 필드 출력 순서 정의 (계급(hierarchy)을 이름과 이명 사이에 배치)
const DISPLAY_ORDER = [
    'name', 
    'hierarchy', 
    'nickname', 
    'classification', 
    'type', 
    'damage', 
    'shield', 
    'range', 
    'speedofattack', // service에서 speedofattack으로 변환되었다고 가정
    'description', 
    'reward', 
];

function UnitDetail({ units }) {
  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
      // units 배열에서 현재 ID에 맞는 유닛을 찾습니다.
      const foundUnit = units.find(u => u.id === id);
      
      if (foundUnit) {
          setUnit(foundUnit);
          setError(false);
      } else {
          setError(true);
          setUnit(null);
      }
  }, [id, units]); 

  if (units.length === 0 && !unit && !error) {
      return <div style={themeStyles.container}><div style={themeStyles.detailBox}><h1 style={themeStyles.title}>데이터 로딩 중...</h1></div></div>;
  }

  if (error || !unit) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.detailBox}>
          <h1 style={themeStyles.title}>유닛 정보를 찾을 수 없습니다.</h1>
          <p style={themeStyles.detailText}>ID ({id})에 해당하는 데이터가 목록에 없습니다.</p>
          <div style={themeStyles.buttonContainer}>
            <Link to="/" style={themeStyles.button}>목록으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }
  
    let unitClass = '기본';
    if (unit.hierarchy === '대악마' || unit.classification === '대악마') unitClass = '대악마';
    else if (unit.hierarchy === '적대자' || unit.classification === '적대자') unitClass = '적대자';
    else if (unit.hierarchy === '타락천사') unitClass = '타락천사';
    else if (unit.hierarchy === '악인') unitClass = '악인';
    else if (unit.hierarchy?.includes('영웅급')) unitClass = '영웅급 천사';
    else if (unit.category === '천사') unitClass = '일반 천사';

    const finalImageStyle = {
      ...themeStyles.unitImage,
      ...auraStyles[unitClass],
      ...(isHovered ? themeStyles.unitImageHover : {}),
    };

    let imageFileName = `${unit.name}.png`;

    let imageNameFromFile = unit.name; // 기본 파일명

    if (unit.name.includes('천사') && unit.hierarchy) {
        if (unit.name.includes('계급')) {
            imageNameFromFile = unit.name.replace(/\(.*\)/, ''); // 괄호 부분 제거 (예: 지천사(2계급) -> 지천사)
        }
        
        if (unit.hierarchy === '일반 천사' && unit.name.includes('계급')) {
            imageFileName = `${imageNameFromFile}(${unit.name.match(/\((.*?)\)/)?.[1]}).png`;
        }
        
    }

    if (unit.name === '가브리엘' && unit.hierarchy === '타락천사') {
    // 유닛 이름이 '가브리엘'이고 계급이 '타락천사'일 경우 파일명을 강제로 변경합니다.
      imageFileName = `가브리엘(타락천사).png`;
    }
    if (unit.name === '미카엘' && unit.hierarchy === '타락천사') {
    // 유닛 이름이 '가브리엘'이고 계급이 '타락천사'일 경우 파일명을 강제로 변경합니다.
      imageFileName = `미카엘(타락천사).png`;
    }
    const finalImageUrl = `http://localhost:8080/images/units/${encodeURIComponent(imageFileName)}`;
    

    const rawHealthValue = unit.health;    
    const rawHealth2Value = unit.health2;  

    let displayHealthValue = null;

    if (typeof rawHealth2Value === 'string' && rawHealth2Value.length > 0) {
        displayHealthValue = rawHealth2Value; // 예: "50(+50)"
    } 
    else if (rawHealthValue !== null && rawHealthValue !== undefined && rawHealthValue !== "") {
        displayHealthValue = rawHealthValue; // Case C: 50이 출력됨
    }

    // 필드 렌더링을 DISPLAY_ORDER에 따라 수행
    const renderedFields = [];

    DISPLAY_ORDER.forEach(key => {
        // health와 health2 필드는 렌더링에서 완전히 제외
        if (key === 'health' || key === 'health2' || key === 'category') {
            return; 
        }

        // damage 필드를 만났을 때
        if (key === 'damage') {
            // A. Damage 필드 렌더링
            if (unit.damage !== null && unit.damage !== undefined && unit.damage !== "") {
                renderedFields.push(
                    <p key='damage' style={themeStyles.detailText}>
                        <span style={themeStyles.label}>{fieldLabels.damage || '공격력'}:</span> 
                        <span>{unit.damage}</span>
                    </p>
                );
            }
          
            // B. 바로 뒤에 계산된 체력 값 삽입
            if (displayHealthValue !== null) {
                renderedFields.push(
                    <p key="displayHealth" style={themeStyles.detailText}>
                        <span style={themeStyles.label}>체력:</span> 
                        <span>{displayHealthValue}</span>
                    </p>
                );
            }
            return; 
        }
        
        // 3. 그 외 필드 렌더링
        if (unit[key] !== null && unit[key] !== undefined && unit[key] !== "") {
            renderedFields.push(
                <p key={key} style={themeStyles.detailText}>
                    <span style={themeStyles.label}>{fieldLabels[key] || key}:</span> 
                    <span>{unit[key]}</span>
                </p>
            );
        }
    });


  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.detailBox}>
        <h1 style={themeStyles.title}>{unit.name} 상세 정보</h1>
        <img
          src={finalImageUrl}
          alt={`${unit.name} 유닛 이미지`}
          style={finalImageStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            console.warn('이미지 로드 실패. 경로:', finalImageUrl);
          }}
        />
        {renderedFields} {/* 순서가 조정된 필드 사용 */}
        <div style={themeStyles.buttonContainer}>
          <Link to="/" style={themeStyles.button}>목록으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}

export default UnitDetail;