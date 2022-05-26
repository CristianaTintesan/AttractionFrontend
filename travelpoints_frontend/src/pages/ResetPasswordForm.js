import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { resetPassword } from "../services/userService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResetPasswordForm = () => {
    const [oldPasswordHasErrors, setOldPasswordHasErrors] =
        React.useState(false);
    const [oldPasswordError, setOldPasswordError] = React.useState("");

    const [newPasswordHasErrors, setNewPasswordHasErrors] =
        React.useState(false);
    const [newPasswordError, setNewPasswordError] = React.useState("");

    const [confirmPasswordHasErrors, setConfirmPasswordHasErrors] =
        React.useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

    const [openNotification, setOpenNotification] = React.useState(false);

    const handleCloseNotification = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenNotification(false);
    };

    const formIsValid = (data) => {
        let hasErrors = false;
        if (data.get("oldPassword").trim() === "") {
            setOldPasswordHasErrors(true);
            setOldPasswordError("Old password is required");
            hasErrors = true;
        } else {
            setOldPasswordHasErrors(false);
            setOldPasswordError("");
        }
        if (
            data.get("newPassword").length < 7 ||
            data.get("newPassword") > 20
        ) {
            setNewPasswordHasErrors(true);
            setNewPasswordError(
                "New password must be between 7 and 20 characters"
            );
            hasErrors = true;
        } else {
            setNewPasswordHasErrors(false);
            setNewPasswordError("");
        }
        if (data.get("confirmPassword") !== data.get("newPassword")) {
            setConfirmPasswordHasErrors(true);
            setConfirmPasswordError("Passwords must match");
            hasErrors = true;
        } else {
            setConfirmPasswordHasErrors(false);
            setConfirmPasswordError("");
        }
        if (hasErrors) return false;
        else return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (formIsValid(data)) {
            const resetSuccessfull = await resetPassword(
                localStorage.getItem("username"),
                data.get("oldPassword"),
                data.get("newPassword"),
            );
            if (resetSuccessfull) {
                setOpenNotification(true);
            }else{
                setOldPasswordHasErrors(true);
                setOldPasswordError("Password doesn't match with current one");
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
                            <LockResetIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset password:
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={oldPasswordHasErrors}
                                        helperText={oldPasswordError}
                                        autoComplete="given-name"
                                        name="oldPassword"
                                        required
                                        fullWidth
                                        id="oldPassword"
                                        type="password"
                                        label="Old Password"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={newPasswordHasErrors}
                                        helperText={newPasswordError}
                                        required
                                        fullWidth
                                        id="newPassword"
                                        type="password"
                                        label="New Password"
                                        name="newPassword"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={confirmPasswordHasErrors}
                                        helperText={confirmPasswordError}
                                        required
                                        fullWidth
                                        id="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset password
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Paper>
            <Snackbar
                open={openNotification}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Password changed successfully!
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default ResetPasswordForm;
