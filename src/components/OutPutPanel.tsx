import { FC, memo, useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

export const OutPutPanel: FC = memo(() => {
     const editors = useAppSelector(state => state.editors)
     const [srcDocValue, setSrcDoc] = useState<string>('')

     const html = editors[0].values
     const css = editors[1].values
     const js = editors[2].values


          useEffect(() => {
               const timer = setTimeout(() => {
                    setSrcDoc(`
               <html style="font-size: 16px; font-family: 'Arial'">
               
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
               
               </html>
          `.trim())
               }, 1000)

               return () => clearTimeout(timer)
               

          }, [html, css, js])

     return (
          <div className="pane">

               <iframe
                    srcDoc={srcDocValue}
                    title="output"
                    frameBorder="0"
                    sandbox="allow-scripts"
                    width={'100%'}
                    height={'100%'}

               >

               </iframe>
          </div>
     )
})