import { r as registerInstance, h, H as Host } from './index-745b6bec.js';
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

const scLineItemBumpCss = ":host{display:block}";
const ScLineItemBumpStyle0 = scLineItemBumpCss;

const ScLineItemBump = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = undefined;
        this.loading = undefined;
    }
    render() {
        var _a, _b;
        if (!((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.bump_amount)) {
            return h(Host, { style: { display: 'none' } });
        }
        return (h("sc-line-item", null, h("span", { slot: "description" }, this.label || wp.i18n.__('Bundle Discount', 'surecart')), h("span", { slot: "price" }, (_b = state === null || state === void 0 ? void 0 : state.checkout) === null || _b === void 0 ? void 0 : _b.bump_display_amount)));
    }
};
ScLineItemBump.style = ScLineItemBumpStyle0;

export { ScLineItemBump as sc_line_item_bump };

//# sourceMappingURL=sc-line-item-bump.entry.js.map