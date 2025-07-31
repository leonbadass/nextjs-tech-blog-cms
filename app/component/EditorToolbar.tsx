import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { ChangeEvent } from "react";
import { IoIosList } from "react-icons/io";
import { FaRegImage } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md";
import { TOGGLE_LINK_COMMAND, $createLinkNode } from '@lexical/link';
import uploadImage from '@/app/lib/uploadImage';
import { ImageNode } from './nodes/imageNodes';

import {mergeRegister} from '@lexical/utils';
import {
    $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $createTextNode,
  $insertNodes,
  
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  IS_SUBSCRIPT,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  
} from 'lexical';

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'


import {useCallback, useEffect, useRef, useState} from 'react';



export default function Toolbar(){
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isStrikrthrough, setIsStrikethrough] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [selectedHeader , setSelectedHeader]  = useState('paragraph');
    const [isSubscript, setIsSubscript] = useState(false);
    const [isSuperscript, setIsSuperscript] = useState(false);
    const[unorderedList, setUnorderedList] = useState(false);
    const[orderedList, setOrderedList] = useState(false);
    const [isQuote, setIsQuote] = useState(false);
    const [isLink, setIsLink] = useState(false);


      const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
       setIsSuperscript(selection.hasFormat('superscript'));
      
    }
  }, []);

 
  useEffect(() => {
 
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      });
     
  }, [editor, $updateToolbar]);


// Header change handler
  const handleHeaderChange = (e: ChangeEvent<HTMLSelectElement>)=>{
    e.preventDefault();
    if(!e.target.value) return;
    
    if(e.target.value === 'paragraph'){
        setSelectedHeader('paragraph');
        editor.update(() => {
      const selection = $getSelection();
      
      if ($isRangeSelection(selection)) {
         if (selection.hasFormat('bold')) selection.toggleFormat('bold')
        $setBlocksType(selection, ()=> $createParagraphNode());
      }
      
    })

  

    return

    }
    const selectedHeader = e.target.value as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';  
  
    

    setSelectedHeader(e.target.value);


    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, ()=> $createHeadingNode(selectedHeader));
      }
    });
  }
//Link insertion function
   const insertLink = () => {
  const url = prompt('Enter URL');
  if (!url) return;

  editor.update(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
      // Case 1: Text is selected – wrap it with a link
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    } else {
      // Case 2: No text is selected – insert a new clickable link node
      const linkNode = $createLinkNode(url);
      linkNode.append($createTextNode(url));
      selection?.insertNodes([linkNode]);
    }
  })
};

//Image insertion function
const handleUploadImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const imageUrl = await uploadImage(file); // your Supabase upload
        if (imageUrl instanceof Error) {
            console.error('Image upload failed:', imageUrl.message);
            return;
        }
      editor.update(() => {
        const imageNode = new ImageNode(imageUrl.url);
        $insertNodes([imageNode]);
      });
    };
  };

    return(
        <div className="space-x-2">
            <button onClick={()=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
            }} className={`${isBold? "bg-gray-200" : ''} text-md min-w-6 font-bold rounded-md p-1`} >
                B

            </button>
             <button onClick={()=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }} className={`${isItalic? "bg-gray-200" : ''} text-md font-bold rounded-md p-1 italic  min-w-6`} >
                i

            </button>
             <button onClick={()=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            }} className={`${isStrikrthrough? "bg-gray-200 " : ''} text-md font-bold rounded-md p-1  min-w-6 line-through`} >
                ABC

            </button>
             <button onClick={()=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }} className={`${isUnderline? "bg-gray-200 " : ''} text-md font-bold rounded-md p-1  min-w-6 underline`} >
               U

            </button>
            <button onClick={()=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
            }} className={`${isSubscript? "bg-gray-200 " : ''} text-md font-bold rounded-md p-1  min-w-6 `} >
               A <sub>x</sub>
            

            </button>
            <button onClick={()=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
            }} className={`${isSuperscript? "bg-gray-200 " : ''} text-md font-bold rounded-md p-1  min-w-6 `} >
               A <sup>x</sup>
            

            </button>
            <button onClick={insertLink}  className={`${isLink? "bg-gray-200 " : ''} text-md font-bold rounded-md p-1  min-w-6 `}>
              🔗 
            </button>
           
                <select name="header" id="header" value={selectedHeader}  
                onChange={(e)=>handleHeaderChange(e)} className="border border-solid border-black border-2" >

                <option value="paragraph">p</option>
                   <option value ="h1" >H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                    

                </select>

                 <button
    onClick={() => {!unorderedList ? editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined) : 
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
        setUnorderedList(!unorderedList)}}
    className= {`${unorderedList? "bg-gray-200 " : ''}text-md font-bold rounded-md p-1  min-w-6 `}
  >
    <IoIosList/>
  </button>

  <button
    onClick={() => {!orderedList ? editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined) :
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
        setOrderedList(!orderedList)
    }
    
    }
    className= {`${orderedList? "bg-gray-200 " : ''}text-md font-bold rounded-md p-1  min-w-6 `}
  >
    <MdFormatListNumbered/>
  </button>

  <button
  onClick={() => {

    !isQuote? editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
      //setIsQuote
    }) : editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
    setIsQuote(!isQuote);
  }}
  className= {`${isQuote? "bg-gray-200 " : ''}text-md font-bold rounded-md p-1  min-w-6 `}
>
  ❝ Quote
</button>
<button onClick={handleUploadImage}  className = {`${isLink? "bg-gray-200 " : ''} text-md font-bold rounded-md p-1  min-w-6 `}>
     <FaRegImage />         
 </button>


                

<div className="space-x-2">
 

  
</div>
    
        </div>
    )
}