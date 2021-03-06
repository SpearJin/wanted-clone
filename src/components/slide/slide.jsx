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
  let setTime = useRef(null);
  let isMove = useRef(false);

  useEffect(() => {
    setSlideWidth(slideItem.current.getBoundingClientRect().width);
    intervalImage();
    const slideImages = slideList.current.querySelectorAll('.slide_item');
    slideImages.forEach((item, index) => {
      if (currentIndex === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, [currentIndex]);

  const intervalImage = () => {
    clearInterval(intervalTime.current);
    intervalTime.current = setInterval(() => {
      let nextIndex;
      nextIndex = currentIndex + 1;
      moveImage(nextIndex);
    }, 2000);
  };

  // 마우스 땔떼
  const handlerMouseLeave = (e) => {
    if (startPostion) {
      handlerMouseUp(e);
    }
    intervalImage();
  };

  // 마우스 올릴때
  const handlerMouseOver = () => {
    console.log('mouseOver');
    clearInterval(intervalTime.current);
  };

  const distingBtn = (e) => {
    let nextIndex;
    nextIndex = e.target.className.includes('btn_pre') ? currentIndex - 1 : currentIndex + 1;
    moveImage(nextIndex);
  };

  const moveImage = (nextIndex) => {
    if (isMove.current) {
      return;
    }
    isMove.current = true;
    slideList.current.style.transition = '300ms';
    slideList.current.style.pointerEvents = 'none';
    setCurrentIndex(nextIndex);
    clearTimeout(setTime.current);
    setTime.current = setTimeout(() => {
      slideList.current.style.transition = '0s';
      slideList.current.style.pointerEvents = 'all';
      nextIndex = nextIndex < 2 ? slideImg.length - 3 : nextIndex === slideImg.length - 2 ? 2 : nextIndex;
      setCurrentIndex(nextIndex);
      isMove.current = false;
    }, 300);
  };

  let startPostion = 0;
  let endPostion = 0;
  let swiperX = 0;
  let swiperWidth = 0;

  const handlerMouseDown = (e) => {
    console.log('mouseDown');
    e.preventDefault();
    startPostion = e.clientX;
    document.onmousemove = mouse;
  };

  const handlerMouseUp = (e) => {
    endPostion = e.clientX;
    console.log(startPostion, endPostion);
    document.onmousemove = null;
    let nextIndex;
    nextIndex = startPostion > endPostion ? currentIndex + 1 : currentIndex - 1;
    moveImage(nextIndex);
  };

  const mouse = (e) => {
    swiperX = e.clientX;
    swiperWidth = startPostion - swiperX;
    slideList.current.style.transform = `translateX(calc(${(innerWidth - slideWidth) / 2}px - ${
      slideWidth * currentIndex
    }px - ${swiperWidth}px))`;
  };

  return (
    <div className='slide'>
      <ul
        className='slide_list'
        ref={slideList}
        style={{ transform: `translateX(calc(${(innerWidth - slideWidth) / 2}px - ${slideWidth * currentIndex}px))` }}
        onMouseDown={handlerMouseDown}
        onMouseUp={handlerMouseUp}
        onMouseOver={handlerMouseOver}
        onMouseLeave={handlerMouseLeave}
      >
        {slideImg.map((img) => (
          <li key={img.id} className='slide_item' ref={slideItem}>
            <img className='slide-img' src={img.image} alt='img' />
          </li>
        ))}
      </ul>
      <button className='btn btn_pre' onClick={distingBtn}>
        이전
      </button>
      <button className='btn btn_next' onClick={distingBtn}>
        다음
      </button>
    </div>
  );
};

export default Slide;
