declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}
declare module '*.module.sass' {
  const classes: Record<string, string>;
  export default classes;
}
