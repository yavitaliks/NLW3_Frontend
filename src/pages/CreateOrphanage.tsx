import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import {mapIcon} from '../utils'
//import api from '../services/api';
import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';

import '../styles/pages/create-orphanage.css';
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({latit: 0, longit: 0})
  const [data, setData] = useState({
    name: "",
    latitude: position.latit,
    longitude: position.longit,
    about: "",
    instructions: "",
    opening_hours: "",
    open_day_weekends: true,
  })
  const [images, setImages] = useState<File[]>([]);
  const [previuImages, setPreviuImagem] = useState<string[]>([])

  function handelMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;
    setPosition({latit: lat, longit: lng})
    console.log(position);
  }

  function handelSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image)
    });

    setPreviuImagem(selectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {latit, longit} = position

    setData({...data, latitude: position.latit, longitude: position.longit})

    const dataPost = new FormData();
    dataPost.append('name', data.name);
    dataPost.append('about', data.name);
    dataPost.append('latitude', String(latit));
    dataPost.append('longitude', String(longit));
    dataPost.append('instructions', data.instructions);
    dataPost.append('open_day_weekends', String(data.open_day_weekends));
    dataPost.append('opening_hours', data.opening_hours);

    images.forEach(image =>{
      dataPost.append('images', image);
    })

    await api.post('/orphanats', dataPost)
    alert('cadastro realizado com sucesso')

    history.push('/orphanat')
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[0.0945352,-51.0801811]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handelMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latit && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.latit,
                     position.longit]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={data.name} onChange={text => setData({...data, name: text.target.value})} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={data.about} onChange={text => setData({...data, about: text.target.value})} />
            </div>

            <div className="input-block">
            <label htmlFor="images">Fotos</label>
              <div className="images-container" >
              {previuImages.map(img => {
                return(
                  <img key={img} src={img} alt={data.name} />
              )
              })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handelSelectImages} type="file" id="image[]"/>
             
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={data.instructions} onChange={text => setData({...data, instructions: text.target.value})} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horarios</label>
              <input id="opening_hours" value={data.opening_hours} onChange={text => setData({...data, opening_hours: text.target.value})} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={data.open_day_weekends ? "active" : ""}
                onClick={() => setData({...data, open_day_weekends: true})}
                >
                  Sim
                  </button>

                <button 
                type="button"
                className={!data.open_day_weekends ? "active" : ""}
                onClick={() => setData({...data, open_day_weekends: false})}>
                  Não
                  </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
