import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import getAddressOfCoordinates from "../actions/reverseGeocoding";
import getCoordinatesOfAddress from "../actions/forwardGeocording";
import LocationOn from "@mui/icons-material/LocationOn";
import TextField from "@mui/material/TextField";
import axios from "axios";

const MyMap = (props) => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [cityname, setCityname] = useState("");

  useEffect(async () => {
    async function fetchData () {
      if (props.location === null || props.location === undefined) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          setLocation({
            lat: lat,
            lon: lon,
          })
          setPosition({
            lat: lat,
            lon: lon,
          })
          console.log(lat);
          const res = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json? ",
            {
              params: {
                key: "103fda4edfee402fa23d1d1e4d742132",
                q: `${lat}+${lon}`,
                language: "en"
              }
            }
          )
          var town = res.data.results[0].components.town;
          var country = res.data.results[0].components.country;
          var object = {
            lat: lat,
            lon: lon
          }
          localStorage.setItem('cityinfo', JSON.stringify(object));
          setCityname(`${town} (${country})`);
        })
      }
      else {
        setLocation(props.location);
        setPosition(props.location);
        const res = await getAddressOfCoordinates(props.location.lat, props.location.lon);
        setCityname(res.data.results[0].formatted);
        localStorage.setItem('cityinfo', JSON.stringify(props.location));
      }
    }
    fetchData();
  }, []);


  const [viewport, setViewport] = useState({
    width: "100%",
    height: "300px",
    zoom: 16,
  });
  const getCityName = (event) => {
    setCityname(event.target.value);
  }
  const submitFunc = async (event) => {
    if (event.key === 'Enter') {
      const res = await getCoordinatesOfAddress(cityname);
      var newObject = {
        lat: res.data.results[0].geometry.lat,
        lon: res.data.results[0].geometry.lng
      }
      setLocation(newObject);
      setPosition(newObject);
      localStorage.setItem('cityinfo', JSON.stringify(newObject));
    }
  }
  const mapClicked = async (param) => {
    setPosition({
      lat: param.lngLat[1],
      lon: param.lngLat[0],
    });
    const res = await getAddressOfCoordinates(param.lngLat[1], param.lngLat[0]);
    localStorage.setItem(
      "cityinfo",
      JSON.stringify({ lat: param.lngLat[1], lon: param.lngLat[0] })
    );
    setCityname(res.data.results[0].formatted);
  };
  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      <div style={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
        <div style={{ width: "42px" }}>
          <LocationOn color="action" />
        </div>
        <TextField
          autoComplete="given-name"
          name="location"
          required
          fullWidth
          id="location"
          label="location"
          value={cityname}
          onChange={getCityName}
          onKeyUp={submitFunc}
        />
      </div>
      {location !== null && (
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <ReactMapGL
            {...viewport}
            latitude={location.lat}
            longitude={location.lon}
            mapboxApiAccessToken={
              "pk.eyJ1IjoidG9wdGFsZW50IiwiYSI6ImNrenBqdW9mdjYxOW0yeHBycnNzYzEybjgifQ.fh70WgDAw5DUhXUnzhU99Q"
            }
            onViewportChange={(nextViewport) => {
              setViewport(nextViewport);
              setLocation({
                lat: nextViewport.latitude,
                lon: nextViewport.longitude,
              });
            }}
            onClick={mapClicked}
            mapStyle={"mapbox://styles/mapbox/streets-v11"}
          >
            <Marker
              latitude={position.lat}
              longitude={position.lon}
              offsetLeft={-15}
              offsetTop={-20}
            >
              <Room
                style={{ fontSize: viewport.zoom * 2, color: "slateblue" }}
              />
            </Marker>
          </ReactMapGL>
        </div>
      )}
    </div>
  );
};

export default MyMap;
