import React from 'react'
import styled, { keyframes } from 'styled-components'
import LazyLoad from 'react-lazyload'

const FullScreenIcon = styled.div`
  position: absolute;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  opacity: 0;
  transition: 0.3s;
  transition-delay: 0.3s;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  grid-column: span 1;
  height: ${({ h }) => (h ? h + 'px' : '100%')};
  cursor: pointer;
  grid-column-start: span 1;
  grid-column-end: span 3;
  transition: 0.5s;
  filter: grayscale(100%);
  transition-delay: 0.3s;
  &:hover {
    filter: none;
    z-index: 99;
    transform: scale(1.1);
  }
  &:hover ${FullScreenIcon} {
    opacity: 1;
  }
`
const loadingAnimation = props => {
  return keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: ${props.color};
  }
  100% {
    background-color: #fff;
  }
`
}

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${props => loadingAnimation(props)} 1s linear;
`

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: ${({ w }) => (w ? w + 'px' : '100%')};
  height: ${({ h }) => (h ? h + 'px' : '100%')};
  object-fit: cover;
`

const HorizontalLine = styled.div`
  width: 60px;
  height: 5px;
  background: white;
`

const VerticalLine = styled.div`
  width: 5px;
  height: 50px;
  background: white;
`

const LinesWrapper = styled.div(
  ({ top, bottom, left, right, isMirror, setSrc }) => ({
    position: 'absolute',
    top,
    left,
    right,
    bottom,
    transform: isMirror && 'rotateY(180deg)',
  })
)

export const LazyLoadImage = React.memo(
  ({ src, toggleModal, setSrc, alt, w, h, color }) => {
    const refPlaceholder = React.useRef()

    const removePlaceholder = () => {
      refPlaceholder.current.remove()
    }

    return (
      <ImageWrapper
        onClick={() => {
          toggleModal(true)
          setSrc(src)
        }}
        w={w}
        h={h}
      >
        <Placeholder color={color} ref={refPlaceholder} />
        <LazyLoad>
          <StyledImage
            loading="lazy"
            onLoad={removePlaceholder}
            onError={removePlaceholder}
            src={src}
            alt={alt}
          />
          <FullScreenIcon>
            <LinesWrapper>
              <HorizontalLine></HorizontalLine>
              <VerticalLine></VerticalLine>
            </LinesWrapper>
            <LinesWrapper bottom={0}>
              <VerticalLine></VerticalLine>
              <HorizontalLine></HorizontalLine>
            </LinesWrapper>
            <LinesWrapper isMirror={true} right={0}>
              <HorizontalLine></HorizontalLine>
              <VerticalLine></VerticalLine>
            </LinesWrapper>
            <LinesWrapper isMirror={true} right={0} bottom={0}>
              <VerticalLine></VerticalLine>
              <HorizontalLine></HorizontalLine>
            </LinesWrapper>
          </FullScreenIcon>
        </LazyLoad>
      </ImageWrapper>
    )
  }
)
