import type {
    // ComponentRenderProxy,
    VNode,
    VNodeChild,
    ComponentPublicInstance,
    FunctionalComponent,
    PropType as VuePropType,
  } from 'vue';
  

declare module 'vue' {
    export type JSXComponent<Props = any> =
      | { new (): ComponentPublicInstance<Props> }
      | FunctionalComponent<Props>;
  }
  