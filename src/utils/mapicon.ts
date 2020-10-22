import Leaflet from 'leaflet';
import mapMarkerImg from '../images/map_marker.svg'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58,68],
    iconAnchor: [25,50],
    popupAnchor: [165, 5]
})

export default mapIcon;