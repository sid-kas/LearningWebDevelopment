import React, {memo} from 'react';
import { List, Paper } from '@material-ui/core';
import Item from './Item'

const ItemList = memo((props) => {
    if (props.items.length>0 ){
        return (
            <Paper style={{ margin: 16 }}>
                <List style={{ overflow: 'scroll' }}>
                {props.items.map((item, indx) => (
                    <Item
                    key={indx}
                    text={item.value}
                    datetime={item.date}
                    checked={item.checked}
                    edit={item.edit}
                    divider={indx !== props.items.length - 1}
                    onDeleteButtonClick={() => props.onItemRemove(item.id)}
                    onEditButtonClick={()=> props.onItemEdit(item.id)}
                    onCheckBoxToggle={() => props.onItemCheck(item.id)}
                    onEditInputChange={(e) => props.onEditInputChange(e,item.id)}
                    />
                ))}
                </List>
            </Paper>
        );
    } else {
        return ( <> </> );
    }
    
});

export default ItemList;

