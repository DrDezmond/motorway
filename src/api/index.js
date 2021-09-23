export const fetchImages = ({ limit = 10, page }) =>
  fetch(`/images?limit=${limit}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('Error:', error)
    })
