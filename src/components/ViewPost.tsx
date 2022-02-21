import React, { FC, useContext, useState } from "react";
import {
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    CardActions,
    Button,
    useTheme,
    AlertColor,
    cardHeaderClasses,
} from "@mui/material";
import { PostPopulated } from "../interfaces/post";
import { UserContext } from "./../App";
import { deletePost } from "../api/post.api";
import EditPost from "./EditPost";

interface Props {
    cardData: PostPopulated;
    truncated: boolean;
    handleOpenSnackbar(severity: AlertColor, message: string): void;
    handleUpdatePosts(): void;
}

const ViewPost: FC<Props> = (props: Props) => {
    const [truncate, setTruncate] = useState(props.truncated);
    const [openEditPost, setOpenEditPost] = useState(false);
    const { cardData } = props;
    const userData = useContext(UserContext);
    const theme = useTheme();

    const handleViewChange = () => {
        setTruncate(!truncate);
    };

    const handleOpenEditPost = () => setOpenEditPost(true);
    const handleCloseEditPost = () => setOpenEditPost(false);

    const handleDeletePost = async () => {
        const id = cardData._id;
        await deletePost(id)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Error Sending Delete Request");
                }
            })
            .then((response) => {
                if (response.deletedCount && response.deletedCount > 0) {
                    props.handleOpenSnackbar("success", "Post deleted.");
                    props.handleUpdatePosts();
                } else {
                    throw new Error("Error deleting post.");
                }
            })
            .catch((e) => {
                if (e instanceof Error) {
                    props.handleOpenSnackbar("error", e.message);
                }
            });
    };

    return (
        <Card
            sx={{
                width: 450,
                marginBottom: theme.spacing(2),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="post card"
                        sx={{ backgroundColor: userData && userData._id === cardData.user._id ? "green" : "grey" }}
                    >
                        {cardData.user.firstName.slice(0, 1) + cardData.user.lastName.slice(0, 1)}
                    </Avatar>
                }
                title={cardData.user.username}
                subheader={cardData.created}
            />
            <CardContent>
                <Typography>
                    {cardData.content.length > 100 && truncate
                        ? cardData.content.slice(0, 100) + "..."
                        : cardData.content}
                </Typography>
                {cardData.edited ? (
                    <Typography variant="subtitle2" sx={{ paddingTop: theme.spacing(1) }}>
                        Edited: {cardData.edited}
                    </Typography>
                ) : null}
            </CardContent>
            <CardActions>
                {truncate && cardData.content.length > 100 ? <Button onClick={handleViewChange}>Expand</Button> : null}
                {!truncate && cardData.content.length > 100 ? (
                    <Button onClick={handleViewChange}>Minimize</Button>
                ) : null}
                {userData && userData._id === cardData.user._id ? (
                    <>
                        <Button onClick={handleOpenEditPost}>Edit</Button>
                        <Button onClick={handleDeletePost}>Delete</Button>
                    </>
                ) : null}
            </CardActions>

            <EditPost
                open={openEditPost}
                cardData={cardData}
                handleOnClose={handleCloseEditPost}
                handleOpenSnackbar={props.handleOpenSnackbar}
                handleUpdatePosts={props.handleUpdatePosts}
            />
        </Card>
    );
};

export default ViewPost;
