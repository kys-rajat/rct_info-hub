import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Something went wrong' }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5">
          <h1 className="text-danger">Application Error</h1>
          <p>{this.state.message}</p>
          <p>Please try refreshing or contact support.</p>
        </div>
      )
    }

    return this.props.children
  }
} 