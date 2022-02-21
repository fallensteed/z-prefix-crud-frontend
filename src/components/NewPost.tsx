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
import { UserContext } from "./../App";
import { postPost } from "../api/post.api";
import { Post } from "../interfaces/post";

interface Props {
    open: boolean;
    handleOnClose(): void;
    handleOpenSnackbar(severity: AlertColor, message: string): void;
    handleUpdatePosts(): void;
}

const NewPost: FC<Props> = (props: Props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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
                user: userData._id,
                title: title,
                content: content,
                created: new Date(),
            };
            await postPost(info as Post)
                .then((response) => {
                    if (response.status === 200) {
                        return;
                    } else {
                        throw new Error("Error saving post.");
                    }
                })
                .then(() => {
                    props.handleOpenSnackbar("success", "Post Saved!");
                    props.handleUpdatePosts();
                    props.handleOnClose();
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
                <Typography variant="h3">New Post</Typography>
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

export default NewPost;
