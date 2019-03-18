import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store/store'

// container for the whole application
import App from 'containers/App'

// common styles
import 'styles/main.scss'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
