import { FC, memo } from "react";
import { EditorsElements } from "../store/slices/editor-top-panel";
import { useAppSelector } from "../store/store";
import { EditorContainer } from "./Editor";

type TopPanelViewProps = {
     editors: EditorsElements[]
     appMode: 'column' | 'row'
}

export const TopPanelContainer: FC = memo(() => {
     const  editors = useAppSelector(state => state.editors)
     const appMode = useAppSelector(state => state.appMode)
   



     return (

          <TopPanelView appMode={appMode} editors={editors} />
     )
})








const TopPanelView: FC<TopPanelViewProps> = memo(({ editors, appMode }) => {

     const complexClassName = appMode === 'row' ? 'asrow' : 'def'


     return (
          <div className={`${complexClassName} pane top-pane`}>

               {editors.map(e => (


                    <EditorContainer
                         key={e.id}
                         language={e.language}
                         isFullscreen={e.isFullScreen}
                         values={e.values}
                         id={e.id}
                         isExpanded={e.isExpanded}
                         title={e.title}

                    />

               ))}

          </div>
     )
})