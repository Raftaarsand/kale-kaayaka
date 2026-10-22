import { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

type BoundaryState = { failed: boolean }

class AppErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="mx-auto max-w-lg px-4 py-16">
          <h1 className="font-display text-4xl">Kale Kaayaka</h1>
          <p className="mt-3 text-muted">
            The demo hit a problem in this browser. You can clear the saved demo data and start again.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-4 font-semibold text-primary-foreground"
            onClick={() => {
              localStorage.clear()
              sessionStorage.clear()
              window.location.assign('/')
            }}
          >
            Reset local demo data
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </StrictMode>,
  )
}
