import React, { FC, useContext, useState } from "react";
import {
    Typography,
    Dialog,
    TextField,
    DialogContent,
    DialogActions,
    Button,
    useTheme,
    AlertColor,
} from "@mui/material";
import { UserContext } from "../App";
import { patchPost } from "../api/post.api";
import { Post } from "../interfaces/post";
import { PostPopulated } from "./../interfaces/post";

interface Props {
    open: boolean;
    cardData: PostPopulated;
    handleOnClose(): void;
    handleOpenSnackbar(severity: AlertColor, message: string): void;
    handleUpdatePosts(): void;
}

const EditPost: FC<Props> = (props: Props) => {
    const [title, setTitle] = useState(props.cardData.title);
    const [content, setContent] = useState(props.cardData.content);
    const theme = useTheme();
    const userData = useContext(UserContext);
    const handleClose = () => {
        setTitle("");
        setContent("");
        props.handleOnClose();
    };

    const handleSave = async () => {
        if (userData) {
            const info = {
                _id: props.cardData._id,
                user: userData._id,
                title: title,
                content: content,
                edited: new Date(),
            };
            await patchPost(info as Post)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("Error saving post.");
                    }
                })
                .then((response) => {
                    if (response.modifiedCount && response.modifiedCount === 1) {
                        props.handleOpenSnackbar("success", "Post Updated!");
                        props.handleUpdatePosts();
                        props.handleOnClose();
                    } else {
                        throw new Error("Error updating post.");
                    }
                })
                .catch((e) => {
                    if (e instanceof Error) props.handleOpenSnackbar("error", e.message);
                });
        } else {
            props.handleOpenSnackbar("error", "Cannot save unless logged in.");
        }
    };

    return (
        <Dialog onClose={props.handleOnClose} open={props.open} sx={{ width: 500 }}>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 400,
                    padding: theme.spacing(1),
                }}
            >
                <Typography variant="h3">Edit Post</Typography>
                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 25))}
                    helperText={`${title.length} / 25`}
                />

                <TextField
                    sx={{ marginTop: theme.spacing(2) }}
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={6}
                    id="content"
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value.slice(0, 500))}
                    helperText={`${content.length} / 500`}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPost;
