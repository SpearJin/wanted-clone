import React, { useEffect, useRef, useState } from 'react';
import './slide.css';

const slideImg = [
  // 가짜 데이터
  {
    id: -1,
    image: 'https://static.wanted.co.kr/images/banners/1473/41f7b36e.thumb_1006_280.jpg',
    title: '개발자가 되고싶은 분들!?',
    subTitle: '프론트앤드 무료 교육과정 참여하기',
  },
  {
    id: -2,
    image: 'https://static.wanted.co.kr/images/banners/1484/b2853456.thumb_1006_280.jpg',
    title: '성장하는 개발자가 되려면?',
    subTitle: '000 검색하지 말 것!',
  },

  // 진짜 데이터
  {
    id: 0,
    image: 'https://static.wanted.co.kr/images/banners/1460/619f3af7.thumb_1006_280.jpg',
    title: '개발자 성장 비결 공개!',
    subTitle: 'Velog, 글 쓰는 개발자들의 이야기',
  },
  {
    id: 1,
    image: 'https://static.wanted.co.kr/images/banners/1486/fba2df30.thumb_1006_280.jpg',
    title: '성과를 내는 마케팅',
    subTitle: '실제 사례를 공개 합니다!',
  },
  {
    id: 2,
    image: 'https://static.wanted.co.kr/images/banners/1488/baa54448.thumb_1006_280.jpg',
    title: 'UX 디자이너의 커리어 설계',
    subTitle: '브랜드 가치를 더하는 디자인',
  },
  {
    id: 3,
    image: 'https://static.wanted.co.kr/images/banners/1468/3df61cbc.thumb_1006_280.jpg',
    title: '해, 커리어 EP 02 공개',
    subTitle: '마지막 관문 2라운드의 승자는?',
  },
  {
    id: 4,
    image: 'https://static.wanted.co.kr/images/banners/1473/41f7b36e.thumb_1006_280.jpg',
    title: '개발자가 되고싶은 분들!?',
    subTitle: '프론트앤드 무료 교육과정 참여하기',
  },
  {
    id: 5,
    image: 'https://static.wanted.co.kr/images/banners/1484/b2853456.thumb_1006_280.jpg',
    title: '성장하는 개발자가 되려면?',
    subTitle: '000 검색하지 말 것!',
  },

  // 가짜 데이터
  {
    id: 6,
    image: 'https://static.wanted.co.kr/images/banners/1460/619f3af7.thumb_1006_280.jpg',
    title: '개발자 성장 비결 공개!',
    subTitle: 'Velog, 글 쓰는 개발자들의 이야기',
  },
  {
    id: 7,
    image: 'https://static.wanted.co.kr/images/banners/1486/fba2df30.thumb_1006_280.jpg',
    title: '성과를 내는 마케팅',
    subTitle: '실제 사례를 공개 합니다!',
  },
];

const Slide = (props) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [slideWidth, setSlideWidth] = useState(0);

  const innerWidth = window.innerWidth;
  const slideList = useRef(null);
  const slideItem = useRef(null);
  let intervalTime = useRef(null);

  useEffect(() => {
    setSlideWidth(slideItem.current.getBoundingClientRect().width);
    clearInterval(intervalTime.current);
    intervalTime.current = setInterval(() => {
      let nextIndex;
      nextIndex = currentIndex + 1;
      slideList.current.style.transition = '200ms';
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        slideList.current.style.transition = '0s';
        nextIndex = nextIndex === slideImg.length - 3 ? 2 : nextIndex;
        setCurrentIndex(nextIndex);
      }, 200);
    }, 2000);
  }, [currentIndex]);

  const changeImage = (e) => {
    let nextIndex;
    nextIndex = e.target.className.includes('btn_pre') ? currentIndex - 1 : currentIndex + 1;
    slideList.current.style.transition = '200ms';
    setCurrentIndex(nextIndex);
    setTimeout(() => {
      slideList.current.style.transition = '0s';
      nextIndex = nextIndex < 2 ? slideImg.length - 3 : nextIndex === slideImg.length - 2 ? 2 : nextIndex;
      setCurrentIndex(nextIndex);
    }, 200);
  };

  return (
    <div className='slide'>
      <ul
        className='slide_list'
        ref={slideList}
        style={{ transform: `translateX(calc(${(innerWidth - slideWidth) / 2}px - ${slideWidth * currentIndex}px))` }}
      >
        {slideImg.map((img) => (
          <li key={img.id} className='slide_item' ref={slideItem}>
            <img className='slide-img' src={img.image} alt='img' />
          </li>
        ))}
      </ul>
      <button className='btn btn_pre' onClick={changeImage}>
        이전
      </button>
      <button className='btn btn_next' onClick={changeImage}>
        다음
      </button>
    </div>
  );
};

export default Slide;
