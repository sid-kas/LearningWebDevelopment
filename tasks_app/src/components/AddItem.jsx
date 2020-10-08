import React, { memo } from 'react'
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'



const AddItem = memo((props) => {
    return (
        <Paper elevation={2} style={{ margin: 16, padding: 16 }}>
            <Grid container>
                <Grid item xs={10} md={10} style={{ paddingRight: 16 }}>
                    <TextField 
                        placeholder="Add item here..."
                        value={props.inputValue} 
                        onChange={props.onInputChange} 
                        onKeyPress={props.onInputKeyPress}
                        fullWidth 
                    />
                </Grid>
            
                <Grid item xs={2} md={2} style={{alignItems:"center"}}>
                    <Button variant="contained" color="primary" onClick={props.onButtonClick} >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
});

export default AddItem;
