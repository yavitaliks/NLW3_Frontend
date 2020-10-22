import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';


import {mapIcon} from '../utils'
import api from '../services/api'
import mapMarkerImg from '../images/map_marker.svg';

import '../styles/pages/orphanate-map.css';
import Orphanage from './Orphanage';

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
}

function OrphanatMap(){

    
    const [orfanatos, setOrfanatos] = useState<Orphanage[]>([]);

    console.log("ARAY Orp", orfanatos);
    
   
    

    useEffect(() => {
        api.get('/orphanats').then(response => {
            setOrfanatos(response.data);
        });
    }, []);

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
                    center={[0.0945352,-51.0801811]}
                    zoom={13}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                    
                    {orfanatos.map(orphanage => {
                        return(
                        <Marker 
                        key={orphanage.id}
                        position={[orphanage.latitude,orphanage.longitude]}
                        icon={mapIcon} 
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={26} color="#fff"/>
                                </Link>
                            </Popup>
                        </Marker>)
                    })}
                </Map>
               
            
            <Link to='/orphanages/create' className="create-orphanat">
                <FiPlus size={32} color="#FFFFFF" />
            </Link>
        </div>
    );
}

export default OrphanatMap;