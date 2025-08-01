'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const mutations = require('./mutations-10a18c83.js');
require('./index-bcdafe6e.js');
require('./utils-2e91d46c.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-59d23803.js');
require('./currency-71fce0f0.js');
require('./store-4a539aea.js');
require('./price-5b1afcfe.js');

const scTotalCss = ":host{display:block}.total-amount{display:inline-block}";
const ScTotalStyle0 = scTotalCss;

const ORDER_KEYS = {
    total: 'total_display_amount',
    subtotal: 'subtotal_display_amount',
    amount_due: 'amount_due_display_amount',
};
const ScTotal = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.order_key = {
            total: 'total_display_amount',
            subtotal: 'subtotal_display_amount',
            amount_due: 'amount_due_display_amount',
        };
        this.total = 'amount_due';
    }
    render() {
        var _a, _b, _c, _d, _e;
        if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.currency))
            return;
        if (!((_d = (_c = (_b = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.line_items) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length))
            return;
        return ((_e = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _e === void 0 ? void 0 : _e[ORDER_KEYS[this.total]]) || '';
    }
};
ScTotal.style = ScTotalStyle0;

exports.sc_total = ScTotal;

//# sourceMappingURL=sc-total.cjs.entry.js.map