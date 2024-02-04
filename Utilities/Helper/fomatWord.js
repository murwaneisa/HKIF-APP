export function convertToNormalWord(str) {
  return (
    str
      // Split the string into an array of words
      .toLowerCase()
      .split('_')
      // Capitalize the first letter of each word
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      // Join the words back into a string
      .join(' ')
  )
}
export const formatDate = dateString => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
