import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { Provider } from "react-redux";
import { appStore } from './app/store.ts';

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  // </React.StrictMode>,
)
