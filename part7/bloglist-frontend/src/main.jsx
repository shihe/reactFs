import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import setupStore from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={setupStore()}>
    <Router>
      <App />
    </Router>
  </Provider>
)
