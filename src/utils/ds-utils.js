export const MAJOR_NAMES = {'ANZ': [], 'CommBank': ['CBA', 'Commonwealth Bank'], 'NATIONAL AUSTRALIA BANK': ['NAB', 'National'], 'Westpac': []}
const MAJORS = Object.keys(MAJOR_NAMES)

export function sortWithMajors(datasources) {
  const nameSort = (a, b) => a.brandName < b.brandName ? -1 : 1

  const majorDatasources = [], minorDatasources = []
  datasources.forEach(ds => {
    if (majorDatasources.length < MAJORS.length && MAJORS.includes(ds.brandName)) {
      majorDatasources.push(ds)
    } else {
      minorDatasources.push(ds)
    }
  })
  return [...majorDatasources.sort(nameSort), ...minorDatasources.sort(nameSort)]
}
