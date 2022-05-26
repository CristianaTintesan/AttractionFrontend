import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextField} from "@mui/material";
import {useState} from "react";
import {addAttraction} from "../services/attractionsService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',

};

const TransitionsModal = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let nameComplete = true;
    let locationComplete = true;
    let descriptionComplete = true;
    let photoUrlComplete = true;

    const nameChangeHandler = event => {
        setName(event.target.value)
    }

    const descriptionChangeHandler = event => {
        setDescription(event.target.value)
    }

    const locationChangeHandler = event => {
        setLocation(event.target.value)
    }

    const priceChangeHandler = event => {
        setPrice(event.target.value)
    }

    const photoUrlChangeHandler = event => {
        setPhotoUrl(event.target.value)
    }

    const formIsValid = () => {
        return (name.length === 0) || (description.length === 0) || (location.length === 0) || (photoUrl.length === 0);

    };

    const handleAdd = async (
    ) => {
        setOpen(false)
        await addAttraction(
            name,
            description,
            location,
            price,
            photoUrl,
            false
        );
        window.location.reload();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} style={{"marginLeft": "46%" , "marginTop":"20px" }}>Add attraction</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography style = {{marginTop: '-20px', marginBottom: '30px'}} id="transition-modal-title" variant="h6" component="h2">
                            Add Attraction
                        </Typography>
                        <TextField style = {{marginBottom: '10px'}}  id="outlined-basic" label="Name" variant="outlined"  required={true} inputProps={{maxLength: 35}} onChange={nameChangeHandler}  helperText={ name.length>3 ? nameComplete=false : "3 characters are required" } error={nameComplete} />
                        <TextField style = {{marginBottom: '10px'}} id="outlined-basic" label="Description" variant="outlined" required={true} inputProps={{maxLength: 255}} onChange={descriptionChangeHandler}  helperText={ description.length>3 ? descriptionComplete=false : "3 characters are required"} error={descriptionComplete}/>
                        <TextField style = {{marginBottom: '10px'}} id="outlined-basic" label="Location" variant="outlined" required={true} inputProps={{maxLength: 40}} onChange={locationChangeHandler} helperText={ location.length>3 ? locationComplete=false : "3 characters are required"} error={locationComplete}/>
                        <TextField style = {{marginBottom: '10px'}} id="outlined-basic" label="Price" variant="outlined"  required={true} type="number" onChange={priceChangeHandler} />
                        <TextField style = {{marginBottom: '10px'}} id="outlined-basic" label="PhotoURL" variant="outlined" required={true} inputProps={{maxLength: 255}} onChange={photoUrlChangeHandler} helperText={ photoUrl.length>3 ? photoUrlComplete=false : "3 characters are required"} error={photoUrlComplete}/>
                        <br/>
                        <Button variant="contained" onClick={handleAdd} disabled={formIsValid()}>Save</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default TransitionsModal;