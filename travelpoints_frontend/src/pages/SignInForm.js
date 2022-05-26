import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { createUser } from "../services/userService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignInForm = (props) => {
    const [firstnameHasError, setFirstnameHasError] = React.useState(false);
    const [firstnameError, setFirstnameError] = React.useState("");

    const [lastnameHasError, setLastnameHasError] = React.useState(false);
    const [lastnameError, setLastnameError] = React.useState("");

    const [emailHasError, setEmailHasError] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");

    const [passwordHasError, setPasswordHasError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState("");

    const [openNotification, setOpenNotification] = React.useState(false);



    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNotification(false);
    };
    
    const handleChangeToLogin = (event) => {
        event.preventDefault();
        props.setOpenModal(false);
        props.setOpenLoginModal(true);
    };


    const formIsValid = (data) => {
        let hasErrors = false;
        if (data.get("firstName").trim() === "") {
            setFirstnameHasError(true);
            setFirstnameError("Firstname is required");
            hasErrors = true;
        } else {
            setFirstnameHasError(false);
            setFirstnameError("");
        }
        if (data.get("lastName").trim() === "") {
            setLastnameHasError(true);
            setLastnameError("Lastname is required");
            hasErrors = true;
        } else {
            setLastnameHasError(false);
            setLastnameError("");
        }
        if (
            !data
                .get("email")
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            setEmailHasError(true);
            setEmailError("Please insert a valid email");
            hasErrors = true;
        } else {
            setEmailHasError(false);
            setEmailError("");
        }
        if (
            data.get("password").length < 7 ||
            data.get("password").length > 20
        ) {
            setPasswordHasError(true);
            setPasswordError("Password must be between 7 and 20 characters");
            hasErrors = true;
        } else {
            setPasswordHasError(false);
            setPasswordError("");
        }
        if (hasErrors) return false;
        else return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (formIsValid(data)) {
            console.log("yea");
            const postError = await createUser(
                Math.floor(Math.random() * Date.now() / 100000), //kinda random id
                data.get("firstName"),
                data.get("lastName"),
                data.get("email"),
                data.get("password"),
                1
            );
            if (postError !== "") {
                setEmailHasError(true);
                setEmailError(postError);
            }
            else{
                setOpenNotification(true);
            }
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={2}>
                <Container
                    component="main"
                    maxWidth="xs"
                    style={{ paddingBottom: "16px" }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={firstnameHasError}
                                        helperText={firstnameError}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={lastnameHasError}
                                        helperText={lastnameError}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={emailHasError}
                                        helperText={emailError}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={passwordHasError}
                                        helperText={passwordError}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="allowExtraEmails"
                                                color="primary"
                                            />
                                        }
                                        label="This toggle does nothing, but it looks cool, wouldn't you say?"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={handleChangeToLogin}>
                                        Already have an account? Login now
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Paper>
            <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                    Account created successfully!
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};


export default SignInForm;
