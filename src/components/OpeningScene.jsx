import React, { useState, useEffect, useRef } from 'react';
import './OpeningScene.css'; 


import HellBackground from '../../images/지옥디 사진/hell_background.png';

const QUOTES = [
  "신의 옥좌와 위광에 대항해 불경하고 \n오만불손한 싸움을 감히 하늘에서 일으켰다.\n-Paradise Lost-",
  "용은 전쟁을 벌이다 쫓겨나 지옥으로 내려간다. \n미카엘은 사탄의 무리를 없애기 위해 지옥으로 진격한다.\n-요한계시록-"
];

const TYPING_DELAY = 50; 
const UNTYPING_DELAY = 30; 
const QUOTE_HOLD_DURATION = 2000; 
const FADE_DURATION = 1500; 

function OpeningScene({ onFinish }) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayingText, setDisplayingText] = useState(''); 
  const [isTyping, setIsTyping] = useState(true); 
  const [isFadingOut, setIsFadingOut] = useState(false);

  const currentQuote = QUOTES[currentQuoteIndex];
  const textIndexRef = useRef(0); 

  // 타이핑/역타이핑 효과 로직
  useEffect(() => {
    const animationLoop = setTimeout(() => {
      if (isTyping) {
        // 타이핑 중
        if (textIndexRef.current < currentQuote.length) {
          setDisplayingText(currentQuote.substring(0, textIndexRef.current + 1));
          textIndexRef.current += 1;
        } else {
          // 타이핑 완료 후 잠시 대기
          const holdTimer = setTimeout(() => {
            setIsTyping(false); // 역타이핑으로 전환
          }, QUOTE_HOLD_DURATION);
          return () => clearTimeout(holdTimer);
        }
      } else {
        // 역타이핑 중
        if (textIndexRef.current > 0) {
          setDisplayingText(currentQuote.substring(0, textIndexRef.current - 1));
          textIndexRef.current -= 1;
        } else {
          // 역타이핑 완료
          if (currentQuoteIndex < QUOTES.length - 1) {
            // 다음 문구로 전환
            setCurrentQuoteIndex(prevIndex => prevIndex + 1);
            setIsTyping(true); // 다시 타이핑 시작
            textIndexRef.current = 0; // 인덱스 초기화
          } else {
            // 모든 문구 처리 완료, 최종 페이드 아웃 시작
            setIsFadingOut(true);
            const fadeTimer = setTimeout(() => {
              onFinish(); // 부모 컴포넌트에 전환 완료 알림
            }, FADE_DURATION);
            return () => clearTimeout(fadeTimer);
          }
        }
      }
    }, isTyping ? TYPING_DELAY : UNTYPING_DELAY); 

    return () => clearTimeout(animationLoop);
  }, [displayingText, isTyping, currentQuoteIndex, currentQuote, onFinish]);


  const sceneClass = `opening-scene ${isFadingOut ? 'fade-out' : ''}`;

  return (
    <div className={sceneClass} style={{ 
      transitionDuration: `${FADE_DURATION}ms`,
      backgroundImage: `url(${HellBackground})` 
    }}>
      <pre className="quote-text">{displayingText}</pre>
    </div>
  );
}

export default OpeningScene;
