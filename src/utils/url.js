const localhostDomainRE = /^https?:\/\/localhost[:?\d]*(?:[^:?\d]\S*)?$/
const nonLocalhostDomainRE = /^https?:\/\/[^\s.]+\.\S{2,}$/

export default function isUrl(s) {
  if (typeof s !== 'string') {
    return false;
  }

  const lowerCase = s.toLowerCase()

  return localhostDomainRE.test(lowerCase) ||
    nonLocalhostDomainRE.test(lowerCase);
}

function getLocation(url) {
  var l = document.createElement("a")
  l.href = url
  return l
}

export function normalise(url) {
  if (url.endsWith('/')) url = url.substr(0, url.length - 1)
  if (!url.endsWith('/cds-au/v1') && getLocation(url).hostname !== 'localhost') {
    url += '/cds-au/v1'
  }
  return url
}
