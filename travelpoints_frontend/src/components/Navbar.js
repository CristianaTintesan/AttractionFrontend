import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SockJsClient from "react-stomp";

import ModalCustom from "./Modal";
import SignInForm from "../pages/SignInForm";
import LoginForm from "../pages/LoginForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";

// TODO: Change url on deploy:
const SOCKET_URL = "http://localhost:8080/ws-message";

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [openResetPasswordModal, setOpenResetPasswordModal] =
        React.useState(false);
    const [openLoginModal, setOpenLoginModal] = React.useState(false);
    const [username, setUsername] = React.useState("Default");
    const [role, setRole] = React.useState("");
    const [displayNotification, setDisplayNotificaiton] = React.useState(false);
    const [notificationAttractionId, setNotificationAttractionId] =
        React.useState("1234");

    //as an component did mount
    useEffect(() => {
        const localStoredUsername = localStorage.getItem("username");
        if (localStoredUsername !== "") {
            setUsername(localStoredUsername);
            setRole(localStorage.getItem("role"));
        } else {
            setUsername("");
            setRole("");
        }
    }, []);

    const onMessageReceived = (msg) => {
        setDisplayNotificaiton(true);
        setNotificationAttractionId(msg.message);
    };
    const handleDisplayNotificationClick = () => {
        setDisplayNotificaiton(false);
        navigate("/attraction/" + notificationAttractionId);

        console.log(displayNotification);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleLoginOpenModal = () => setOpenLoginModal(true);
    const handleLoginCloseModal = () => setOpenLoginModal(false);

    const handleOpenResetPasswordModal = () => setOpenResetPasswordModal(true);
    const handleCloseResetPasswordModal = () =>
        setOpenResetPasswordModal(false);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // logout handler
    const logoutHandler = () => {
        localStorage.setItem("role", "");
        localStorage.setItem("username", "");
        localStorage.setItem("userId", "");
        navigate("/attractions");
        window.location.reload();
    };

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#1976d2",
            },
        },
    });

    return (
        <React.Fragment>
            <ModalCustom
                openModal={openModal}
                handleCloseModal={handleCloseModal}
            >
                <SignInForm
                    setOpenLoginModal={setOpenLoginModal}
                    setOpenModal={setOpenModal}
                />
            </ModalCustom>
            <ModalCustom
                openModal={openLoginModal}
                handleCloseModal={handleLoginCloseModal}
            >
                <LoginForm
                    setOpenLoginModal={setOpenLoginModal}
                    setOpenModal={setOpenModal}
                />
            </ModalCustom>

            <ModalCustom
                openModal={openResetPasswordModal}
                handleCloseModal={handleCloseResetPasswordModal}
            >
                <ResetPasswordForm />
            </ModalCustom>

            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                noWrap
                                component="div"
                                sx={{
                                    mr: 15,
                                    display: { xs: "none", md: "flex" },
                                    fontSize: 28,
                                }}
                            >
                                TravelPoints
                            </Typography>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => navigate("/attractions")}
                                    >
                                        <Typography textAlign="center">
                                            Homepage
                                        </Typography>
                                    </MenuItem>
                                    {role === "1" && (
                                        <MenuItem
                                            onClick={() =>
                                                navigate("/wishlist")
                                            }
                                        >
                                            <Typography textAlign="center">
                                                Wishlist
                                            </Typography>
                                        </MenuItem>
                                    )}

                                    {role === "1" && (
                                        <MenuItem
                                            onClick={() =>
                                                navigate("/contact-us")
                                            }
                                        >
                                            <Typography textAlign="center">
                                                Contact Us
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    {role === "0" && (
                                        <MenuItem
                                            onClick={() => navigate("/admin")}
                                        >
                                            <Typography textAlign="center">
                                                View charts
                                            </Typography>
                                        </MenuItem>
                                    )}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                TravelPoints
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <Button
                                    onClick={() => navigate("/attractions")}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                        fontSize: 17,
                                    }}
                                >
                                    Homepage
                                </Button>

                                {role === "1" && (
                                    <React.Fragment>
                                        <Button
                                            onClick={() =>
                                                navigate("/wishlist")
                                            }
                                            sx={{
                                                my: 2,
                                                color: "white",
                                                display: "block",
                                                fontSize: 17,
                                            }}
                                        >
                                            Wishlist
                                        </Button>

                                        <SockJsClient
                                            url={SOCKET_URL}
                                            topics={["/topic/message"]}
                                            onMessage={(msg) =>
                                                onMessageReceived(msg)
                                            }
                                            debug={false}
                                        />
                                    </React.Fragment>
                                )}
                                {role === "1" && (
                                    <Button
                                        onClick={() => navigate("/contact-us")}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                            fontSize: 17,
                                        }}
                                    >
                                        Contact Us
                                    </Button>
                                )}

                                {role === "1" && displayNotification && (
                                    <Button
                                        onClick={() =>
                                            handleDisplayNotificationClick()
                                        }
                                        color="error"
                                        sx={{
                                            my: 2,
                                            display: "block",
                                            fontSize: 17,
                                        }}
                                    >
                                        New Attraction
                                    </Button>
                                )}

                                {role === "0" && (
                                    <Button
                                        onClick={() => navigate("/admin")}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                            fontSize: 17,
                                        }}
                                    >
                                        View Charts
                                    </Button>
                                )}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                {role === "0" || role === "1" ? (
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar
                                                alt={username}
                                                src="thisImgShouldNotExist.jpg"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            display: { xs: "none", md: "flex" },
                                        }}
                                    >
                                        <Button
                                            onClick={() => {
                                                handleCloseNavMenu();
                                                handleOpenModal();
                                            }}
                                            sx={{
                                                my: 2,
                                                color: "white",
                                                display: "block",
                                                fontSize: 18,
                                            }}
                                        >
                                            SingIn
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleCloseNavMenu();
                                                handleLoginOpenModal();
                                            }}
                                            sx={{
                                                my: 2,
                                                color: "white",
                                                display: "block",
                                                fontSize: 18,
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </Box>
                                )}
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            handleOpenResetPasswordModal();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Reset Password
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logoutHandler();
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </React.Fragment>
    );
};
export default ResponsiveAppBar;
