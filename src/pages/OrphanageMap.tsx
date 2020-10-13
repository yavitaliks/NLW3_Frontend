import React from 'react';
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi'
import {Map, TileLayer} from 'react-leaflet';

import '../styles/pages/orphanate-map.css';
import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map_marker.svg';

function OrphanatMap(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>    
                    <p>Muitas crianças estão esperando a sua visita :)</p>                
                </header>
                <footer>
                    <strong>Amapa</strong>
                    <span>Macapa</span>
                </footer>
            </aside>
            
                <Map 
                    center={[0.0945352,-51.1271811]}
                    zoom={14}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                </Map>
            
            <Link to='' className="create-orphanat">
                <FiPlus size={32} color="#FFFFFF" />
            </Link>
        </div>
    );
}

export default OrphanatMap;