import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttraction } from '../services/attractionsService';
import AttractionDetailCard from './AtractionDetailCard';

const Attraction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [attraction, setAttraction] = useState({
    id: 0,
    name: '',
    description: '',
    location: '',
    price: 0,
    photoUrl: '',
  });

  useEffect(() => {
    const handleAttraction = async (id) => {
      let data = await getAttraction(id);
      setAttraction((prev) => {
        return { ...prev, ...data };
      });
    };
    handleAttraction(id);
  }, [id]);

  const speech = (description) => {
    const msg = new SpeechSynthesisUtterance(description);
    window.speechSynthesis.speak(msg);
  };

  return (
    <>
      <AttractionDetailCard
        name={attraction.name}
        description={attraction.description}
        location={attraction.location}
        price={attraction.price}
        photoUrl={attraction.photoUrl}
        back={() => navigate(-1)}
        speech={speech}
      />
    </>
  );
};

export default Attraction;
