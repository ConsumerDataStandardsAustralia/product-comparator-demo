import React from 'react'
import _ from 'lodash';

const TreeView = ({
  data,
  toggled = false,
  name = null,
  isLast = true,
  isChildElement = false,
  isParentToggled = true
}) => {
  const [isToggled, setIsToggled] = React.useState(toggled)
  const isDataArray = data && Array.isArray(data)
  const plainText = !data || (!isDataArray && (data instanceof Error || typeof data !== 'object'))

  return (
    <div
      className={`tree-element${isParentToggled ? '' : ' collapsed'} ${
        isChildElement || isToggled ? 'child' : 'parent'
      }`}
    >
      {!_.isEmpty(data) && <>
        <span
          className={`tree-toggler${isToggled ? ' open' : ''}${plainText ? ' collapsed' : ''}`}
          onClick={() => setIsToggled(!isToggled)}/>
        <>&nbsp;&nbsp;</>
      </>}
      {name && <strong>{name}: </strong>}
      {plainText ? (data ? data + '' : (data === null ? 'null' : data)) :
      <>
        {isDataArray ? '[' : '{'}
        {!isToggled && !_.isEmpty(data) && '...'}
        {Object.keys(data).map((v, i, a) => {
          return typeof data[v] === 'object' ? (
            <TreeView
              key={`${name}-${v}-${i}`}
              data={data[v]}
              isLast={i === a.length - 1}
              name={isDataArray ? null : v}
              isChildElement
              isParentToggled={isParentToggled && isToggled}
            />
          ) : (
            <p
              key={`${name}-${v}-${i}`}
              className={`tree-element${isToggled ? '' : ' collapsed'}`}
            >
              {isDataArray ? '' : <strong>{v}: </strong>}
              <Print val={data[v]}/>
              {i === a.length - 1 ? '' : ','}
            </p>
          )
        })}
        {isDataArray ? ']' : '}'}
      </>
      }
      {!isLast ? ',' : ''}
    </div>
  )
}

const Print = ({ val }) => {
  const framing = typeof val === 'string' ? '"' : ''
  return framing + val + framing
}

export default TreeView