import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  cardArt: {
    display: 'table-row',
    '& img': {
    maxWidth: 100,
    maxHeight: 100,
    display: 'table-cell',
    verticalAlign: 'middle',
    paddingRight: 5
    },
    '& span': {
    display: 'table-cell',
    verticalAlign: 'middle'
    }
  }
}))

function CardArt(props) {
  const {cardArt} = props
  const classes = useStyles()
  return (
    <li>
      {!!cardArt.title && <div>{cardArt.title}</div>}
      <div>
        <a className={classes.cardArt} href={cardArt.imageUri} target="_blank" rel="noopener noreferrer">
          <img src={cardArt.imageUri} alt=""/>
          <span>{cardArt.imageUri}</span>
        </a>
      </div>
    </li>
  )
}

export default CardArt