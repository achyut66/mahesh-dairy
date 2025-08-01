'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const watchers = require('./watchers-db03ec4e.js');
require('./watchers-4a82a9b2.js');
const store = require('./store-ce062aec.js');
require('./index-bcdafe6e.js');
require('./google-03835677.js');
require('./currency-71fce0f0.js');
require('./google-59d23803.js');
require('./utils-2e91d46c.js');
require('./util-b877b2bd.js');
require('./index-fb76df07.js');
require('./getters-a0ce2d19.js');
require('./mutations-ac3b22d5.js');
require('./fetch-d644cebd.js');
require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./mutations-11c8f9a8.js');

const scProductPriceCss = ":host{display:block}";
const ScProductPriceStyle0 = scProductPriceCss;

const ScProductPrice = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.prices = undefined;
        this.saleText = undefined;
        this.productId = undefined;
    }
    renderRange() {
        var _a;
        return (_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.range_display_amount;
    }
    renderVariantPrice(selectedVariant) {
        var _a, _b;
        const variant = (_b = (_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.find(variant => (variant === null || variant === void 0 ? void 0 : variant.id) === (selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id));
        return this.renderPrice(watchers.state[this.productId].selectedPrice, variant);
    }
    renderPrice(price, variant = null) {
        var _a, _b, _c, _d, _e, _f;
        const originalAmount = (_b = (_a = variant === null || variant === void 0 ? void 0 : variant.display_amount) !== null && _a !== void 0 ? _a : price === null || price === void 0 ? void 0 : price.display_amount) !== null && _b !== void 0 ? _b : '';
        // maybe change for upsells.
        const amount = ((_c = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _c === void 0 ? void 0 : _c.total_amount) || (price === null || price === void 0 ? void 0 : price.amount);
        const upsellDisplayAmount = (_d = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _d === void 0 ? void 0 : _d.total_display_amount;
        const displayAmount = upsellDisplayAmount ? upsellDisplayAmount : originalAmount;
        const scratchAmount = ((_e = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _e === void 0 ? void 0 : _e.scratch_amount) || (price === null || price === void 0 ? void 0 : price.scratch_amount);
        const upsellScratchDisplayAmount = (_f = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _f === void 0 ? void 0 : _f.subtotal_display_amount;
        const scratchDisplayAmount = upsellScratchDisplayAmount ? upsellScratchDisplayAmount : price === null || price === void 0 ? void 0 : price.scratch_display_amount;
        return (index.h("sc-price", { currency: price === null || price === void 0 ? void 0 : price.currency, amount: amount, displayAmount: displayAmount, scratchAmount: scratchAmount, scratchDisplayAmount: scratchDisplayAmount, saleText: this.saleText, adHoc: price === null || price === void 0 ? void 0 : price.ad_hoc, trialDurationDays: price === null || price === void 0 ? void 0 : price.trial_duration_days, setupFeeText: price === null || price === void 0 ? void 0 : price.setup_fee_text, setupFeeAmount: (price === null || price === void 0 ? void 0 : price.setup_fee_enabled) ? price === null || price === void 0 ? void 0 : price.setup_fee_amount : null, setupFeeName: (price === null || price === void 0 ? void 0 : price.setup_fee_enabled) ? price === null || price === void 0 ? void 0 : price.setup_fee_name : null, recurringPeriodCount: price === null || price === void 0 ? void 0 : price.recurring_period_count, recurringInterval: price === null || price === void 0 ? void 0 : price.recurring_interval, recurringIntervalCount: price === null || price === void 0 ? void 0 : price.recurring_interval_count }));
    }
    render() {
        return (index.h(index.Host, { key: 'f1c5923c5326ae9eb5521b350c9c1ba9ea3a5b99', role: "paragraph" }, (() => {
            var _a, _b, _c, _d, _e;
            if ((_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.selectedVariant) {
                return this.renderVariantPrice((_b = watchers.state[this.productId]) === null || _b === void 0 ? void 0 : _b.selectedVariant);
            }
            if ((_c = watchers.state[this.productId]) === null || _c === void 0 ? void 0 : _c.selectedPrice) {
                return this.renderPrice(watchers.state[this.productId].selectedPrice);
            }
            if ((_e = (_d = watchers.state[this.productId]) === null || _d === void 0 ? void 0 : _d.prices) === null || _e === void 0 ? void 0 : _e.length) {
                return this.renderRange();
            }
            return index.h("slot", null);
        })()));
    }
};
ScProductPrice.style = ScProductPriceStyle0;

exports.sc_product_price = ScProductPrice;

//# sourceMappingURL=sc-product-price.cjs.entry.js.map