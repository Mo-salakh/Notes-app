import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../../firebase.ts'
import '../shared/styles/global.css'
import App from './App.tsx'
import { AuthContextProvider } from './provider/store/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from './provider/store/NotesContext.tsx'


if(navigator.serviceWorker) {
  navigator.serviceWorker
  .register('../public/sw.js')
  .then(() => console.log('Serwice Worker has been registrated'))
  .catch(() => console.error('Ошибка регистрации Service Worker'))
}

const ErrorBoundary = lazy(() => import('./init/ErrorBoundary.tsx').then(module => ({ default: module.ErrorBoundary })))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <NotesProvider>
        <Suspense fallback={'Загрузка...'}>
          <ErrorBoundary>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </NotesProvider>
    </AuthContextProvider>
  </StrictMode>
)
