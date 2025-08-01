'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scMenuDividerCss = ":host{display:block}.menu-divider{border-top:solid 1px var(--sc-panel-border-color);margin:var(--sc-spacing-x-small) 0}";
const ScMenuDividerStyle0 = scMenuDividerCss;

const ScMenuDivider = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("div", { key: '84d4a897ccb99d0eb11634e0c595f35bc93b1ae3', part: "base", class: "menu-divider", role: "separator", "aria-hidden": "true" });
    }
};
ScMenuDivider.style = ScMenuDividerStyle0;

exports.sc_menu_divider = ScMenuDivider;

//# sourceMappingURL=sc-menu-divider.cjs.entry.js.map