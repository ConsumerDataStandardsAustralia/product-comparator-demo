import React from 'react'

const AdditionalInformationUris = ({title, uris}) => {
  <div>
    <div>{title}</div>
    <ul>{uris.map((uri, index) => 
      <li><a href={uri.additionalInfoUri} target='_blank' rel='noopener noreferrer' key={index}>uri.description</a></li>)}
    </ul>
  </div>
}

export default AdditionalInformationUris
