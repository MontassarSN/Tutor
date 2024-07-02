// src/custom.d.ts

// Declare module for .png files
declare module '*.png' {
    const value: string; // Specifies that the imported value is a string (URL or base64)
    export default value; // Exports the value as default
}

// Declare module for .jpg files
declare module '*.jpg' {
    const value: string; // Specifies that the imported value is a string (URL or base64)
    export default value; // Exports the value as default
}
