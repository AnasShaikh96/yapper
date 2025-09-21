'use client'
import React from 'react'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { EditorState } from 'lexical';
import { useEffect, useState } from 'react';


import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { YapObject } from '@/lib/type';


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



const YapDocComponent = ({ content, setYapData, yapData }: { content: YapObject | undefined, setYapData: React.Dispatch<React.SetStateAction<YapObject[]>>, yapData: YapObject[] }) => {

    const [editorState, setEditorState] = useState<EditorState | string>();
    useEffect(() => {



        if (content?.content !== undefined) {

            const newArr = [...yapData];
            const contentById = yapData.findIndex(item => item.id === content.id);

            newArr[contentById] = {
                ...content,
                content: editorState
            }

            setYapData(newArr)
        }
    }, [editorState])



    function onChange(editorState: EditorState) {
        // Call toJSON on the EditorState object, which produces a serialization safe string
        const editorStateJSON = editorState.toJSON();
        // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
        setEditorState(JSON.stringify(editorStateJSON));
    }


    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        editorState: content?.content,
        onError,
    };


    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div style={{ height: 'calc(100vh - 110px)', overflowY: 'auto', border: '1px solid #ccc' }}>
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

export default YapDocComponent


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