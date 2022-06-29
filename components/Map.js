import { useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UberContext } from "../context/uberContext";
import icon from "/assets/red-cross.png";
import ReactMapGL, { Marker } from "react-map-gl";
const style = {
  wrapper: `flex-1 h-full w-full top-14`,
  marker: `bg-[url('../assets/red-cross.png')] w-[50px] h-[50px] cursor-pointer`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates, dark, route } =
    useContext(UberContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",

      style: `mapbox://styles/${dark}`,
      center: [78.918, 26.262],
      zoom: 4.45,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      })
    );

    // if (pickupCoordinates) {
    //   addToMap(map, pickupCoordinates, "Origin");
    // }

    // if (dropoffCoordinates) {
    //   addToMap(map, dropoffCoordinates, "Destination");
    // }

    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([pickupCoordinates, dropoffCoordinates], {
        padding: 220,
        
      });
    }

  

    if (pickupCoordinates && dropoffCoordinates) {
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      map.on("load", () => {
        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        }
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          },
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            // 'line-color': '#000000',
            "line-color":
              dark === "drakosi/ckvcwq3rwdw4314o3i2ho8tph"
                ? "#000000"
                : "#ffffff",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });

            if (pickupCoordinates) {
      addToMap(map, pickupCoordinates, "Origin");
    }

  
    
        if (dropoffCoordinates) {
          addToMap(map, dropoffCoordinates, "Destination");
        }


      });
    }
  }, [pickupCoordinates, dropoffCoordinates, dark, route]);

  const addToMap = (map, coordinates, type) => {
  
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    // const marker1 = new mapboxgl.Marker()
  };
 



  return <div className={style.wrapper} id="map" />;
};

export default Map;
