import type * as React from "react";

declare global {
  namespace JSX {
    // Allow standard React element return types
    type Element = React.ReactElement<any, any> | null;
    // Loosen intrinsic elements to unblock JSX resolution
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
