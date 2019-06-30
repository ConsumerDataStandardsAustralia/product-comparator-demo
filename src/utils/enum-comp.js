const ecomp = (a, b) => {
  if (b === 'OTHER') return -1
  if (a === 'OTHER') return 1
  if (a < b) return -1
  if (a === b) return 0
  return 1
}

export default ecomp
