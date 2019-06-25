const localhostDomainRE = /^https?:\/\/localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
const nonLocalhostDomainRE = /^https?:\/\/[^\s\.]+\.\S{2,}$/

export default function isUrl(s) {
  if (typeof s !== 'string') {
    return false;
  }

  const lowerCase = s.toLowerCase()

  return localhostDomainRE.test(lowerCase) ||
    nonLocalhostDomainRE.test(lowerCase);
}
