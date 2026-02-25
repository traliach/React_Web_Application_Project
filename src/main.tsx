import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'

// Start app at root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Give Redux to app */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
