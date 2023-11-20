import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import AltApp from './AltApp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <AltApp domElements={[]} containerPadding={[12, 12]} />
  </React.StrictMode>,
)
