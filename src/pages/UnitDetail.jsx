import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import HellBackground from '../../images/지옥디 사진/hell_background.png'; 
import { units } from '../data/units';

function getUnitImagePath(unit) {
  if (!unit || !unit.name) return null;
  const unitNameWithExtension = `${unit.name}.png`; 
  return `../../images/지옥디 사진/${unitNameWithExtension}`;
}

const auraStyles = {
  //  대악마: 검은색 + 진한 붉은 아우라
  '대악마': { 
    boxShadow: '0 0 30px 12px rgba(255, 0, 0, 1), 0 0 60px 25px rgba(125, 0, 0, 0.9)', 
    border: '5px solid #000000ff', 
  },
  //  적대자: 검은 아우라
  '적대자': {
    boxShadow: '0 0 30px 12px rgba(0, 0, 0, 1), 0 0 60px 25px rgba(50, 50, 50, 0.9)', 
    border: '5px solid #000000', 
  },
  //  타락천사: 밝은색과 노란색을 섞은 아우라
  '타락천사': {
    boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.6), 0 0 30px 10px rgba(255, 200, 0, 0.8)',
    border: '3px solid #DAA520',
  },
  //  악인: 붉은색 + 연한 녹색 아우라
  '악인': {
    boxShadow: '0 0 25px 10px rgba(0, 236, 16, 0.85), 0 0 50px 20px rgba(255, 0, 0, 0.85)', 
    border: '4px solid #d40000ff', 
  },
  //  일반 천사: 흰색 아우라
  '일반 천사': {
    boxShadow: '0 0 25px 10px rgba(255, 255, 255, 1), 0 0 50px 20px rgba(200, 200, 255, 0.8)', 
    border: '5px solid #F0F8FF', 
  },
  //  영웅급 천사: 진한 파란색(하늘색 계열) 아우라로 극단적 강화
  '영웅급 천사': {
    boxShadow: '0 0 35px 15px rgba(0, 100, 255, 1), 0 0 70px 30px rgba(0, 100, 255, 0.8)', // 선명한 파란색 아우라
    border: '6px solid #007FFF', // 매우 진한 파란색 테두리, 두께 증가
  },
  //  나머지 유닛: 얇은 붉은 아우라
  '기본': {
      boxShadow: '0 0 10px 3px rgba(200, 0, 0, 0.7), 0 0 20px 8px rgba(100, 0, 0, 0.5)', 
      border: '2px solid #CC0000',
  }
};

const themeStyles = {
  container: { 
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#000',
    backgroundImage: `url(${HellBackground})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
  },
  title: {
    color: '#FFD700', 
    fontSize: '2em',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '0 0 5px #FF4500, 0 0 10px #FF4500',
  },
  detailBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    border: '2px solid #8B0000',
    borderRadius: '10px',
    padding: '30px',
    color: '#FAFAFA',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 0 15px #8B0000',
    textAlign: 'center',
  },
  detailText: {
    margin: '10px 0',
    fontSize: '1.1em',
    lineHeight: '1.4',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderBottom: '1px dotted rgba(255, 255, 255, 0.2)',
    paddingBottom: '5px',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#8B0000',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  unitImage: {
    display: 'block',
    margin: '0 auto 20px auto',
    width: '196px', 
    height: '196px', 
    borderRadius: '5px',
    padding: '5px', 
    cursor: 'pointer', 
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border 0.3s ease-in-out', 
  },
  unitImageHover: {
      transform: 'scale(1.1)',
  },
  label: {
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: '10px',
    minWidth: '120px',
  }
};

const fieldLabels = {
  name: "이름", nickname: "이명", type: "공격 타입", damage: "공격력", 
  range: "사거리", speedOfAttack: "공격 속도", description: "설명", 
  health: "체력", shield: "실드", reward: "보상", hierarchy: "계급", classification: "분류",
};

function UnitDetail() {
  const { id } = useParams();
  const safeUnit = units.find(u => u.id === id); 
  
  const [isHovered, setIsHovered] = useState(false); 

  if (!safeUnit) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.detailBox}>
          <h1 style={themeStyles.title}>유닛 정보를 찾을 수 없습니다.</h1>
          <p style={themeStyles.detailText}>**원인**: URL ID({id})에 해당하는 데이터가 `units` 배열에 존재하지 않습니다.</p>
          <div style={themeStyles.buttonContainer}>
            <Link to="/" style={themeStyles.button}>
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = getUnitImagePath(safeUnit);
  
  // 유닛의 등급 판단 로직 (우선순위 고려)
  let unitClass = '기본'; 

  if (safeUnit.hierarchy === '대악마' || safeUnit.classification === '대악마') {
    unitClass = '대악마';
  } else if (safeUnit.hierarchy === '적대자' || safeUnit.classification === '적대자') {
    unitClass = '적대자';
  } else if (safeUnit.category === '타락천사') { 
    unitClass = '타락천사';
  } else if (safeUnit.category === '악인') { 
    unitClass = '악인';
  } else if (safeUnit.hierarchy && safeUnit.hierarchy.includes('영웅급')) { // 영웅급 천사
    unitClass = '영웅급 천사';
  } else if (safeUnit.category === '천사') { // 일반 천사
    unitClass = '일반 천사';
  }
  
  // 아우라 스타일 결정
  const appliedAuraStyle = auraStyles[unitClass];
  
  // 최종 이미지 스타일 (기본 + 아우라 + 호버)
  const finalImageStyle = {
    ...themeStyles.unitImage,
    ...appliedAuraStyle, 
    ...(isHovered ? themeStyles.unitImageHover : {}),
  };

  const fieldsToDisplay = Object.keys(safeUnit)
    .filter(key => 
      key !== 'id' && 
      key !== 'category' && 
      safeUnit[key] !== null
    );

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.detailBox}>
        <h1 style={themeStyles.title}>{safeUnit.name} 상세 정보</h1>
        
        {imageUrl && (
            <img 
              src={imageUrl} 
              alt={`${safeUnit.name} 유닛 이미지`} 
              style={finalImageStyle} 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
              onError={(e) => { 
                e.currentTarget.style.display = 'none';
                console.error(`Image Load Error: Path ${imageUrl} not found.`);
              }}
            />
        )}
        
        {fieldsToDisplay.map(key => (
          <p key={key} style={themeStyles.detailText}>
            <span style={themeStyles.label}>{fieldLabels[key] || key}:</span> <span>{safeUnit[key]}</span>
          </p>
        ))}

        <div style={themeStyles.buttonContainer}>
          <Link to="/" style={themeStyles.button}>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnitDetail;