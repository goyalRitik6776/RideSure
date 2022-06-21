import { useEffect, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import { UberContext } from '../context/uberContext'
import polyline from '@mapbox/polyline'
// import Polyline 
// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
const style = {
  wrapper:`flex-1 h-full w-full top-14 right-3`,

  // wrapper:``;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates,dark } = useContext(UberContext)

 console.log("MAP",dark)

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/mapbox/rail-11',
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      // style: `mapbox://styles/goyalritik/cl4mzcklq000h14l8kzg1q06c`,
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

    if(dark===true){
      map.setStyle('mapbox://styles/goyalritik/cl4mzcklq000h14l8kzg1q06c')
    }

  

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
    
    // var polyline = new L.Polyline([
    //   pickupCoordinates,dropoffCoordinates
    // ]).addTo(map);

    var or = [-122.414,37.776]
    var drop = [-77.032,38.913]
    var route = {
      'type':'FeatureCollection',
      'features': [
        {
          'type':'Feature',
          'geometry': {
            'type':'LineString',
            'coordinate':[or,drop]
          }
        }
      ]
    }
    console.log(route);
    map.on('load',function () {
      map.addSource('route',{
        'type':'geojson',
        'data':route
      }
      );
      map.addLayer({
        'id':'route',
        'source':'route',
        'type':'line',
        'paint':{
          'line-width':2,
          'line-color':'#007cbf'
        }
      })
    })
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