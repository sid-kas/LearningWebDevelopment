import React, {useState, useEffect} from 'react';
import {CssBaseline, Container} from "@material-ui/core"
import { gql, useMutation, useQuery } from '@apollo/client';

import Navbar from "./components/Navbar"
import AddItem from "./components/AddItem"
import ItemList from "./components/ItemList"

import { GET_TASKS, INSERT_TASK, CHECK_TASK, EDIT_TASK, DELETE_TASK } from "./components/Queries"



function App() {
  const [inputValue, setInputValue] = useState('');
  const [itemList, setItemList] = useState([]);

  const { loading, error, data } = useQuery(GET_TASKS);
  const [insertTask] = useMutation(INSERT_TASK);
  const [editTask] = useMutation(EDIT_TASK);
  const [checkTask] = useMutation(CHECK_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  useEffect( ()=>{
    if (!loading && data) {
      const j = data.tasks.map((item,_)=> {
        return {
          id:item.id,
          value:item.title,
          checked: item.checked,
          date: Date.now(),
          edit:false
        };
      });
      setItemList(j);
    }

  }, [loading, data]);

  function changeInput(e) {
    setInputValue(e.target.value);
  }
  
  function clearInput() {
    setInputValue('');
  }

  function onKeyPress(event, callback) {
    if (event.which === 13 || event.keyCode === 13) {
      callback(inputValue);
      return true;
    }
    return false;
    
  }

  function addItem(itemId, text, checked) {
    if (text !== '') {
      console.log([itemId, text])
      setItemList(
        itemList.concat({
          id:itemId,
          value:text,
          checked: checked,
          date: Date.now(),
          edit:false
        })
      ); 
    } 
  }

  function clearIputAndAddItem() {
    clearInput();
    var insertTaskData = insertTask({variables:{title: inputValue, checked: false}});
    insertTaskData.then(result=>{
      var item = result.data.insert_tasks_one;
      addItem(item.id, item.title, item.checked);
      return item;
    });
  }

  function checkItem(id) {
    setItemList(
      itemList.map( (item, EDIT_TASK)=>{
        if (id === item.id) {
          item.checked = !item.checked;
          checkTask({variables:{id:id,checked:item.checked}});
        }
        return item;
      }
      )
    );
  }

  function editItem(id) {
    setItemList(
      itemList.map( (item, key)=>{
        if (id === item.id) {
          item.edit = !item.edit;
        }
        return item;
      }
      )
    );
    
  }

  function removeItem(id) {
    deleteTask({variables:{id:id}});
    setItemList(
      itemList.filter(
        (item,_)=> id!==item.id
      )
    );
  }

  function editInputChange(e,indx) {
    setItemList(
      itemList.map( (item, key)=>{
        if (indx === item.id) {
          item.value = e.target.value;
          item.date = Date.now();
          editTask({variables:{id:item.id,title:item.value}});
        }
        return item;
      }
      )
    );
  }

 

  return (
    <CssBaseline>
      <Navbar/>
      <Container maxWidth="sm">
        <AddItem
          inputValue={inputValue}
          onInputChange={(e) => changeInput(e)}
          onInputKeyPress={e => onKeyPress(e, clearIputAndAddItem)}
          onButtonClick={clearIputAndAddItem}
        />

        <ItemList 
          items={itemList} 
          onItemCheck={e=>{checkItem(e)}}
          onItemRemove={e=>{removeItem(e)}}
          onItemEdit={e=>{editItem(e)}}
          onEditInputChange={(e,indx)=>{editInputChange(e, indx)}}
        />
      </Container>
    </CssBaseline>
    
  );
}

export default App;

// ReactDOM.render(<App />, document.querySelector('#app'));
