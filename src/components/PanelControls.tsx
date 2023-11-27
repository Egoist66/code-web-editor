import { FC, memo, useRef } from "react";
import { useFiles } from "../hooks/useFiles";


type PanelControlsProps = {
     id: string
     setOpenEditor: (id: string) => () => void
     isExpanded: boolean
     isFullscreen: boolean
     onChangeScreen: () => void
     onClearEditorCache: () => void

}

export const PanelControls: FC<PanelControlsProps> = memo(({ id, onClearEditorCache, onChangeScreen, isFullscreen, isExpanded, setOpenEditor }) => {

     const fileRef = useRef<HTMLInputElement>(null)
     const { error, isLoading, uploadFile } = useFiles()

     const watchUploading = () => {
          if(isLoading){
               return 'Loading...'
          }
          else if(error){
               return 'Error while upload!'
          }
          else {
               return 'Upload file'
          }
     }

     const acceptFile = () => {
          if (id === "1") {
               return "text/html"
          }
          else if (id === "2") {
               return "text/css"
          }
          else {
               return "text/javascript"
          }
     }

     const triggerUpload = () => {
          if (fileRef.current) {
               fileRef.current.click()
          }
     }


     return (

          <div className="controls-panel">
               <input
                    ref={fileRef}
                    hidden
                    type="file"
                    onChange={(e) => uploadFile(e, id, 1000)}
                    accept={acceptFile()}
                    name="file"
                    id="file"
               />

               <button
                    style={{ borderColor: 'orange', color: 'orange' }}
                    onClick={triggerUpload}
               >
                    {watchUploading()}
               </button>

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
                    Clear cache
               </button> : null}
          </div>
     )
})