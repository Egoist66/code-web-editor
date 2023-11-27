import { ChangeEvent, RefObject, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { onChangeEditorValues } from '../store/slices/editor-top-panel';

export const useFiles = (ref: RefObject<HTMLInputElement>) => {

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
                              catch (error) {
                                   setError(true)
                                   console.log(error);
                                   ref.current?.value
                                   

                              }
                              finally {
                                   setLoading(false)
                                   if(ref.current){
                                        ref.current.value = ''
                                   }



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