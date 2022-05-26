import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import {sendContactUsEmail} from "../services/mailService";
import {Alert,Button} from "@mui/material";

function ContactUs() {
    const [emailDetails, setEmailDetails] = useState({
        name: '',
        email: localStorage.getItem("username"),
        subject: '',
        message: ''
    });
    const [alert, setAlert] = useState(false);

    const nameChangeHandler = event => {
        setEmailDetails({
            name: event.target.value, subject: emailDetails.subject, email:emailDetails.email,
            message: emailDetails.message
        })
    }

    const subjectChangeHandler = event => {
        setEmailDetails({
            name: emailDetails.name, subject: event.target.value,  email:emailDetails.email,
            message: emailDetails.message
        })
    }

    const messageChangeHandler = event => {
        setEmailDetails({
            name: emailDetails.name, subject: emailDetails.subject,  email:emailDetails.email,
            message: event.target.value
        })
    }
    const sendEmail = async () => {
        await sendContactUsEmail(
            emailDetails.name,
            emailDetails.email,
            emailDetails.subject,
            emailDetails.message,
        );
        setAlert(true);
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                <Paper style={{
                    marginTop: "70px", marginLeft: "30%",
                    width: "700px",
                    height: "600px",
                }} elevation={3}>
                    <h1 style={{marginTop: "20px", marginLeft: "10%"}}>Contact Us</h1>
                    <TextField
                        required
                        style={{
                            marginTop: "5%",
                            marginLeft: "10%",
                            width: "250px"
                        }}
                        id="outlined-required"
                        label="Name"
                        value={emailDetails.name}
                        onChange={nameChangeHandler}
                    />
                    <TextField
                        disabled={true}
                        style={{
                            marginTop: "5%",
                            marginLeft: "8%",
                            width: "260px"
                        }}
                        id="outlined-required"
                        label="Email"
                        value={localStorage.getItem("username")}
                    />
                    <TextField
                        required
                        style={{
                            marginLeft: "10%",
                            marginTop: "3%",
                            width: "570px"
                        }}
                        id="outlined-required"
                        label="Subject"
                        value={emailDetails.subject}
                        onChange={subjectChangeHandler}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={6}
                        style={{
                            marginLeft: "10%",
                            marginTop: "3%",
                            width: "570px"
                        }}
                        value={emailDetails.message}
                        onChange={messageChangeHandler}
                    />
                    <Button
                        style={{
                            marginLeft: "10%",
                            marginTop: "3%",
                            backgroundColor: "black",
                            color: "white",
                            width: "100px"
                        }}
                        onClick={sendEmail}
                    >Send</Button>
                    {alert && <Alert style={{marginTop: "7.5%"}} variant="filled"
                                     onClose={() => {
                                         setAlert(false)
                                     }}>
                        The email has been sent succesfully!</Alert>}
                </Paper>
            </Box>
        </div>
    );
}

export default ContactUs;