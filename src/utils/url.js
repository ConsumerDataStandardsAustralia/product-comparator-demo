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

export function normalise(url) {
  if (url.endsWith('/')) return url.substr(0, url.length - 1)
  return url
}
