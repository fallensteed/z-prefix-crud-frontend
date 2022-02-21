import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Container,
    IconButton,
    Typography,
    useTheme,
    Stack,
    Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ForumIcon from "@mui/icons-material/Forum";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React, { FC, forwardRef, useContext, useEffect, useState } from "react";
import NewPost from "../components/NewPost";
import { User } from "../interfaces/user";
import { UserContext } from "../App";
import Logout from "../components/Logout";
import Login from "./../components/Login";
import Register from "../components/Register";
import { getPosts } from "./../api/post.api";
import { PostPopulated } from "./../interfaces/post";
import ViewPost from "../components/ViewPost";
import { postLogout } from "./../api/logout.api";

interface Props {
    darkMode: boolean;
    toggleDarkMode(value: boolean): void;
    handleUpdateUserData(value?: User): void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Main: FC<Props> = (props: Props) => {
    const [navValue, setNavValue] = useState(0);
    const [openNewPost, setOpenNewPost] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [posts, setPosts] = useState<PostPopulated[]>([]);
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const theme = useTheme();
    const userData = useContext(UserContext);

    const handleOpenNewPost = () => setOpenNewPost(true);
    const handleCloseNewPost = () => setOpenNewPost(false);

    const handleOpenLogout = () => setOpenLogout(true);
    const handleCloseLogout = () => setOpenLogout(false);

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);

    const handleGetPosts = async () => {
        await getPosts()
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                    // } else {
                }
            })
            .then((response: PostPopulated[]) => setPosts(response));
    };

    const handleOpenSnackbar = async (severity: AlertColor, message: string) => {
        setSnackSeverity(severity);
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackSeverity("success");
        setSnackMessage("");
        setSnackOpen(false);
    };

    const handleLogout = async () => {
        if (userData)
            await postLogout(userData._id)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("Error logging out.");
                    }
                })
                .then(() => {
                    handleOpenSnackbar("success", "Logged out!");
                    props.handleUpdateUserData();
                })
                .catch((e) => {
                    if (e instanceof Error) handleOpenSnackbar("error", e.message);
                });
    };

    const handleShowMyPosts = async () => {
        setNavValue(1);
        if (userData) {
            await getPosts({ user: userData._id })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                        // } else {
                    }
                })
                .then((response: PostPopulated[]) => setPosts(response));
        }
    };

    const handleUserChange = () => {
        if (userData) {
            setNavValue(1);
            handleShowMyPosts();
        } else {
            setNavValue(0);
            handleGetPosts();
        }
    };

    useEffect(() => {
        handleGetPosts();
    }, []);

    useEffect(() => {
        handleUserChange();
    }, [userData]);

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Box
                sx={{
                    height: "calc(100% - 56px)",
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Container
                    sx={{
                        padding: theme.spacing(1),
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                >
                    <Box />
                    <Typography variant="h2" color="primary">
                        Z-prefix Blog Project
                    </Typography>
                    {props.darkMode ? (
                        <IconButton aria-label="Light Mode Toggle" onClick={() => props.toggleDarkMode(false)}>
                            <Brightness7Icon />
                        </IconButton>
                    ) : (
                        <IconButton aria-label="Dark Mode Toggle" onClick={() => props.toggleDarkMode(true)}>
                            <Brightness4Icon />
                        </IconButton>
                    )}
                </Container>
                {userData ? (
                    <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
                        Welcome {userData.username}
                    </Typography>
                ) : null}
                <Box
                    sx={{
                        marginTop: theme.spacing(2),
                        margin: "auto",
                        maxWidth: 975,
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "center",
                    }}
                >
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <ViewPost
                                cardData={post}
                                truncated={true}
                                key={post._id}
                                handleOpenSnackbar={handleOpenSnackbar}
                                handleUpdatePosts={handleShowMyPosts}
                            />
                        ))
                    ) : (
                        <Typography variant="h4" color="error">
                            No posts to display
                        </Typography>
                    )}
                </Box>
            </Box>
            {userData ? (
                <BottomNavigation showLabels value={navValue} onChange={(e, newValue) => setNavValue(newValue)}>
                    <BottomNavigationAction label="All Posts" icon={<ForumIcon />} value={0} onClick={handleGetPosts} />
                    <BottomNavigationAction
                        label="My Posts"
                        icon={<ChatBubbleIcon />}
                        value={1}
                        onClick={handleShowMyPosts}
                    />
                    <BottomNavigationAction label="New Post" icon={<CreateIcon />} onClick={handleOpenNewPost} />
                    <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
                </BottomNavigation>
            ) : (
                <BottomNavigation showLabels value={navValue}>
                    <BottomNavigationAction label="All Posts" icon={<ForumIcon />} value={0} onClick={handleGetPosts} />
                    <BottomNavigationAction label="Login" icon={<LoginIcon />} onClick={handleOpenLogin} />
                    <BottomNavigationAction label="Register" icon={<PersonAddIcon />} onClick={handleOpenRegister} />
                </BottomNavigation>
            )}
            <NewPost
                open={openNewPost}
                handleOnClose={handleCloseNewPost}
                handleOpenSnackbar={handleOpenSnackbar}
                handleUpdatePosts={handleShowMyPosts}
            />
            <Logout open={openLogout} handleOnClose={handleCloseLogout} />
            <Login
                open={openLogin}
                handleOnClose={handleCloseLogin}
                handleOpenSnackbar={handleOpenSnackbar}
                handleUpdateUserData={props.handleUpdateUserData}
            />
            <Register
                open={openRegister}
                handleOnClose={handleCloseRegister}
                handleOpenSnackbar={handleOpenSnackbar}
                handleUpdateUserData={props.handleUpdateUserData}
            />

            <Stack spacing={2} sx={{ width: 300 }}>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert severity={snackSeverity}>{snackMessage}</Alert>
                </Snackbar>
            </Stack>
        </Box>
    );
};

export default Main;
