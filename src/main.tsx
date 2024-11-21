import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Đảm bảo đường dẫn đúng đến store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>  {/* Đảm bảo bao quanh App bằng Provider */}
      <App />
    </Provider>
  </StrictMode>
);
