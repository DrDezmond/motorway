import { useState } from 'react'

// unfinished custom validation
export const useSelector = ({ onChange, required, value, label }) => {
  const [error, setError] = useState('')

  const onChangeWithValidation = e => {
    onChange(e)
    if (required) {
      if (e.target.value === label) {
        setError('You need to choose one of the options')
      }
    }
  }

  return {
    error,
    value,
    label,
    onChange: onChangeWithValidation,
  }
}
