import { useEffect, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import { UberContext } from '../context/uberContext'
// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
const style = {
  wrapper: `flex-1 h-full w-full top-14 right-3`,
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext)

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [78.918, 26.262],
      zoom: 4.45,
    })

    map.addControl(new mapboxgl.NavigationControl(),'top-right');
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy:true},
      trackUserLocation:true,
      showUserHeading:true,
      showAccuracyCircle:true,
    }))

  

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates)
    }

    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates)
    }

    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([pickupCoordinates, dropoffCoordinates], {
        padding: 200,
      })
    }

    // if (pickupCoordinates && dropoffCoordinates) {
    //   map.flyTo({
    //     center: [pickupCoordinates,dropoffCoordinates],})
    // }
  }, [pickupCoordinates, dropoffCoordinates])

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  return <div className={style.wrapper} id='map' />
}

export default Map