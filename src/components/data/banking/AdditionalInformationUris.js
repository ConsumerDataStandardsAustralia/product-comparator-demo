import React from 'react'

const AdditionalInformationUris = ({title, uris}) => (
  <div>
    <div>{title}</div>
    <ul>{uris.map((uri, index) => 
      <li key={index}><a href={uri.additionalInfoUri} target='_blank' rel='noopener noreferrer'>{uri.description}</a></li>)}
    </ul>
  </div>
)

export default AdditionalInformationUris
