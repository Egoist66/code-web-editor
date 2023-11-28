export type ChangeExpansionAction = {
     payload: {
          id: string
     }
}

export type onChangeEditorValueAction = {
     payload: {
          id: string,
          value: string
     }
}

export type onChangeEditorScrenAction = {
     payload: {
          id: string,
          isFullscreen: boolean
     }
}

export type onChangeAppView = {
     payload: {
          appMode: boolean
     }
}