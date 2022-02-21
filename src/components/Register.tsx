import React, { FC, useState } from "react";
import { Typography, Dialog, DialogContent, useTheme, DialogActions, Button, TextField } from "@mui/material";
import { getUsers, postUser } from "../api/user.api";
import { User } from "../interfaces/user";
import { AlertColor } from "@mui/material/Alert";

interface Props {
    open: boolean;
    handleOnClose(): void;
    handleOpenSnackbar(severity: AlertColor, message: string): void;
    handleUpdateUserData(data: User): void;
}

const Register: FC<Props> = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const theme = useTheme();

    const handleRegister = async () => {
        try {
            await getUsers({ username: username })
                .then((response) => response.json())
                .then((response) => {
                    if (response.length > 0) {
                        throw new Error("Username already taken");
                    }
                });
            const info = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
            };
            await postUser(info as User)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("Error saving registration.");
                    }
                })
                .then((response) => {
                    props.handleUpdateUserData(response as User);
                    props.handleOpenSnackbar("success", `Registration complete. Welcome ${response.firstName}!`);
                    props.handleOnClose();
                });
        } catch (e) {
            if (e instanceof Error) props.handleOpenSnackbar("error", e.message);
        }
    };

    return (
        <Dialog onClose={props.handleOnClose} open={props.open}>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 400,
                    padding: theme.spacing(1),
                }}
            >
                <Typography variant="h3">Register</Typography>
                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="off"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleOnClose}>Cancel</Button>
                <Button onClick={handleRegister}>Register</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Register;
