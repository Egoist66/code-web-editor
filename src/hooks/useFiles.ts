import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { onChangeEditorValues } from '../store/slices/editor-top-panel';

export const useFiles = () => {

     const [fileData, setFileData] = useState<string>('')
     const [error, setError] = useState<boolean>(false)
     const [isLoading, setLoading] = useState<boolean>(false)
     
     const dispatch = useAppDispatch()

     const uploadFile = (e: ChangeEvent<HTMLInputElement>, id: string, delay: number) => {
          if (e.currentTarget.files) {
               const file = e?.currentTarget?.files[0]

               const reader = new FileReader()
               reader.readAsText(file)

               reader.addEventListener('load', () => {

                    setLoading(true)
                    setError(false)
                    const data = reader?.result

                    if (typeof data === "string") {
                         const timer = setTimeout(() => {
                              try {
                                   setFileData(data)
                                   dispatch(onChangeEditorValues({id, value: data}))
                              }
                              catch (e) {
                                   setError(true)
                              }
                              finally {
                                   setLoading(false)
                              }

                              clearTimeout(timer)

                         }, delay)
                    }
               })

          }



     }


     return {
          fileData,
          isLoading,
          error,
          uploadFile
     }
}