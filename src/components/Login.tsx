import React, { FC, useState } from "react";
import {
    Typography,
    Dialog,
    DialogContent,
    useTheme,
    DialogActions,
    Button,
    TextField,
    AlertColor,
} from "@mui/material";
import { User } from "../interfaces/user";
import { postLogin } from "../api/login.api";

interface Props {
    open: boolean;
    handleOnClose(): void;
    handleOpenSnackbar(severity: AlertColor, message: string): void;
    handleUpdateUserData(data: User): void;
}

const Login: FC<Props> = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const theme = useTheme();

    const handleLogin = async () => {
        await postLogin({ username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Error Logging In. Check your password.");
                }
            })
            .then((response) => {
                props.handleUpdateUserData(response as User);
                props.handleOpenSnackbar("success", "Logged in!");
                props.handleOnClose();
            })
            .catch((e) => {
                if (e instanceof Error) props.handleOpenSnackbar("error", e.message);
            });
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
                <Typography variant="h3">Login</Typography>
                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleOnClose}>Cancel</Button>
                <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
