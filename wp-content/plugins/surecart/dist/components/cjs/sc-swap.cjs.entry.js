'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const mutations = require('./mutations-10a18c83.js');
const index$1 = require('./index-9cef574e.js');
const mutations$1 = require('./mutations-11c8f9a8.js');
require('./index-bcdafe6e.js');
require('./utils-2e91d46c.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-59d23803.js');
require('./currency-71fce0f0.js');
require('./store-4a539aea.js');
require('./price-5b1afcfe.js');
require('./fetch-d644cebd.js');

const scSwapCss = ".swap{display:flex;align-items:baseline;justify-content:space-between}.swap__price{color:var(--sc-swap-price-color, var(--sc-input-label-color));line-height:var(--sc-line-height-dense);font-size:var(--sc-font-size-small);white-space:nowrap}";
const ScSwapStyle0 = scSwapCss;

const ScSwap = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.lineItem = undefined;
    }
    async onSwapToggleChange(e) {
        var _a;
        try {
            mutations.updateFormState('FETCH');
            mutations.state.checkout = await index$1.toggleSwap({ id: (_a = this.lineItem) === null || _a === void 0 ? void 0 : _a.id, action: e.target.checked ? 'swap' : 'unswap' });
            mutations.updateFormState('RESOLVE');
        }
        catch (e) {
            mutations.updateFormState('REJECT');
            mutations$1.createErrorNotice(e.message);
            console.error(e);
        }
    }
    render() {
        var _a, _b, _c, _d, _e;
        if (!((_a = this === null || this === void 0 ? void 0 : this.lineItem) === null || _a === void 0 ? void 0 : _a.is_swappable)) {
            return null;
        }
        const swap = ((_b = this === null || this === void 0 ? void 0 : this.lineItem) === null || _b === void 0 ? void 0 : _b.swap) || ((_d = (_c = this === null || this === void 0 ? void 0 : this.lineItem) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.current_swap);
        const price = (swap === null || swap === void 0 ? void 0 : swap.swap_price) || this.lineItem.price;
        return (index.h("div", { class: "swap" }, index.h("sc-switch", { checked: !!((_e = this === null || this === void 0 ? void 0 : this.lineItem) === null || _e === void 0 ? void 0 : _e.swap), onScChange: e => this.onSwapToggleChange(e) }, swap === null || swap === void 0 ? void 0 : swap.description), !!(price === null || price === void 0 ? void 0 : price.display_amount) && (index.h("div", { class: "swap__price" }, price === null || price === void 0 ? void 0 :
            price.display_amount, " ", price === null || price === void 0 ? void 0 :
            price.short_interval_text, " ", price === null || price === void 0 ? void 0 :
            price.short_interval_count_text))));
    }
};
ScSwap.style = ScSwapStyle0;

exports.sc_swap = ScSwap;

//# sourceMappingURL=sc-swap.cjs.entry.js.map