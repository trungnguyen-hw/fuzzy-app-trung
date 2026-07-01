import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function MainRoot() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      const registerSW = () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('SW Registered:', reg.scope))
          .catch(err => console.log('SW Registration failed:', err));
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <StrictMode>
      {isOffline && (
        <div className="bg-danger text-white text-center py-2 fixed-top z-3" style={{ fontSize: '13px', zIndex: 9999 }}>
          ⚠️ Không có kết nối mạng (Bạn đang ở chế độ Offline)
        </div>
      )}
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<MainRoot />);
