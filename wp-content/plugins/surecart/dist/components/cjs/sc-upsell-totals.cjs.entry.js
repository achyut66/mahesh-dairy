'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
require('./watchers-4a82a9b2.js');
const store = require('./store-ce062aec.js');
require('./watchers-db03ec4e.js');
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

const scUpsellTotalsCss = ":host{display:block}sc-divider{margin:16px 0 !important}.conversion-description{color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}";
const ScUpsellTotalsStyle0 = scUpsellTotalsCss;

const ScUpsellTotals = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    renderAmountDue() {
        var _a, _b;
        return store.state.amount_due > 0 ? (_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.total_display_amount : !!((_b = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _b === void 0 ? void 0 : _b.trial_amount) ? wp.i18n.__('Trial', 'surecart') : wp.i18n.__('Free', 'surecart');
    }
    // Determine if the currency should be displayed to avoid duplication in the amount display.
    getCurrencyToDisplay() {
        var _a, _b, _c, _d, _e, _f, _g;
        return ((_c = (_b = (_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.total_default_currency_display_amount) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.includes((_e = (_d = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _d === void 0 ? void 0 : _d.currency) === null || _e === void 0 ? void 0 : _e.toLowerCase()))
            ? ''
            : (_g = (_f = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _f === void 0 ? void 0 : _f.currency) === null || _g === void 0 ? void 0 : _g.toUpperCase();
    }
    renderConversion() {
        var _a, _b, _c, _d, _e, _f;
        // need to check the checkout for a few things.
        const checkout = store.state === null || store.state === void 0 ? void 0 : store.state.checkout;
        if (!(checkout === null || checkout === void 0 ? void 0 : checkout.show_converted_total)) {
            return null;
        }
        // the currency is the same as the current currency.
        if ((checkout === null || checkout === void 0 ? void 0 : checkout.currency) === (checkout === null || checkout === void 0 ? void 0 : checkout.current_currency)) {
            return null;
        }
        // there is no amount due.
        if (!((_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.total_amount)) {
            return null;
        }
        return (index.h(index.Fragment, null, index.h("sc-divider", null), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, index.h("slot", { name: "charge-amount-description" }, wp.i18n.sprintf(wp.i18n.__('Payment Total', 'surecart'), (_c = (_b = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.toUpperCase()))), index.h("span", { slot: "price" }, this.getCurrencyToDisplay() && index.h("span", { class: "currency-label" }, this.getCurrencyToDisplay()), (_d = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _d === void 0 ? void 0 :
            _d.total_default_currency_display_amount)), index.h("sc-line-item", null, index.h("span", { slot: "description", class: "conversion-description" }, wp.i18n.sprintf(wp.i18n.__('Your payment will be processed in %s.', 'surecart'), (_f = (_e = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _e === void 0 ? void 0 : _e.currency) === null || _f === void 0 ? void 0 : _f.toUpperCase())))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return (index.h("sc-summary", { key: '425907695a8b9a0a4536784f2740dac61225e499', "open-text": "Total", "closed-text": "Total", collapsible: true, collapsed: true }, !!((_a = store.state.line_item) === null || _a === void 0 ? void 0 : _a.id) && index.h("span", { key: '2ec55a15e7df0db1914678f818151a6ee8f003d0', slot: "price" }, this.renderAmountDue()), index.h("sc-divider", { key: 'df5889179016a773fe9937f77921c0ef8e47c12b' }), index.h("sc-line-item", { key: '4a31094780bfd0dc4518747e47536cd7b68acc64' }, index.h("span", { key: 'e389e7e21e0dffb76d87f56fa7656f7f4d3d2689', slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("span", { key: 'fcdd1a577c9d95c57fb77b497c684d514bd6af95', slot: "price" }, (_b = store.state.line_item) === null || _b === void 0 ? void 0 : _b.subtotal_display_amount)), (((_d = (_c = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _c === void 0 ? void 0 : _c.fees) === null || _d === void 0 ? void 0 : _d.data) || [])
            .filter(fee => fee.fee_type === 'upsell') // only upsell fees.
            .map(fee => {
            return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, fee.description, " ", `(${wp.i18n.__('one time', 'surecart')})`), index.h("span", { slot: "price" }, fee === null || fee === void 0 ? void 0 : fee.display_amount)));
        }), !!((_e = store.state.line_item) === null || _e === void 0 ? void 0 : _e.tax_amount) && (index.h("sc-line-item", { key: 'ebdfb04cee5711b9baa7738b2d674be5bb46cae7' }, index.h("span", { key: '5b26b9e5e71bda3df7edcb92fc9fe0c84bcce233', slot: "description" }, wp.i18n.__('Tax', 'surecart')), index.h("span", { key: 'f56f940264f121f275ff36ede63d08ae95a8909e', slot: "price" }, (_f = store.state.line_item) === null || _f === void 0 ? void 0 : _f.tax_display_amount))), index.h("sc-divider", { key: '831799fe13306f12ab08807af17a93bb47b59b01' }), index.h("sc-line-item", { key: '30786e6b9359c10fbfcf1c84de67a597eb968f78', style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { key: '52442c495bd75a96f6b18f9ecc2e60c08c833326', slot: "title" }, wp.i18n.__('Total', 'surecart')), index.h("span", { key: 'e1d985168ec1e4d26771b09797e74b0fd12ad366', slot: "price" }, (_g = store.state.line_item) === null || _g === void 0 ? void 0 : _g.total_display_amount)), this.renderConversion()));
    }
};
ScUpsellTotals.style = ScUpsellTotalsStyle0;

exports.sc_upsell_totals = ScUpsellTotals;

//# sourceMappingURL=sc-upsell-totals.cjs.entry.js.map