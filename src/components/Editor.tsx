import { FC, useDeferredValue, useEffect, useState } from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'

import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { useAppDispatch } from "../store/store";
import { onChangeEditorValues, onChangeExpansion } from "../store/slices/editor-top-panel";

type EditorPropsType = {
     id: string,
     title: string,
     isExpanded: boolean
     values: string
     language: 'xml' | 'css' | 'javascript'
}

export const EditorContainer: FC<EditorPropsType> = ({ title, values, id, language, isExpanded }) => {

     const dispatch = useAppDispatch()


     const setOpenEditor = (id: string) => {
          return () => {
               dispatch(onChangeExpansion({ id }))
          }
     }
     const onChangeValues = (values: string) => {

          dispatch(onChangeEditorValues({ id, value: values }))

     }



     return (
          <div className={`editor-container ${isExpanded ? '' : 'collapsed'}`}>
               <div className="editor-title">
                    {title}
                    <button 
                         style={{borderColor: !isExpanded ? 'crimson': 'orange', color: !isExpanded ? 'crimson': 'orange'}}
                         onClick={setOpenEditor(id)}
                         >
                         Toggle
                    </button>
               </div>

               <ControlledEditor
                    className="code-mirror-wrapper"
                    onBeforeChange={(editor, data, value) => onChangeValues(value)}
                    value={values}
                    options={{
                         lineWrapping: true,
                         mode: language,
                         autocorrect: true,
                         lineNumbers: true,
                         theme: 'material',
                         electricChars: true,
                         smartIndent: true,
                         spellcheck: true


                    }}
               />

          </div>

     )
}


