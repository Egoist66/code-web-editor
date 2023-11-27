import { combineReducers } from "@reduxjs/toolkit";
import EditorTopPanelSliceReducer from "../slices/editor-top-panel";

export const rootReducer = combineReducers({
     editorTop: EditorTopPanelSliceReducer
})