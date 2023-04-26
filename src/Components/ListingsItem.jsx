import React from 'react'

const ListingsItem = ({id, listing}) => {
  return (
    <div>
        <div>{listing.name}</div>
    </div>
  )
}

export default ListingsItem