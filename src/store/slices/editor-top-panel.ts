import { createSlice } from "@reduxjs/toolkit";
import { ChangeExpansionAction, onChangeEditorValueAction } from '../actions/actions';

export type EditorsElements = {
     id: string,
     title: string,
     values: string,
     isExpanded: boolean
     language: 'xml' | 'css' | 'javascript'
}

export type EditorsPanel = {
     editors: Array<EditorsElements>
}

const initialState: EditorsPanel = {
     editors: [
          { id: '1', language: 'xml', title: 'HTML', isExpanded: true, values: '' },
          { id: '2', language: 'css', title: 'CSS', isExpanded: true, values: '' },
          { id: '3', language: 'javascript', title: 'JS', isExpanded: true, values: '' },
     ]
}

const EditorTopPanelSlice = createSlice({
     name: 'editorTopPanel',
     initialState,
     reducers: {
          onChangeExpansion(state: EditorsPanel, action: ChangeExpansionAction) {
               state.editors = state.editors.map(e => e.id === action.payload.id ? { ...e, isExpanded: !e.isExpanded } : e)
          },

          onChangeEditorValues(state: EditorsPanel, action: onChangeEditorValueAction) {

               state.editors = state.editors.map(e => e.id === action.payload.id ? { ...e, values: action.payload.value } : e)
          }
     },

})

export const { onChangeExpansion, onChangeEditorValues } = EditorTopPanelSlice.actions
export default EditorTopPanelSlice.reducer

