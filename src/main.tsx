import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import ResponsiveLayout from './ResponsiveLayout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <ResponsiveLayout domElements={[]} containerPadding={[12,12]} >
    <div
        key={"sad"}
        style={{ background: "#ccc" }}
        // data-grid={}
        // className={l.static ? "static" : ""}
      >
        <span className="text">{1}</span>
      </div>
    </ResponsiveLayout>
  </React.StrictMode>,
)
