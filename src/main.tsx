import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'

// Mount app into the HTML root div
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Give all components access to Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
