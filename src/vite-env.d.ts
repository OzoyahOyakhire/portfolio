/// <reference types="vite/client" />

declare module "*.PNG" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: any;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}
