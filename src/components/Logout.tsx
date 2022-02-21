import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {
    open: boolean;
    handleOnClose(): void;
}

const Logout: FC<Props> = (props: Props) => {
    const handleLogout = () => {
        props.handleOnClose();
    };

    return (
        <Dialog open={props.open} onClose={props.handleOnClose}>
            <DialogContent>
                <Typography variant="h4">Logout now?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleOnClose}>Cancel</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Logout;
