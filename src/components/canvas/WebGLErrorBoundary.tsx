'use client';

import React, { Component, ReactNode } from 'react';
import FallbackHero2D from './FallbackHero2D';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[WebGL] Error boundary fallback activated:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackHero2D />;
    }
    return this.props.children;
  }
}
