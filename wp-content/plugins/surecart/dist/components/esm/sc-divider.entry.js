import { r as registerInstance, h } from './index-745b6bec.js';

const scDividerCss = ":host{display:block;min-height:1px}.divider{position:relative;padding:var(--spacing) 0}.line__container{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center}.line{width:100%;border-top:1px solid var(--sc-divider-border-top-color, var(--sc-color-gray-200))}.text__container{position:relative;display:flex;justify-content:center;font-size:var(--sc-font-size-small)}.text{padding:0 var(--sc-spacing-small);background:var(--sc-divider-text-background-color, var(--sc-color-white));color:var(--sc-color-gray-500)}";
const ScDividerStyle0 = scDividerCss;

const ScDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { key: 'b471253c1892c94c8ab530bb7d816dbb49a807e0', class: "divider", part: "base" }, h("div", { key: 'bb6c0f573120246693adbc9439b9d5b57e8e8f2d', class: "line__container", "aria-hidden": "true", part: "line-container" }, h("div", { key: '4d64c37d28041e3fcaf6d1f8c6dce7a5a5fc8b10', class: "line", part: "line" })), h("div", { key: '57a30214b8861512c14ba4760f67d200080f37af', class: "text__container", part: "text-container" }, h("span", { key: 'bc0da08d9bb5470e3399d81d3aaf577b7b4dd219', class: "text", part: "text" }, h("slot", { key: '2ea224b149cb83882d09e25aeb80b5c785e613b6' })))));
    }
};
ScDivider.style = ScDividerStyle0;

export { ScDivider as sc_divider };

//# sourceMappingURL=sc-divider.entry.js.map