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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
      },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
}));

export default function FormDialog(props) {
    const [value, setValue] = useState(props.defaultValue);
    const [errorValue, setErrorValue] = useState(null);
    const [dialogTitle, setDialogTitle] = useState(props.dialogTitle || "Inform a new value.");
    const [fieldLabel, setFieldLabel] = useState(props.fieldLabel || "New Value");
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeValue = (event) => {
        setErrorValue(null);
        setValue(event.target.value);
    }

    const submit = () => {
        if (value) {
            props.confirmButton(props.itemId, value);
            handleClose();
        } else {
            setErrorValue(`${fieldLabel} is required.`)
        }
        
    }


    return (
        <div>
            <Fab 
                variant="extended" 
                className={classes.fab} 
                color="primary" 
                aria-label="add" 
                onClick={handleClickOpen}
            >
				<AddIcon className={classes.extendedIcon} />
				Create Project
			</Fab>
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
                        helperText={errorValue}
                        error={!!errorValue}
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