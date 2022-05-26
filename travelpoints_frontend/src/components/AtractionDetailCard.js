import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './AttractionDetailCard.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EuroIcon from '@mui/icons-material/Euro';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Rating from "@mui/material/Rating";
import getAxiosInstance from "../services/axiosInstance";
import {useParams} from "react-router-dom";

const style = {
  margin: "0 auto",
  width: "42%",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px #000",
  boxShadow: 24,
  p: 4,
};

const AttractionDetailCard = (props) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    loadReviewsForAttractionId(id);
  }, []);

  const loadReviewsForAttractionId = (attractionId) => {
    getAxiosInstance().get(`review/attraction/${attractionId}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  };

  const handleOnMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = () => {
    var userId = localStorage.getItem("userId");

    const data = {
      "message": message,
      "rating": rating,
      "attraction": {
        "id": id
      },
      "user": {
        "id": userId
      }
    };

    getAxiosInstance().post('review', data)
        .then(() => {
          setRating(0);
          setMessage("");
          loadReviewsForAttractionId(id);
        })
        .catch(error => {
          console.log(error);
        });
  };

  return (
  <>
    <Card
      sx={{ maxWidth: 700, backgroundColor: 'black', color: 'white' }}
      className="detailCard"
    >
      <CardMedia
        component="img"
        alt="no image found"
        height="300"
        image={props.photoUrl}
      />
      <CardContent>
        <section className="detailCardRowBetween">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: 'white' }}
          >
            {props.name}
          </Typography>
          <Button onClick={() => props.speech(props.description)}>
            <VolumeUpIcon sx={{ color: 'white' }} />
          </Button>
        </section>
        <br/>
        <section className="detailCardRowBetween">
          <section className="detailCardRowBetween">
            <LocationOnIcon />
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ color: 'white' }}
            >
              {props.location}
            </Typography>
          </section>
          <section className="detailCardRowBetween">
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ color: 'white' }}
            >
              From {props.price}
            </Typography>
            <EuroIcon />
          </section>
        </section>
        <br/>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ color: 'white' }}
        >
          {props.description}
        </Typography>
      </CardContent>

      <CardActions className="detailCardBack">
        <Button size="small" onClick={props.back} style={{ color: 'white' }}>
          Back
        </Button>
      </CardActions>
    </Card>
  <Box sx={style}>
    <Typography component="legend">Give rating</Typography>
    <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
    />
    <TextField
        id="outlined-multiline-flexible"
        label="Add your comment"
        multiline
        value={message}
        onChange={handleOnMessageChange}
        maxRows={4}
        style={{display:"flex"}}
    />
    <Button variant="contained"  style={{"marginLeft": "82%" , "marginTop":"5px", "marginBottom":"5px" }} endIcon={<SendIcon />} onClick={handleOnSubmit}>Submit</Button>

    {reviews.map((review) => <TextField
        key={"review-" + review.id}
        id={"outlined-multiline-flexible"}
        label=""
        value={review.message}
        multiline
        disabled={true}
        maxRows={4}
        style={{display:"flex", margin: "2px"}}
    />)}

  </Box>
  </>
  );
};

export default AttractionDetailCard;
