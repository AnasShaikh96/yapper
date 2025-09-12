'use client';

import { $getRoot, $getSelection, EditorState } from 'lexical';
import { useEffect, useState } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
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

export default function Index() {


  const [editorState, setEditorState] = useState<any>();
  // function onChange(editorState) {
  //   setEditorState(editorState);
  // }

  function onChange(editorState: EditorState) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  }

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-placeholder={'Start yapping...'}
              placeholder={<div>Start yapping...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MyOnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
}


function MyOnChangePlugin({ onChange }: { onChange: React.ChangeEvent<HTMLElement> }) {
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