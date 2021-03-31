import Head from 'next/head'
import suggestionStyles from '../css/custom/suggestion.module.css'
import { useState, useContext } from 'react';

const names = [
  {name: "Tushar Sibal" , id: 1},
  {name: "Aman Agarwal", id:2 },
  {name: "Udit malhotra", id: 3},
  {name: "Mohit agarwal", id: 4},
  {name: "Ustaleen Kaur", id: 5},
  {name: "Arun Singh", id: 6}
]

export default function Home() {
  const [display,setDisplay] = useState(false);
  const [filteredNames, setFilteredNames] = useState(names);
  const [currentLi, setCurrentLi ] = useState(2);

  const onInputChange = (e,from) => {
    if(e.keyCode == 40 || e.keyCode == 38){
      e.preventDefault();
      console.log("Default..");
    }
    console.log(e.target.innerHTML);
    return;
    // let value = e.target.value;
    // let split_value = value.split(' ')  
    // console.log(split_value,split_value[split_value.length - 1]);
    console.log(from,e.target.selectionStart,e.target.selectionEnd,e.keyCode,e.target.value);
    // console.log(e.target.value);
    console.log(e);
    
    let current_cursor = e.target.selectionStart;
    let i = current_cursor;
    let str = '';
    while(true){
      if(i==0){
        console.log("Exiting");
        setDisplay(false);
        break;
      }
      if(value[i-1] === ' '){
        console.log("Space Encountered");
        setDisplay(false);
        break;
      }
      if(value[i-1] === '@'){
        if(str){
          console.log("@ found==>> ",str);
          setDisplay(true);
        } else {
          setDisplay(false);
        }
        break;
      }
      console.log(value[i-1]);
      str = value[i-1] + str;
      i--;
      // break;
    }
    let elem = document.getElementById("sg-textarea");
    console.log(elem.scrollHeight);
  }
  const onKeyDown = (e) => {
    if(e.keyCode == 38){
      e.preventDefault();
      if(currentLi == 1){
        setCurrentLi(filteredNames.length);
      } else {
        setCurrentLi(currentLi -1);
      }
      console.log("Default..");
    } else if(e.keyCode == 40){
      e.preventDefault();
      if(currentLi == filteredNames.length){
        setCurrentLi(1);
      } else {
        setCurrentLi(currentLi +1);
      }
      console.log("Default..");
    }
  }
  console.log(filteredNames);
  return (
    <>
    <div className={suggestionStyles["sg-container"]}>
      <div>
        { display ?
          <div className={suggestionStyles["sg-box"]}>
            <ul> 
            {
              filteredNames.map(({ name, id },index) =>{
                return(
                  <li className={suggestionStyles["sg-li"]} aria-selected={currentLi == (index + 1) ? true : false} key={"name_"+index}>{name}</li>
                )
                
              })
            }
            </ul>
          </div> : null
        }
      <div id="sg-textarea" contentEditable={true}
      // onSelect={(e) => onInputChange(e,"OnSelect")} 
      onKeyDown={(e) => onKeyDown(e,"OnKeyDown")}
      onKeyUp={(e) => onInputChange(e,"OnKeyUp")} 
      onMouseUp={(e) => onInputChange(e,"OnMouseUp")} 
      // onMouseDown={(e) => onInputChange(e,"OnMouseDown")} 
      className={suggestionStyles["sg-ta"]}>
      </div>
      </div>
    </div>
    </>    
  )
}
