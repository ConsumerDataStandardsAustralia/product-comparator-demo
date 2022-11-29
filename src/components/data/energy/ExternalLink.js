import React from 'react'

const ExternalLink = ({link, children}) => (
  <a href={link} target='_blank' rel='noopener noreferrer'>{children}</a>
)

export default ExternalLink
