import { r as registerInstance, h } from './index-745b6bec.js';

const scEmptyCss = ":host{display:block}.empty{display:flex;flex-direction:column;align-items:center;padding:var(--sc-spacing-large);text-align:center;gap:var(--sc-spacing-small);color:var(--sc-empty-color, var(--sc-color-gray-500))}.empty sc-icon{font-size:var(--sc-font-size-xx-large);color:var(--sc-empty-icon-color, var(--sc-color-gray-700))}";
const ScEmptyStyle0 = scEmptyCss;

const ScEmpty = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icon = undefined;
    }
    render() {
        return (h("div", { key: '5b34b35d37989e57bc48015052e4da0fd6ed9c9e', part: "base", class: "empty" }, !!this.icon && h("sc-icon", { key: '3545085dcf5ca46169d147f3ed48f20320d72490', exportparts: "base:icon", name: this.icon }), h("slot", { key: '25ff1dde75e2e0b9f90b947ec717781de3f4fdb7' })));
    }
};
ScEmpty.style = ScEmptyStyle0;

export { ScEmpty as sc_empty };

//# sourceMappingURL=sc-empty.entry.js.map