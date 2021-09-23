import React from 'react'
import { Select } from './Select'

export const Form = () => {
  function submit(e) {
    e.preventDefault()
    console.log(e.target)
    return false
  }
  return (
    <form onSubmit={submit} style={{ color: '#fff' }}>
      {' '}
      <label for="name">First name:</label>
      <br />
      <input required type="text" id="name" name="name" />
      <br />
      <label for="email">Email:</label>
      <br />
      <input required type="email" id="email" name="email" />
      <br />
      <br />
      <label for="start"> Date of birth :</label>
      <br />
      <input
        required
        type="date"
        id="birth"
        name="birth"
        min="1990-01-01"
        max={new Date().toISOString().split('T')[0]}
      ></input>
      <br />
      <br />
      <Select />
      <br />
      <br />
      <label for="volume">Salary</label>
      <br />
      <div>
        0
        <input
          required
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="10000"
        />
        10000
      </div>
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}
