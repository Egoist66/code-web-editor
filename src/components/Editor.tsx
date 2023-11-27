import { FC, useEffect } from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/display/panel'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'

import { Controlled as ControlledEditor } from 'react-codemirror2'
import { useAppDispatch } from "../store/store";
import { onChangeEditorFullScreen, onChangeEditorValues, onChangeExpansion, onClearCache} from "../store/slices/editor-top-panel";

type EditorPropsType = {
     id: string,
     title: string,
     isExpanded: boolean
     isFullscreen: boolean
     values: string
     language: 'xml' | 'css' | 'javascript'
}

export const EditorContainer: FC<EditorPropsType> = ({ title, isFullscreen, values, id, language, isExpanded }) => {

     const dispatch = useAppDispatch()

     const onClearEditorCache = () => {
          dispatch(onClearCache())
     }

     const exitFullScreenbyEscape = (e: KeyboardEvent) => {

          if (e.key === 'Escape') {
               dispatch(onChangeEditorFullScreen({ id, isFullscreen: false }))
          }
     }

     const setOpenEditor = (id: string) => {
          return () => {
               dispatch(onChangeExpansion({ id }))
          }
     }
     const onChangeScreen = () => {
          dispatch(onChangeEditorFullScreen({ id, isFullscreen: true }))
     }

     const onChangeValues = (values: string) => {

          dispatch(onChangeEditorValues({ id, value: values }))

     }

     useEffect(() => {
          if (isFullscreen) {
               window.addEventListener('keydown', exitFullScreenbyEscape)
          }


          return () => {
               window.removeEventListener('keydown', exitFullScreenbyEscape)
          }
     }, [isFullscreen])


     return (
          <div className={`editor-container ${isExpanded ? '' : 'collapsed'}`}>
               <div className="editor-title">
                    <p>{title}</p>
                    
                    <div className="controls-panel">
                         <button
                              style={{ borderColor: !isExpanded ? 'crimson' : 'orange', color: !isExpanded ? 'crimson' : 'orange' }}
                              onClick={setOpenEditor(id)}
                         >
                              Toggle
                         </button>
                         <button
                              style={{ borderColor: isFullscreen ? 'crimson' : 'orange', color: isFullscreen ? 'crimson' : 'orange' }}
                              onClick={onChangeScreen}
                         >
                              Fullscreen
                         </button>

                         {id === '1' ? <button
                              style={{ borderColor: 'orange', color: 'orange' }}
                              onClick={onClearEditorCache}
                         >
                              Очистить кеш
                         </button>: null}
                    </div>
               </div>

               <ControlledEditor
                    className="code-mirror-wrapper"
                    onBeforeChange={(_editor, _data, value) => onChangeValues(value)}
                    value={values}
                    options={{
                         lineWrapping: true,
                         mode: language,
                         autocorrect: true,
                         lineNumbers: true,
                         theme: 'material',
                         electricChars: true,
                         smartIndent: true,
                         fullScreen: isFullscreen,
                         matchBrackets: true,
                         matchTags: true,
                         autoRefresh: true,
                         value: id === '1' ? `<div></div>` : '',
                         autoCloseTags: true,
                         showHint: true,
                         hintOptions: {
                              completeSingle: false,
                              extraKeys: {
                                   'Ctrl-Space': 'autocomplete'
                              }
                         },
                         foldOptions: {
                              scanUp: true
                         },
                         autoCloseBrackets: true,
                         flattenSpans: true,
                         autofocus: id === '1' ? true : false,
                         spellcheck: true


                    }}
               />

          </div>

     )
}


