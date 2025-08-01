import type { Components, JSX } from "../types/components";

interface ScSwap extends Components.ScSwap, HTMLElement {}
export const ScSwap: {
    prototype: ScSwap;
    new (): ScSwap;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
