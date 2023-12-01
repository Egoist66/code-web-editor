import { FC, memo, useCallback, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../store/store";
import { onChangeEditorFullScreen, onChangeEditorValues, onChangeExpansion, onClearCache } from "../store/slices/editor-top-panel";
import { PanelControls } from "./PanelControls";

type EditorPropsType = {
     id: string,
     title: string,
     isExpanded: boolean
     isFullscreen: boolean
     values: string
     language: 'xml' | 'css' | 'javascript'
}

export const EditorContainer: FC<EditorPropsType> = memo(({ title, isFullscreen, values, id, language, isExpanded }) => {

     const dispatch = useAppDispatch()
     const appMode = useAppSelector(state => state.appMode)
   
     const complexClassName = appMode === 'row' ? 'asrow' : 'def'


     const onClearEditorCache = useCallback(() => {
          dispatch(onClearCache())
     }, [])

     const exitFullScreenbyEscape = (e: KeyboardEvent) => {

          if (e.key === 'Escape') {
               dispatch(onChangeEditorFullScreen({ id, isFullscreen: false }))
          }
     }

     const setOpenEditor = useCallback((id: string) => {
          return () => {
               dispatch(onChangeExpansion({ id }))
          }
     }, [id])

     const onChangeScreen = useCallback(() => {
          dispatch(onChangeEditorFullScreen({ id, isFullscreen: true }))
     }, [isFullscreen])

     const onChangeValues = useCallback((values: string) => {

          dispatch(onChangeEditorValues({ id, value: values }))

     }, [values])

     useEffect(() => {
          console.log(appMode);
          
          let root = document.querySelector('.root')as HTMLElement
          if(appMode === 'row'){
               root?.setAttribute('class', 'asrow root')
          }
          else{
               root?.setAttribute('class', 'root')
          }


     }, [appMode])

     useEffect(() => {
          if (isFullscreen) {
               window.addEventListener('keydown', exitFullScreenbyEscape)
          }


          return () => {
               window.removeEventListener('keydown', exitFullScreenbyEscape)
          }
     }, [isFullscreen])


     const evalAppModeStyleToggle = () => {

          switch(appMode){
               case 'column':
                    return `${isExpanded ? '' : 'collapsed'}`
               case "row": {
                    return `${isExpanded ? '' : 'row-editor-active'}`
               }
          }
     }

     return (
          <div className={`${complexClassName} editor-container ${evalAppModeStyleToggle()}`}>
               <div className={`${complexClassName} editor-title`}>
                    <p>{title}</p>


                    <PanelControls
                         isExpanded={isExpanded}
                         isFullscreen={isFullscreen}
                         onChangeScreen={onChangeScreen}
                         id={id}
                         onClearEditorCache={onClearEditorCache}
                         setOpenEditor={setOpenEditor}

                    />

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
})


