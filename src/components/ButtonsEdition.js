import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import TextEditor from './TextEditor';

const ButtonsEdition = (props) => {

    const [item, setItem] = useState(props.item);
    const [disabled, setDisabled] = useState(props.disabled);  

    const handleUpdate = (itemId, value) => {
        props.handleUpdate(itemId, value);
    }

    const handleDelete = (itemId) => {
        props.handleDelete(itemId);
    }

    return (
        <Grid direction="row" container justify="flex-end" alignItems="center">
            <TextEditor 
                itemId={item._id} 
                defaultValue={item.title} 
                confirmChange={handleUpdate}
            />
            <IconButton 
                 id={`option_${item._id}`}
                 aria-label="options"  
                 aria-controls="simple-menu" 
                 aria-haspopup="true" 
                 color="primary" 
                 disabled={disabled}
                 onClick={() => handleDelete(item._id)}
             >
                <DeleteIcon />
            </IconButton>
        </Grid>
    )  
}

export default ButtonsEdition;