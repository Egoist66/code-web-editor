import { FC, memo } from "react"
import { TopPanelContainer } from "./TopPanel"
import { OutPutPanel } from "./OutPutPanel"

export const App: FC = memo(() => {

  return (
    <>
    
      <TopPanelContainer/>
      <OutPutPanel />

    </>
  )
})


