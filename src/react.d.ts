declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  import * as React from 'react';
  export * from 'react/jsx-runtime';
  export { default } from 'react/jsx-runtime';
}
