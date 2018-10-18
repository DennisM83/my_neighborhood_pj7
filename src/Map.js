import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


/*From Tom Chen @ https://tomchentw.github.io/react-google-maps/ */
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap 
            defaultZoom = { 10 }
            defaultCenter = {
            {   lat: 28.688239, lng: -81.399993 }}
        >
        { /*written by Forrest Walker - https://www.youtube.com/watch?v=cJ3sAG2Ybq4&index=4&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP */}
        {props.markers && props.markers.filter(marker => marker.isVisible).map((marker, index) => {
            /* compares the ids between the venue and the current marker */
            let venueInfo =  props.venues.find(venue => venue.id === marker.id)
            /* renders markers dynamically */
           return <Marker key={index} position = {{ lat: marker.lat, lng: marker.lng }} defaultAnimation={window.google.maps.Animation.DROP} onClick={() => props.markerClick(marker)}>
                {marker.isOpen && (
                    /* the info window to display the name of the establishment and the address */
                <InfoWindow>
                    <div>
                        <p>{venueInfo.name}</p>
                        <p>{venueInfo.location.address}</p>
                    </div>
                </InfoWindow>)}
            </Marker>
        })
        }
        </GoogleMap>
))

/* error handler for the map in case of failure*/
window.gm_authFailure = () => {
    alert('Oops! looks like something went wrong loading the map')
};

class Map extends Component {
    render() {
        return(
            <MyMapComponent
            /* spread operator for the array props */
                {...this.props}
                isMarkerShown
            /* the url to render GOOGLE MAPS */
                googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAbs0suPVRKY8V7nXTVVjoWeVZYJjxqQNU"
                loadingElement = { <div style = {{ height: `100%` }}/>}
                containerElement = { <div style = {{ height: `400px` }}/>}
            /* sets the relative total height of the window */
                mapElement = {<div style = {{ height: `100vh` }}/>}
                role="application" 
            />
        )
    }
}

export default Map;