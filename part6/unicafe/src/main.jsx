import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import reducer from './reducer'

const store = configureStore({ reducer: reducer })

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
