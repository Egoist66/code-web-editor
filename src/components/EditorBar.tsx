import { FC, memo, useEffect, useState } from "react";
import { Portal } from "../service-components/Portal";
import { useAppDispatch } from "../store/store";
import { onChangeAppViewMode } from "../store/slices/editor-top-panel";

export const EditorBar: FC = memo(() => {

     const [isOpenBar, setOpenBar] = useState<boolean>(false)
     const [isModeOn, setModeOn] = useState<boolean>(false)
     const dispatch = useAppDispatch()


     const toggleBar = (e: KeyboardEvent) => {
          if (e.key === 'B' || e.key === 'b') {
               setOpenBar(isOpenBar => !isOpenBar)
          }
          else {
               console.log(false);

          }
     }

   

     useEffect(() => {

          dispatch(onChangeAppViewMode({appMode: isModeOn}))
          
          
     }, [isModeOn])

     useEffect(() => {
          window.addEventListener('keydown', toggleBar)

          return () => {
               window.removeEventListener('keydown', toggleBar)
          }
     }, [isOpenBar])

     return (
          <>

               <Portal>
                    <div className={isOpenBar ? 'open editor-bar' : 'editor-bar'}>
                         <div className="editor-bar-controls">

                              <button
                                   onClick={() => setModeOn(isModeOn => !isModeOn)}
                                   className="editor-bar-btn"
                              >
                                   Toggle view mode
                              </button>
                         </div>

                    </div>

               </Portal>


               <Portal>
                    <button 
                    onClick={() => setOpenBar(isOpenBar => !isOpenBar)} 
                    className="float-btn">{isOpenBar ? 'Close' : 'Open'}
                    </button>
               </Portal>


          </>
     )
})