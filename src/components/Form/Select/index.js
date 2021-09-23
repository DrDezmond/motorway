import React, { useState } from 'react'
import { useSelector } from '../../../api/useSelector'

export const Select = () => {
  const { label, error, onChange, value } = useSelector({
    onChange: e => console.log(e),
    required: true,
    label: 'Choose the color',
  })
  return (
    <>
      <select
        onChange={e => {
          onChange(e)
        }}
        name="colors"
        id="colors"
        value={value}
        defaultValue={value || 'default'}
      >
        <option disabled="disabled" hidden="hidden" value="default">
          {label}
        </option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="violet">Violet</option>
      </select>
      <p style={{ color: 'red' }}>{error}</p>
    </>
  )
}
