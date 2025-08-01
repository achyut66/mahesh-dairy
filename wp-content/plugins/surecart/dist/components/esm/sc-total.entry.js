import { r as registerInstance } from './index-745b6bec.js';
import { s as state } from './mutations-6bbbe793.js';
import './index-06061d4e.js';
import './utils-cd1431df.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-a86aa761.js';
import './currency-a0c9bff4.js';
import './store-627acec4.js';
import './price-af9f0dbf.js';

const scTotalCss = ":host{display:block}.total-amount{display:inline-block}";
const ScTotalStyle0 = scTotalCss;

const ORDER_KEYS = {
    total: 'total_display_amount',
    subtotal: 'subtotal_display_amount',
    amount_due: 'amount_due_display_amount',
};
const ScTotal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.order_key = {
            total: 'total_display_amount',
            subtotal: 'subtotal_display_amount',
            amount_due: 'amount_due_display_amount',
        };
        this.total = 'amount_due';
    }
    render() {
        var _a, _b, _c, _d, _e;
        if (!((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.currency))
            return;
        if (!((_d = (_c = (_b = state === null || state === void 0 ? void 0 : state.checkout) === null || _b === void 0 ? void 0 : _b.line_items) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length))
            return;
        return ((_e = state === null || state === void 0 ? void 0 : state.checkout) === null || _e === void 0 ? void 0 : _e[ORDER_KEYS[this.total]]) || '';
    }
};
ScTotal.style = ScTotalStyle0;

export { ScTotal as sc_total };

//# sourceMappingURL=sc-total.entry.js.map