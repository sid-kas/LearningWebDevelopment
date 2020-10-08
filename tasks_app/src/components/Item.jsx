import React, {memo} from 'react';
import {
    TextField,
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
  } from '@material-ui/core';
import {DeleteOutlined, EditOutlined, Done} from '@material-ui/icons';

const Item = memo((props) => {

    function strikeOnCheckBoxToggle(checked) {
        if (checked){
            return "line-through"
        }
        else {
            return ''
        }
    }

    function editMode(isEditMode) {
        var dt = new Date(props.datetime)
        if (isEditMode) {
            return (
                <>
                <TextField 
                    value={props.text} 
                    onChange={props.onEditInputChange} 
                    fullWidth 
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="done" onClick={props.onEditButtonClick}>
                        <Done />
                    </IconButton>
                </ListItemSecondaryAction>
                </>
            );

        } else {
            return (
                <>
                <Checkbox
                    onClick={props.onCheckBoxToggle}
                    checked={props.checked}
                    disableRipple
                />
                <ListItemText primary={props.text} secondary={dt.toString().substring(0,24)} style={{textDecoration: strikeOnCheckBoxToggle(props.checked)}}/>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={props.onEditButtonClick}>
                        <EditOutlined />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={props.onDeleteButtonClick}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
                
                </>
            );
        

        }
        
    }

    return (
    <ListItem divider={props.divider}>
        {editMode(props.edit)}
    </ListItem>
    );
});

export default Item;
