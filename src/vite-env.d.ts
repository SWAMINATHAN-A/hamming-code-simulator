/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.woff' {
  const content: string
  export default content
}

declare module '*.woff2' {
  const content: string
  export default content
}

declare module '*.eot' {
  const content: string
  export default content
}

declare module '*.ttf' {
  const content: string
  export default content
}

declare module '*.otf' {
  const content: string
  export default content
}

declare module '*.mp4' {
  const content: string
  export default content
}

declare module '*.webm' {
  const content: string
  export default content
}

declare module '*.wav' {
  const content: string
  export default content
}

declare module '*.mp3' {
  const content: string
  export default content
}

declare module '*.m4a' {
  const content: string
  export default content
}

declare module '*.aac' {
  const content: string
  export default content
}

declare module '*.oga' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.sass' {
  const content: string
  export default content
}

declare module '*.less' {
  const content: string
  export default content
}

declare module '*.styl' {
  const content: string
  export default content
}

declare module '*.stylus' {
  const content: string
  export default content
}

declare module '*.json' {
  const content: any
  export default content
}

// React type definitions
declare namespace React {
  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  // Add other React hooks as needed
}

// JSX namespace for React
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
