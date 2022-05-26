import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";


const theme = createTheme();

const LoginForm = (props) => {
        const LOGIN_URL= "http://localhost:8080/user/login";
        const [credentials, setCredentials] = React.useState({
            username: '',
            password: ''
        });
        const [wrongCredentials, setWrongCredentials] = useState(false);

        const [value, setValue] = useState({
            showPassword: false,
        });

        const usernameChangeHandler = event => {
            setCredentials({
                username: event.target.value, password: credentials.password
            })
        }

        const handleChange = (prop) => (event) => {
            setValue({...value, [prop]: event.target.value});
            setCredentials({
                username: credentials.username, password: event.target.value
            })

        };

        const handleClickShowPassword = () => {
            setValue({
                ...value,
                showPassword: !value.showPassword,
            });
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        const handleChangeToSignIn = (event) => {
            event.preventDefault();
            props.setOpenLoginModal(false);
            props.setOpenModal(true);
        };
        
        const navigate = useNavigate();

        const handleSubmit = (event) => {
                event.preventDefault();
                fetch(LOGIN_URL,
                    {
                        method: "POST",
                        headers: {
                            'Content-type': "application/json"
                        },
                        body: JSON.stringify(credentials)
                    }
                ).then((response) => {
                    if (response.status === 404) {
                        setWrongCredentials(true);
                        setCredentials({
                            username: '', password: ''
                        })
                    } else {
                        setWrongCredentials(false);
                        return response.json();
                    }
                }).then(response => {
                        localStorage.setItem("role", response.role);
                        localStorage.setItem("username", response.username);
                        localStorage.setItem("userId", response.id);
                        navigate("/attractions");
                        window.location.reload();
                    }
                ).catch(() => {
                    console.log('Error')
                });
            }
        ;
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Paper elevation={2}>
                        <Container
                            component="main"
                            maxWidth="xs"
                            style={{paddingBottom: "16px"}}
                        >
                            <CssBaseline/>
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Login
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={handleSubmit}
                                    sx={{mt: 3}}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                value={credentials.username}
                                                onChange={usernameChangeHandler}
                                            />
                                        </Grid>
                                        <FormControl sx={{marginTop: "20px", marginLeft: "18px", width: "400px"}}
                                                     variant="outlined">
                                            <InputLabel>Password</InputLabel>
                                            <OutlinedInput
                                                type={value.showPassword ? 'text' : 'password'}
                                                value={credentials.password}
                                                onChange={handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {value.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </Grid>
                                    {wrongCredentials &&
                                    <p style={{color: "red", fontWeight: "bold"}}>
                                        Username or password is incorrect!
                                    </p>}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 1, mb: 2}}
                                        onClick={handleSubmit}
                                    >
                                        Login
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="#" variant="body2" onClick={handleChangeToSignIn}>
                                                Have not account yet? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </Paper>
                </ThemeProvider>
            </>
        );
    }
;

export default LoginForm;
