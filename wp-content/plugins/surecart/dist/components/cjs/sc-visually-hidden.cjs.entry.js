'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scVisuallyHiddenCss = ":host(:not(:focus-within)){position:absolute !important;width:1px !important;height:1px !important;clip:rect(0 0 0 0) !important;clip-path:inset(50%) !important;border:none !important;overflow:hidden !important;white-space:nowrap !important;padding:0 !important}";
const ScVisuallyHiddenStyle0 = scVisuallyHiddenCss;

const ScVisuallyHidden = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("slot", { key: '34e8f61a6ff897885e95edf3ae8e60aedd1eba7d' });
    }
};
ScVisuallyHidden.style = ScVisuallyHiddenStyle0;

exports.sc_visually_hidden = ScVisuallyHidden;

//# sourceMappingURL=sc-visually-hidden.cjs.entry.js.map