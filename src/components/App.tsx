import { FC, memo } from "react"
import { TopPanelContainer } from "./TopPanel"
import { OutPutPanel } from "./OutPutPanel"
import { EditorBar } from "./EditorBar"

export const App: FC = memo(() => {

  return (
    <>
    
      <TopPanelContainer/>
      <EditorBar />
      <OutPutPanel />

    </>
  )
})


