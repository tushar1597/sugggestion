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
    // console.log(e.target.innerHTML);
    let value = e.target.innerHTML;
    let parent_node_name, parent_node;
    let super_parent,child_nodes=[];
    let current_value = '', node_type = 0, offset;
    offset = window.getSelection().anchorOffset;
    console.log(value,e.target.parentNode,e.target.id);
    if(value == "<div><br></div>"){
      return;
    }

    if((!value || value.trim() == '' || value.trim() == '<br>' || value.trim() == '<div></div>') && e.target.id == "sg-textarea"){
      console.log("appending");
      e.target.innerHTML = "<div><br></div>"
    }
    value = e.target.innerHTML;
    // console.log(window.getSelection(),window);
    // console.log(window.getSelection().anchorNode.parentNode);
    parent_node = window.getSelection().anchorNode.parentNode;
    // console.log(parent);
    node_type = window.getSelection().anchorNode.nodeType;
    parent_node_name = window.getSelection().anchorNode.parentNode.nodeName;
    console.log("====?>>>>>",window.getSelection().anchorNode.parentNode.nodeName);
    if(parent_node_name === "SPAN"){
      super_parent = window.getSelection().anchorNode.parentNode.parentNode;
      console.log("super_parent-->>",super_parent.childNodes);
      child_nodes = super_parent.childNodes;
      console.log(child_nodes);
      let super_parent_innerHTML = '';
      for(let k=0; k < child_nodes.length; k++){
        if(child_nodes[k].nodeType == 3){
          console.log(child_nodes[k].data);
          super_parent_innerHTML = super_parent_innerHTML + child_nodes[k].data;
        } else {
          super_parent_innerHTML = super_parent_innerHTML + child_nodes[k].innerHTML;
          console.log(child_nodes[k].innerHTML);
        }
      }
      console.log("HTML::",super_parent_innerHTML,offset);
        super_parent.innerHTML = super_parent_innerHTML;
        // super_parent.anchorOffset = offset;
        let range = document.createRange();
        let sel = window.getSelection();
      
        range.setStart(super_parent, 5);
        range.collapse(true);
      
        sel.removeAllRanges();
        sel.addRange(range);
    }
    else if (parent_node_name === "DIV"){
      let parent_innerHTML = '';
      let span_nodes = 0;
      child_nodes = parent_node.childNodes;
      console.log(child_nodes);
      for(let k=0; k < child_nodes.length; k++){
        if(child_nodes[k].nodeName == "SPAN"){
          span_nodes++;
        } 
      }
      if(span_nodes){
        console.log("entering...1");
        for(let k=0; k < child_nodes.length; k++){
          if(child_nodes[k].nodeType == 3){
            console.log(child_nodes[k].data);
            parent_innerHTML = parent_innerHTML + child_nodes[k].data;
          } else {
            parent_innerHTML = parent_innerHTML + child_nodes[k].innerHTML;
            console.log(child_nodes[k].innerHTML);
          }
        }
        console.log(child_nodes);
        console.log("HTML::",parent_innerHTML,offset);
        parent_node.innerHTML = parent_innerHTML;
        console.log(parent_node);
        let range = document.createRange();
        let sel = window.getSelection();
      
        range.setStart(parent_node.childNodes[0], offset);
        range.collapse(true);
      
        sel.removeAllRanges();
        sel.addRange(range);
        // let sel = window.getSelection();
        // sel.collapse(parent_node, 1);
      }
     
    }
    
    
    
    if(node_type != 3){
      console.log("NODE TYPE NOT TEXT:",node_type);
      // return;
    } else {
      offset = window.getSelection().anchorOffset;
      current_value = window.getSelection().anchorNode.data;
      console.log("OFFSET::",offset);
      
      // return;
      // console.log(current_value,offset);
      let i = offset-1, space_encountered = 0;
      let str = '';
      while(true){
        if(i < 0){
          setDisplay(false);
          break;
        }
        console.log(' '.charCodeAt(), " ".charCodeAt(0));
        if(current_value.charCodeAt(i) == 32 || current_value.charCodeAt(i) == 160){
          space_encountered++;
          console.log("SPACE__",space_encountered);
        }
        if(space_encountered > 1){
          console.log("More than 1 spaces");
          setDisplay(false);
          break;
        }
        
        // console.log("-->>",current_value[i]);
        if(current_value[i] == '@'){
          console.log("found..",str);
          if(str && str.trim()){
            setDisplay(true);
          }else{
            setDisplay(false);
          }
          break;
        }
        str = current_value[i] + str;
        i--;
        console.log(str);
      }
    }
    
    console.log(parent);
    return;
    // let split_value = value.split(' ')  
    // // console.log(split_value,split_value[split_value.length - 1]);
    // console.log(from,e.target.selectionStart,e.target.selectionEnd,e.keyCode,e.target.value);
    // // console.log(e.target.value);
    // console.log(e);
    
    // let current_cursor = e.target.selectionStart;
    // let i = current_cursor;
    // let str = '';
    // while(false){
    //   if(i==0){
    //     console.log("Exiting");
    //     setDisplay(false);
    //     break;
    //   }
    //   if(value[i-1] === ' '){
    //     console.log("Space Encountered");
    //     setDisplay(false);
    //     break;
    //   }
    //   if(value[i-1] === '@'){
    //     if(str){
    //       console.log("@ found==>> ",str);
    //       setDisplay(true);
    //     } else {
    //       setDisplay(false);
    //     }
    //     break;
    //   }
    //   console.log(value[i-1]);
    //   str = value[i-1] + str;
    //   i--;
    //   // break;
    // }
    // let elem = document.getElementById("sg-textarea");
    // console.log(elem.scrollHeight);
  }
  const onKeyDown = (e) => {
    console.log(e.keyCode, display);
    if(e.keyCode == 13 && display){
      e.preventDefault();
    }
    if(e.keyCode == 38 && display){
      e.preventDefault();
      if(currentLi == 1){
        setCurrentLi(filteredNames.length);
      } else {
        setCurrentLi(currentLi -1);
      }
      console.log("Default..");
    } else if(e.keyCode == 40  && display){
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
        <div>
        <br/>
        </div>
        
      </div>
      </div>
      <div contentEditable={true} className={suggestionStyles["sg-ta"]}>
        <p><br/></p>
      </div>
      {/* <textarea value="<span>hi</span>"></textarea> */}
    </div>
    </>    
  )
}
