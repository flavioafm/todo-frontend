import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export default function FormDialog(props) {
    const [value, setValue] = useState(props.defaultValue);
    const [dialogTitle, setDialogTitle] = useState(props.dialogTitle || "Inform a new value.");
    const [fieldLabel, setFieldLabel] = useState(props.fieldLabel || "New Value");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeValue = (event) => {
        setValue(event.target.value);
    }

    const submit = () => {
        props.confirmChange(props.itemId, value);
        setOpen(false);
    }


    return (
        <div>
            <IconButton 
                aria-label="options"  
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                color="primary" 
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="textEdition"
                        label={fieldLabel}
                        defaultValue={value}
                        onChange={handleChangeValue}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submit} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
        </Dialog>
        </div>
  );
}