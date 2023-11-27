import { FC } from "react";
import { EditorsElements } from "../store/slices/editor-top-panel";
import { useAppSelector } from "../store/store";
import { EditorContainer } from "./Editor";

type TopPanelViewProps = {
     editors: EditorsElements[]
}

export const TopPanelContainer: FC = () => {
     const  editors = useAppSelector(state => state.editors)


     return (

          <TopPanelView editors={editors} />
     )
}








const TopPanelView: FC<TopPanelViewProps> = ({ editors }) => {
          

     return (
          <div className="pane top-pane">

               {editors.map(e => (


                    <EditorContainer
                         key={e.id}
                         language={e.language}
                         values={e.values}
                         id={e.id}
                         isExpanded={e.isExpanded}
                         title={e.title}

                    />

               ))}

          </div>
     )
}