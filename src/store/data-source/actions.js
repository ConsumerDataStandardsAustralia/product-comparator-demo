export const LOAD_DATA_SOURCE = 'LOAD_DATA_SOURCE'
export const ADD_DATA_SOURCE = 'ADD_DATA_SOURCE'
export const SYNC_DATA_SOURCES = 'SYNC_DATA_SOURCES'
export const SAVE_DATA_SOURCE = 'SAVE_DATA_SOURCE'
export const DELETE_DATA_SOURCE = 'DELETE_DATA_SOURCE'
export const MODIFY_DATA_SOURCE_NAME = 'MODIFY_DATA_SOURCE_NAME'
export const MODIFY_DATA_SOURCE_URL = 'MODIFY_DATA_SOURCE_URL'
export const MODIFY_DATA_SOURCE_ENERGY_PRD_URL = 'MODIFY_DATA_SOURCE_ENERGY_PRD_URL'
export const MODIFY_DATA_SOURCE_ICON = 'MODIFY_DATA_SOURCE_ICON'
export const ENABLE_DATA_SOURCE = 'ENABLE_DATA_SOURCE'

const MAJOR_NAMES = {'ANZ': [], 'CommBank': ['CBA', 'Commonwealth Bank'], 'NATIONAL AUSTRALIA BANK': ['NAB', 'National'], 'Westpac': []}
const MAJORS = Object.keys(MAJOR_NAMES)

function mergeDatasources(into, from) {
  const result = {};
  into.forEach(ds => result[ds.name] = ds)
  from.forEach(ds => {
    const name = ds.name
    if (MAJORS.includes(name)) {
      // Consolidate the aliases of the Big Four
      MAJOR_NAMES[name].forEach(alias => {
        result[name] = {...result[alias], ...result[name]}
        delete result[alias]
      })
    }
    result[name] = {...result[name], ...ds}
  })
  return Object.values(result)
}

function fetchDatasources() {
  const dssPromise = fetch('https://api.cdr.gov.au/cdr-register/v1/all/data-holders/brands/summary', {headers: {"x-v": 1}})
    .then(response => response.json())
    .then(dss => dss.data.map(({brandName: name, publicBaseUri: url, logoUri: icon, industries: sectors}) => ({name, url, icon, sectors})))
  const ovsPromise = fetch(process.env.PUBLIC_URL + '/override.json')
    .then(response => response.json())
  return Promise.all([dssPromise, ovsPromise]).then(([datasources, overrides]) =>
    mergeDatasources(datasources, overrides)
  )
}

function loadLocalDatasources() {
  const ds = window.localStorage.getItem("cds-banking-prd-ds")
  return ds ? JSON.parse(ds) : false
}

export function loadDataSource() {
  const ds = loadLocalDatasources()
  return {
    type: LOAD_DATA_SOURCE,
    payload: ds ? Promise.resolve(ds) : fetchDatasources()
      .then(datasources => {
        for (let i = 0; i < 4 && i < datasources.length; i++) {
          datasources[i].enabled = true
        }
        return datasources
      })
  }
}

export function addDataSource() {
  return {
    type: ADD_DATA_SOURCE
  }
}

export function syncDataSources() {
  function saparateMajors(localDatasources, majorDatasources, minorDatasources) {
    localDatasources.forEach(ds => {
      if (majorDatasources.length < MAJORS.length && MAJORS.includes(ds.name)) {
        majorDatasources.push(ds)
      } else {
        minorDatasources.push(ds)
      }
    })
  }

  const nameSort = (a, b) => a.name < b.name ? -1 : 1

  return {
    type: SYNC_DATA_SOURCES,
    payload: fetchDatasources().then(datasources => {
      const localDatasources = loadLocalDatasources()
      if (localDatasources) {
        const merged = mergeDatasources(localDatasources, datasources)
        const majorDatasources = [], minorDatasources = []
        saparateMajors(merged, majorDatasources, minorDatasources)
        return [...majorDatasources.sort(nameSort), ...minorDatasources.sort(nameSort)]
      }
      return datasources
    })
  }
}

export function saveDataSource(index, payload) {
  return {
    type: SAVE_DATA_SOURCE,
    index: index,
    payload: payload
  }
}

export function deleteDataSource(index) {
  return {
    type: DELETE_DATA_SOURCE,
    index: index
  }
}

export function modifyDataSourceName(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_NAME,
    index: index,
    payload: payload
  }
}

export function modifyDataSourceUrl(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_URL,
    index: index,
    payload: payload
  }
}

export function modifyDataSourceEnergyPrdUrl(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_ENERGY_PRD_URL,
    index: index,
    payload: payload
  }
}

export function modifyDataSourceIcon(index, payload) {
  return {
    type: MODIFY_DATA_SOURCE_ICON,
    index: index,
    payload: payload
  }
}

export function enableDataSource(index, payload) {
  return {
    type: ENABLE_DATA_SOURCE,
    index: index,
    payload: payload
  }
}
