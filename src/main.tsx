import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(
    document.getElementById('root')!).render(
    <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
    </Provider>
)
