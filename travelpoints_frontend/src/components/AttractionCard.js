import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AttractionCard.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EuroIcon from '@mui/icons-material/Euro';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import DateTimePicker from 'react-datetime-picker';
const AttractionCard = ({
  id,
  name,
  description,
  location,
  price,
  photoUrl,
  rating,
  speech,
  del,
  up,
  insertVisited,
    wish,
    userId,
    delWish,
    isWishlist,




}) => {
  const [updateName, setUpdateName] = useState(name);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [updateLocation, setUpdateLocation] = useState(location);
  const [updatePrice, setUpdatePrice] = useState(price);
  const [updateIsWish, setUpdateIsWish] = useState(isWishlist);
  const [iconColor,setIconColor] = useState("white");
  const [isWishColor, setIsWishColor] = useState(false);
  const readonly = (!(localStorage.getItem("role") === "0" && localStorage.getItem("username") !== null)); //variabila asta o schimbam in functie de rolul utilizatorului true pentru admin/ false pentru user
  const [date, setDate] = useState(new Date());
  let user = (localStorage.getItem("role")=== "1") ? true : false;

  function onClickEvent1(){
    setIsWishColor(true) ;
    setIconColor("red");
    setUpdateIsWish(true);
  }

  function onClickEvent2(){
    setIsWishColor(false) ;
    setIconColor("white");
    setUpdateIsWish(false);
  }

  useEffect(() => {
    up(
      id,
      updateName,
      updateDescription,
      updateLocation,
      updatePrice,
      photoUrl,
        updateIsWish,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateName, updateDescription, updateLocation, updatePrice, updateIsWish]);

  useEffect(() => {
    if (date !== null) {
      let newDate = `${date.toISOString().substring(0, 23)}-03:00`;
      // console.log(newDate);
      insertVisited(newDate, id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <>
      <Card
        style={{
          maxwidth: '50rem',
          maxHeight: '15rem',
          backgroundColor: '#3e423f',
          color: 'white',
        }}
        className="AttractionCardRow CardSet"
      >
        <Link to={`/attraction/${id}`}>
          <CardMedia
            style={{
              width: '18rem',
              height: '15rem',
            }}
            component="img"
            alt="no image found"
            image={photoUrl}
          />
        </Link>

        <CardContent
          style={{
            width: '18rem',
            height: '15rem',
          }}
          className="AttractionCardColumn"
        >
          <EditText
            readonly={readonly}
            defaultValue={updateName}
            onChange={(e) => e.value}
            onSave={(e) => setUpdateName(e.value)}
          />
          <Link to={`/attraction/${id}`} style={{ color: 'yellow' }}>
            <section className="AttractionCardRow ">
              {[...Array(rating)].map((e, i) => (
                <StarRateIcon key={i} />
              ))}
              add review
            </section>
          </Link>
          <section className="AttractionCardRow">
            <LocationOnIcon />
            <EditText
              readonly={readonly}
              defaultValue={updateLocation}
              onChange={(e) => e.value}
              onSave={(e) => setUpdateLocation(e.value)}
            />
          </section>
          <EditTextarea
            readonly={readonly}
            defaultValue={updateDescription}
            onChange={(e) => e.value}
            onSave={(e) => setUpdateDescription(e.value)}
          />
        </CardContent>

        <CardActions
          style={{
            width: '10rem',
            height: '15rem',
          }}
          className="AttractionCardColumnSpaced"
        >
          <Button onClick={() => speech(description)}>
            <VolumeUpIcon sx={{ color: 'white' }} />
          </Button>
          <section>
            <Typography gutterBottom variant="h6" component="div">
              from...
            </Typography>
            <section className="AttractionCardRow ">
              <EuroIcon sx={{ fontSize: 28 }} />
              <EditText
                readonly={readonly}
                type = "number"
                defaultValue={updatePrice.toString(10)}
                onChange={(e) => e.value}
                onSave={(e) => setUpdatePrice(e.value)}
              />
            </section>
          </section>

          {!readonly && (
            <Button onClick={() => del(id)}>
              <DeleteIcon sx={{ color: 'white' }} />
            </Button>
          )}
          {user && !isWishColor &&(
              <Button onClick={() => wish(id, userId) }  >
                <FavoriteIcon sx={{ color:  isWishlist === true ? "red" : "white" }}  onClick={()=> onClickEvent1()} />
              </Button>
          )}
          {user && isWishColor &&(
              <Button onClick={() => delWish(id, userId) }  >
                <FavoriteIcon sx={{ color: iconColor }}  onClick={()=>onClickEvent2()}/>
              </Button>
          )}

        </CardActions>
      </Card>
      <br/>
      <DateTimePicker onChange={setDate} value={date} />
    </>
  );
};

AttractionCard.prototype = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default AttractionCard;
