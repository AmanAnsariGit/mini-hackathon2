import React from 'react'

const GalleryBox = ({wt}) => {

    const gallery_box = {
      height: '160px',
      width: `${wt}px`,
      borderRadius: '10px',
      backgroundColor: '#c29307'
    }
  return (
    <div style={gallery_box}></div>
  )
}

export default GalleryBox
