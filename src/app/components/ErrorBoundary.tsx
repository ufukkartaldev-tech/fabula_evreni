'use client';

import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Log to analytics if available
        if (typeof window !== 'undefined') {
            try {
                const { trackEvent } = require('@/lib/analytics');
                trackEvent('error', {
                    error_message: error.message,
                    error_stack: error.stack,
                    component_stack: errorInfo.componentStack
                });
            } catch (e) {
                console.error('Failed to log error to analytics:', e);
            }
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary">
                    <div className="error-content">
                        <h1>⚠️ Bir Hata Oluştu</h1>
                        <p>Üzgünüz, bir şeyler ters gitti. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
                        {this.state.error && (
                            <details className="error-details">
                                <summary>Hata Detayları</summary>
                                <pre>{this.state.error.message}</pre>
                            </details>
                        )}
                        <div className="error-actions">
                            <button onClick={this.handleReset} className="reset-button">
                                Tekrar Dene
                            </button>
                            <button onClick={() => window.location.href = '/'} className="home-button">
                                Ana Sayfaya Dön
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
