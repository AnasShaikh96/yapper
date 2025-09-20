import { EditorState } from "lexical";

export interface YapObject {
    id: number,
    value: string,
    title: string,
    content: string | EditorState
}