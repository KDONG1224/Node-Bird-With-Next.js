import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from './styles';

const ImageZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToScroll={1}
          >
            {images.map((value) => (
              <ImgWrapper key={value}>
                <img src={value.src} alt={value.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {'  '}/ {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImageZoom.proptTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageZoom;

// 왜 폴더를 만들고 안에 index.js를 넣은거냐?
// 스타일드 컴포넌트때문에 지저분한게 많다.
// 다 없애고 styles.js에 보낸다.
// export 시켜 import 시켜서 사용한다,
// 코드를 분리한다. 깔끔하게 볼 수 있게
// 가장 중요한 것은 index로, 아닌것은 다른 파일로 만들어 불러온다.
