'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const ScPremiumTag = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.size = 'small';
    }
    render() {
        return (index.h("sc-tag", { key: 'bacddf51f1060703cada2cf57f4178d8eaf6042d', type: "success", size: this.size }, wp.i18n.__('Premium', 'surecart')));
    }
};

exports.sc_premium_tag = ScPremiumTag;

//# sourceMappingURL=sc-premium-tag.cjs.entry.js.map