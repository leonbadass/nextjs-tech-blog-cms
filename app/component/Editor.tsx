'use client'

import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';
import { JSX } from 'react';
import Toolbar from './EditorToolbar';
import { ListNode, ListItemNode } from '@lexical/list'
import { LinkNode } from '@lexical/link';
import { ImageNode } from './nodes/imageNodes';
//import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

// import { LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import { Theme as theme } from '@/utils/lexical/theme';
import { HeadingNode , QuoteNode } from '@lexical/rich-text'



// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}



export default function Editor(): JSX.Element { 
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [
      HeadingNode,ListNode,
      ListItemNode,
     QuoteNode,
     LinkNode,
        ImageNode,
    ],
  };

  return (
    <div className=' relative min-h-[60vh] max-w-4xl mx-auto bg-white rounded-lg p-5'>
        <LexicalComposer initialConfig={initialConfig}>
            <Toolbar/>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-placeholder={'Enter some text...'}
            placeholder={<div className='absolute top-40 left-0 inline'>
                <span className="font-xl font-semibold  tracking-wider leading-snug pl-5 opacity-25">...start typing</span></div>}
            className='focus:outline-none'
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
        <LinkPlugin />
        {/* <AutoLinkPlugin /> */}
        {/* <LexicalLinkPlugin /> */}
        {/* <LinkPlugin /> */}
        {/* <AutoFocusPlugin /> */}
      
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>

    </div>
 
  );
}