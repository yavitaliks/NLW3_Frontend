import React, {useEffect, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {mapIcon} from '../utils'
import { useParams } from 'react-router-dom'

import api from '../services/api'
import Sidebar from '../components/Sidebar';

import '../styles/pages/orphanage.css';

interface Orphanage {
  latitude: number,
  longitude: number,
  name: string, 
  about: string,
  instructions: string,
  opening_hours: string,
  open_day_weekends: boolean,
  images: Array<{
    patch: string,
    url:string,
    id: number,
  }>,
}

interface OrphanateParams{
  id: string
}

export default function Orphanage() {

  const params = useParams<OrphanateParams>();
  const [orfanat, setOrfanat] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrfanat(response.data);
        });
    }, [params.id]);

  if(!orfanat){
    return <p>Carregando........</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar/>
      <main>
        <div className="orphanage-details">
          <img src={orfanat.images[activeImageIndex].url} alt={orfanat.name} />

          <div className="images">
            {orfanat.images.map((imagens, index) => {
              return(
              <button 
              className={activeImageIndex === index ? 'active' : ''} 
              type="button" 
              key={imagens.id} 
              onClick={() => {setActiveImageIndex(index)}}>
                
                <img src={imagens.url} alt={orfanat.name} />
              </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orfanat.name}</h1>
            <p>{orfanat.about}</p>

            <div className="map-container">
              <Map 
                center={[orfanat.latitude, orfanat.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orfanat.latitude, orfanat.longitude]} />
              </Map>

              <footer>
                <a target="_blanc" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanat.latitude},${orfanat.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanat.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orfanat.opening_hours}
              </div>
              {orfanat.open_day_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) :
              (
                <div className="open-on-weekends dont-open" >
                <FiInfo size={32} color="#ff669e" />
                Não atendemos <br />
                fim de semana
              </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}