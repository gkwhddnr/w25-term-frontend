import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import HellBackground from '../../images/지옥디 사진/hell_background.png'; 
import { units } from '../data/units';

function getUnitImagePath(unit) {
  if (!unit || !unit.name) return null;

  const unitNameWithExtension = `${unit.name}.png`; 
  return `../../images/지옥디 사진/${unitNameWithExtension}`;
}

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
    border: '2px solid #FF4500',
    borderRadius: '5px',
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
  
  // 🔽 상세 정보 필터링 로직: id, category를 제외하고 null인 값을 제외한 필드만 추출
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
        
        {/* 🔽 이미지 크기 고정 스타일 적용됨 */}
        {imageUrl && (
            <img 
              src={imageUrl} 
              alt={`${safeUnit.name} 유닛 이미지`} 
              style={themeStyles.unitImage} 
              onError={(e) => { 
                e.currentTarget.style.display = 'none';
                console.error(`Image Load Error: Path ${imageUrl} not found.`);
              }}
            />
        )}
        
        {/* 🔽 필터링된 상세 정보 출력 */}
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