import { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlb25lYml0Y29tcGFueSIsImEiOiJja253dzlxenkwZ2RlMm9udjNsa3F0aHExIn0.ilpwibsbLDxU9XZ0oF0AaA";

const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.29011, 39.39172],
      zoom: 5,
    });

    if (props.pickupCordinates) {
      addToMap(map, props.pickupCordinates);
    }

    if (props.dropoffCordinates) {
      addToMap(map, props.dropoffCordinates);
    }

    if (props.pickupCordinates && props.dropoffCordinates) {
      map.fitBounds([props.pickupCordinates, props.dropoffCordinates], {
        padding: 60,
      });
    }
  }, [props.pickupCordinates, props.dropoffCordinates]);

  const addToMap = (map, cordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(cordinates).addTo(map);
  };

  return <Wrapper id="map"></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
    flex-1 h-1/2
`;
