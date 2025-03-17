import React, { useState } from 'react'
import { MapView, ParametersBox } from '../../Components'

const MapViewPage = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);
  return (
    <div className='flex flex-col md:flex-row gap-6'>
      <MapView onMarkerClick={setSelectedMarker} />
      <ParametersBox data={selectedMarker} />
    </div>
  )
}

export default MapViewPage
