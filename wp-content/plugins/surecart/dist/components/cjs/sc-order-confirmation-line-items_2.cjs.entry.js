'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const consumer = require('./consumer-9f4ee0e3.js');
const price = require('./price-5b1afcfe.js');
const tax = require('./tax-a4582e73.js');
require('./currency-71fce0f0.js');

const scOrderConfirmationLineItemsCss = ":host{display:block}.line-items{display:grid;gap:var(--sc-spacing-small)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}";
const ScOrderConfirmationLineItemsStyle0 = scOrderConfirmationLineItemsCss;

const ScOrderConfirmationLineItems = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.order = undefined;
        this.loading = undefined;
    }
    render() {
        var _a, _b;
        if (!!this.loading) {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), index.h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
        }
        return (index.h("div", { class: { 'confirmation-summary': true } }, index.h("div", { class: "line-items", part: "line-items" }, (_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data.map(item => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return (index.h("div", { class: "line-item" }, index.h("sc-product-line-item", { key: item.id, image: (_b = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.line_item_image, name: `${(_d = (_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name}`, price: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, quantity: item.quantity, fees: (_f = item === null || item === void 0 ? void 0 : item.fees) === null || _f === void 0 ? void 0 : _f.data, amount: item.ad_hoc_display_amount ? item.ad_hoc_display_amount : item.subtotal_display_amount, scratch: !item.ad_hoc_display_amount && (item === null || item === void 0 ? void 0 : item.scratch_display_amount), trial: (_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.trial_text, interval: `${(_h = item === null || item === void 0 ? void 0 : item.price) === null || _h === void 0 ? void 0 : _h.short_interval_text} ${(_j = item === null || item === void 0 ? void 0 : item.price) === null || _j === void 0 ? void 0 : _j.short_interval_count_text}`, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, sku: item === null || item === void 0 ? void 0 : item.sku })));
        }))));
    }
};
consumer.openWormhole(ScOrderConfirmationLineItems, ['order', 'busy', 'loading', 'empty'], false);
ScOrderConfirmationLineItems.style = ScOrderConfirmationLineItemsStyle0;

const scOrderConfirmationTotalsCss = ":host{display:block}";
const ScOrderConfirmationTotalsStyle0 = scOrderConfirmationTotalsCss;

const ScOrderConfirmationTotals = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.order = undefined;
    }
    renderDiscountLine() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (!((_c = (_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.discount) === null || _b === void 0 ? void 0 : _b.promotion) === null || _c === void 0 ? void 0 : _c.code)) {
            return null;
        }
        let humanDiscount = '';
        if ((_e = (_d = this.order) === null || _d === void 0 ? void 0 : _d.discount) === null || _e === void 0 ? void 0 : _e.coupon) {
            humanDiscount = price.getHumanDiscount((_g = (_f = this.order) === null || _f === void 0 ? void 0 : _f.discount) === null || _g === void 0 ? void 0 : _g.coupon);
        }
        return (index.h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), index.h("br", null), ((_k = (_j = (_h = this.order) === null || _h === void 0 ? void 0 : _h.discount) === null || _j === void 0 ? void 0 : _j.promotion) === null || _k === void 0 ? void 0 : _k.code) && (index.h("sc-tag", { type: "success", size: "small" }, (_o = (_m = (_l = this.order) === null || _l === void 0 ? void 0 : _l.discount) === null || _m === void 0 ? void 0 : _m.promotion) === null || _o === void 0 ? void 0 : _o.code))), humanDiscount && (index.h("span", { class: "coupon-human-discount", slot: "price-description" }, "(", humanDiscount, ")")), index.h("span", { slot: "price" }, (_p = this.order) === null || _p === void 0 ? void 0 : _p.discounts_display_amount)));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (index.h("div", { key: '61421b1813d8b1d788a7cd5a445c65ef8cedea04', class: { 'line-item-totals': true } }, index.h("sc-line-item", { key: '8b611fe6201eda02ae87b9f49a2bba094fea05c3' }, index.h("span", { key: 'e5c9ad268d00c5a2ae6d4a03be1cf46271d434ca', slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("span", { key: '340a0153d8fd807005d3af7562b92e25d366a677', slot: "price" }, (_a = this.order) === null || _a === void 0 ? void 0 : _a.subtotal_display_amount)), this.renderDiscountLine(), !!((_b = this.order) === null || _b === void 0 ? void 0 : _b.bump_amount) && (index.h("sc-line-item", { key: '60b4d288a6d1e53a8e86331df3ff888282ff997e', style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { key: '2b7dd2e2bd8c7f1f49eb3bf81a7583f981030105', slot: "description" }, wp.i18n.__('Bundle Discount', 'surecart')), index.h("span", { key: '2f599f2d38f2425c09a43775738ae9c521f41fa3', slot: "price" }, (_c = this.order) === null || _c === void 0 ? void 0 : _c.bump_display_amount))), !!((_d = this.order) === null || _d === void 0 ? void 0 : _d.shipping_amount) && (index.h("sc-line-item", { key: '18e396874553076fb0263bb624fcfcc1d98d661c', style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { key: '45f6354cceb27425e0734f42aa23e32d54cdc40e', slot: "description" }, wp.i18n.__('Shipping', 'surecart')), index.h("span", { key: '0b7fe25699ad8a67c1dbbe8a25e29e6d76bf255a', slot: "price" }, (_e = this.order) === null || _e === void 0 ? void 0 : _e.shipping_display_amount))), !!((_f = this.order) === null || _f === void 0 ? void 0 : _f.tax_amount) && (index.h("sc-line-item", { key: '387af9752805bbc9a6a0354668870a728eed9180', style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { key: '2161333c6347b7120a881c858fb5d2839fc2d858', slot: "description" }, tax.formatTaxDisplay((_g = this.order) === null || _g === void 0 ? void 0 : _g.tax_label), " ", `(${this.order.tax_percent}%)`), index.h("span", { key: 'b66e4b417a0d41dfacfde7f46e274aaeaff7ab37', slot: "price" }, (_h = this.order) === null || _h === void 0 ? void 0 : _h.tax_display_amount))), index.h("sc-divider", { key: 'dfcfbaf6530eea4b1f21ae5c249d64bdaff46553', style: { '--spacing': 'var(--sc-spacing-small)' } }), index.h("sc-line-item-total", { key: '05d07c351181b56af1486ee00b3b1ca1c2be111c', checkout: this.order, size: "large", "show-currency": true }, index.h("span", { key: '271f82d911fbef0494de7456ca7645038985e7ac', slot: "description" }, wp.i18n.__('Total', 'surecart')))));
    }
};
consumer.openWormhole(ScOrderConfirmationTotals, ['order', 'busy', 'loading', 'empty'], false);
ScOrderConfirmationTotals.style = ScOrderConfirmationTotalsStyle0;

exports.sc_order_confirmation_line_items = ScOrderConfirmationLineItems;
exports.sc_order_confirmation_totals = ScOrderConfirmationTotals;

//# sourceMappingURL=sc-order-confirmation-line-items_2.cjs.entry.js.map