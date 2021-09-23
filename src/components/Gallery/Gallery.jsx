import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import { LazyLoadImage } from './LazyLoadImage'

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-template-rows: flow;
  grid-auto-flow: dense;
`

export const Gallery = ({ images, setPage }) => {
  const [isOpen, toggleModal] = useState(false)
  const [src, setSrc] = useState('')
  return (
    <>
      {isOpen && (
        <Lightbox mainSrc={src} onCloseRequest={() => toggleModal(false)} />
      )}
      <StyledGallery>
        {images &&
          images.map(img => (
            <div key={img.id}>
              <LazyLoadImage
                toggleModal={toggleModal}
                setSrc={setSrc}
                w={200}
                h={200}
                src={`${img.url}.jpg`}
                alt={img.alt_description ?? ''}
                color={img.color}
              />
              {img.user?.profile_image && (
                <LazyLoadImage
                  toggleModal={toggleModal}
                  setSrc={setSrc}
                  w={200}
                  h={200}
                  src={`${img.user.profile_image}.webp`}
                  alt={img.alt_description ?? ''}
                  color={img.color}
                />
              )}
            </div>
          ))}
      </StyledGallery>
    </>
  )
}
