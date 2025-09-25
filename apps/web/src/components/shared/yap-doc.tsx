'use client'
import React from 'react'
import { EditorState } from 'lexical';
import { useEffect, useState } from 'react';
import { YapObject } from '@/lib/type';
import YapEditor from './yap-editor';

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

    return (
        <YapEditor
            setEditorState={setEditorState}
            initialEditorStates={content?.content}
            editorStyles={{ height: 'calc(100vh - 110px)', overflowY: 'auto', border: '1px solid #ccc' }} />
    )
}

export default YapDocComponent