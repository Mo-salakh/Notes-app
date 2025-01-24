import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../firebase.ts'
import './shared/styles/global.css'
import App from './App.tsx'
import { AuthContextProvider } from './app/provider/store/AuthContext.tsx'
import { ErrorBoundary } from './app/init/ErrorBoundary.tsx'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from './app/provider/store/NotesContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <NotesProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </NotesProvider>
    </AuthContextProvider>
  </StrictMode>
)
