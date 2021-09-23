import React, { useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import styled from 'styled-components'

import { fetchImages } from './api'
import { Global } from './globalStyles'
import { Gallery } from './components/Gallery/Gallery'
import { Form } from './components/Form'

const StyledButton = styled.button`
  box-sizing: border-box;
  display: inline-block;
  width: 10em;
  height: 2.25em;
  cursor: pointer;

  padding: 0.5em 1em;
  background-color: transparent;
  border: 1px solid #fff;

  text-align: center;
  color: #fff;
  white-space: nowrap;
  line-height: 1.4;
  font-size: 1em;
  text-decoration: none;

  transition: width 0.1s ease, height 0.4s ease, border-width 0.4s ease,
    border-radius 0.4s ease, border-color 0.4s ease, padding 0.4s ease;

  &:focus {
    outline: none;
    border-color: #ddd;
  }
  &:hover {
    background: #fafafa;
    color: #000;
  }

  ${props =>
    props.isLoading &&
    `height: 24px;
  width: 24px;
  padding: 0;

  border-width: 2px;
  border-radius: 17px;
  border-color: #eee #eee #eee #999;
  background: black !important;

  font-size: 0;
  pointer-events: none;

  animation: spin 1.2s infinite linear;`}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const ButtonWrapper = styled.div`
  margin: 20px auto;
  text-align: center;
`

const App = () => {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [maxPages, setMaxPages] = useState(null)
  const isPagesEnded = page === maxPages

  useEffect(() => {
    setLoading(true)
    fetchImages({ page }).then(({ i, maxPages }) => {
      unstable_batchedUpdates(() => {
        setMaxPages(maxPages)
        setLoading(false)
        setImages(res => [...res, ...i])
      })
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    })
  }, [page])

  return (
    <>
      <Global />
      <Gallery
        page={page}
        setPage={setPage}
        setImages={setImages}
        images={images}
      />
      {images.length > 0 && (
        <ButtonWrapper>
          <StyledButton
            isLoading={isLoading}
            onClick={() => {
              setPage(page => page + 1)
            }}
            disabled={isLoading || isPagesEnded}
          >
            {isPagesEnded ? 'Nothing to load' : 'Load More'}
          </StyledButton>
        </ButtonWrapper>
      )}
      <Form />
    </>
  )
}

export default App
