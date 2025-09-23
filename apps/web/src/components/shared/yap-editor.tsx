'use client'
import React from 'react'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { EditorState } from 'lexical';
import { useEffect } from 'react';


import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


const theme = {
    // Theme styling goes here
    //...
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}


interface YapEditorProps {
    editorState?: any,
    setEditorState: any,
    initialEditorStates: any
    editorStyles?: any
    // content: YapObject | undefined,
    // setYapData: React.Dispatch<React.SetStateAction<YapObject[]>>,
    // yapData: YapObject[]
}


const YapEditor = ({ setEditorState, initialEditorStates, editorStyles }: YapEditorProps) => {

    function onChange(editorState: EditorState) {
        // Call toJSON on the EditorState object, which produces a serialization safe string
        const editorStateJSON = editorState.toJSON();
        // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
        setEditorState(JSON.stringify(editorStateJSON));
    }


    const initialConfig = {
        namespace: 'MyEditor',
        editorState: initialEditorStates,
        theme,
        onError,

    };


    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div style={editorStyles}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            aria-placeholder={'Enter some text...'}
                            placeholder={<div>Enter Some text...</div>}
                        />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <MyOnChangePlugin onChange={onChange} />
            </div>
        </LexicalComposer>

    )
}

export default YapEditor


function MyOnChangePlugin({ onChange }: { onChange: (editorState: EditorState) => void }) {
    // Access the editor through the LexicalComposerContext
    const [editor] = useLexicalComposerContext();
    // Wrap our listener in useEffect to handle the teardown and avoid stale references.
    useEffect(() => {
        // most listeners return a teardown function that can be called to clean them up.
        return editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => {
            // call onChange here to pass the latest state up to the parent.
            onChange(editorState);
        });
    }, [editor, onChange]);
    return null;
}