import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provides the state to every component in Beshilo Mall  */}
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
);

