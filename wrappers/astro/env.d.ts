/// <reference types="astro/client" />

declare module "*.astro" {
  const Component: (props: Record<string, unknown>) => unknown;

  export default Component;
}
