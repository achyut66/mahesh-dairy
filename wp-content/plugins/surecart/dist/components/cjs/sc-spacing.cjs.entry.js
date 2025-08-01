'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scSpacingCss = ":host{display:block}::slotted(*:not(:last-child)){margin-bottom:var(--spacing)}";
const ScSpacingStyle0 = scSpacingCss;

const ScSpacing = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: '73cf535884173984b05b84c86040ca0c985b76ba' }, index.h("slot", { key: 'aa705ad61264b862ad554f7b24ff5fec4e67cbad' })));
    }
};
ScSpacing.style = ScSpacingStyle0;

exports.sc_spacing = ScSpacing;

//# sourceMappingURL=sc-spacing.cjs.entry.js.map