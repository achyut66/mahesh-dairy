import { r as registerInstance, h, H as Host } from './index-745b6bec.js';
import { s as state } from './watchers-fbf07f32.js';
import './watchers-91c4d57e.js';
import { s as state$1 } from './store-4bc13420.js';
import './index-06061d4e.js';
import './google-dd89f242.js';
import './currency-a0c9bff4.js';
import './google-a86aa761.js';
import './utils-cd1431df.js';
import './util-50af2a83.js';
import './index-c5a96d53.js';
import './getters-1899e179.js';
import './mutations-5702cb96.js';
import './fetch-8ecbbe53.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './mutations-ed6d0770.js';

const scProductPriceCss = ":host{display:block}";
const ScProductPriceStyle0 = scProductPriceCss;

const ScProductPrice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.prices = undefined;
        this.saleText = undefined;
        this.productId = undefined;
    }
    renderRange() {
        var _a;
        return (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.range_display_amount;
    }
    renderVariantPrice(selectedVariant) {
        var _a, _b;
        const variant = (_b = (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.find(variant => (variant === null || variant === void 0 ? void 0 : variant.id) === (selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id));
        return this.renderPrice(state[this.productId].selectedPrice, variant);
    }
    renderPrice(price, variant = null) {
        var _a, _b, _c, _d, _e, _f;
        const originalAmount = (_b = (_a = variant === null || variant === void 0 ? void 0 : variant.display_amount) !== null && _a !== void 0 ? _a : price === null || price === void 0 ? void 0 : price.display_amount) !== null && _b !== void 0 ? _b : '';
        // maybe change for upsells.
        const amount = ((_c = state$1 === null || state$1 === void 0 ? void 0 : state$1.line_item) === null || _c === void 0 ? void 0 : _c.total_amount) || (price === null || price === void 0 ? void 0 : price.amount);
        const upsellDisplayAmount = (_d = state$1 === null || state$1 === void 0 ? void 0 : state$1.line_item) === null || _d === void 0 ? void 0 : _d.total_display_amount;
        const displayAmount = upsellDisplayAmount ? upsellDisplayAmount : originalAmount;
        const scratchAmount = ((_e = state$1 === null || state$1 === void 0 ? void 0 : state$1.line_item) === null || _e === void 0 ? void 0 : _e.scratch_amount) || (price === null || price === void 0 ? void 0 : price.scratch_amount);
        const upsellScratchDisplayAmount = (_f = state$1 === null || state$1 === void 0 ? void 0 : state$1.line_item) === null || _f === void 0 ? void 0 : _f.subtotal_display_amount;
        const scratchDisplayAmount = upsellScratchDisplayAmount ? upsellScratchDisplayAmount : price === null || price === void 0 ? void 0 : price.scratch_display_amount;
        return (h("sc-price", { currency: price === null || price === void 0 ? void 0 : price.currency, amount: amount, displayAmount: displayAmount, scratchAmount: scratchAmount, scratchDisplayAmount: scratchDisplayAmount, saleText: this.saleText, adHoc: price === null || price === void 0 ? void 0 : price.ad_hoc, trialDurationDays: price === null || price === void 0 ? void 0 : price.trial_duration_days, setupFeeText: price === null || price === void 0 ? void 0 : price.setup_fee_text, setupFeeAmount: (price === null || price === void 0 ? void 0 : price.setup_fee_enabled) ? price === null || price === void 0 ? void 0 : price.setup_fee_amount : null, setupFeeName: (price === null || price === void 0 ? void 0 : price.setup_fee_enabled) ? price === null || price === void 0 ? void 0 : price.setup_fee_name : null, recurringPeriodCount: price === null || price === void 0 ? void 0 : price.recurring_period_count, recurringInterval: price === null || price === void 0 ? void 0 : price.recurring_interval, recurringIntervalCount: price === null || price === void 0 ? void 0 : price.recurring_interval_count }));
    }
    render() {
        return (h(Host, { key: 'f1c5923c5326ae9eb5521b350c9c1ba9ea3a5b99', role: "paragraph" }, (() => {
            var _a, _b, _c, _d, _e;
            if ((_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.selectedVariant) {
                return this.renderVariantPrice((_b = state[this.productId]) === null || _b === void 0 ? void 0 : _b.selectedVariant);
            }
            if ((_c = state[this.productId]) === null || _c === void 0 ? void 0 : _c.selectedPrice) {
                return this.renderPrice(state[this.productId].selectedPrice);
            }
            if ((_e = (_d = state[this.productId]) === null || _d === void 0 ? void 0 : _d.prices) === null || _e === void 0 ? void 0 : _e.length) {
                return this.renderRange();
            }
            return h("slot", null);
        })()));
    }
};
ScProductPrice.style = ScProductPriceStyle0;

export { ScProductPrice as sc_product_price };

//# sourceMappingURL=sc-product-price.entry.js.map