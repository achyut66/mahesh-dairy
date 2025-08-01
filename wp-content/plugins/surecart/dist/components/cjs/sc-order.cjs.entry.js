'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const fetch = require('./fetch-d644cebd.js');
const lazy = require('./lazy-2b509fa7.js');
const tax = require('./tax-a4582e73.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');

const scOrderCss = ":host{display:block}.order__row{padding:var(--sc-spacing-large);display:grid;gap:var(--sc-spacing-small)}";
const ScOrderStyle0 = scOrderCss;

const ScOrder = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.orderId = undefined;
        this.customerIds = undefined;
        this.heading = undefined;
        this.order = undefined;
        this.purchases = undefined;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    /** Only fetch if visible */
    componentDidLoad() {
        lazy.onFirstVisible(this.el, () => {
            this.fetchOrder();
            this.fetchDownloads();
        });
    }
    async fetchOrder() {
        try {
            this.loading = true;
            await this.getOrder();
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async fetchDownloads() {
        try {
            this.busy = true;
            this.purchases = (await fetch.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/purchases`, {
                    expand: ['product', 'product.downloads', 'download.media'],
                    order_ids: [this.orderId],
                    customer_ids: this.customerIds,
                    downloadable: true,
                }),
            }));
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get order */
    async getOrder() {
        this.order = (await fetch.apiFetch({
            path: addQueryArgs.addQueryArgs(`surecart/v1/orders/${this.orderId}`, {
                expand: [
                    'checkout',
                    'checkout.line_items',
                    'line_item.price',
                    'line_item.fees',
                    'line_item.variant',
                    'variant.image',
                    'price.product',
                    'checkout.manual_payment_method',
                    'checkout.payment_method',
                    'checkout.selected_shipping_choice',
                    'shipping_choice.shipping_method',
                    'payment_method.card',
                    'payment_method.payment_instrument',
                    'payment_method.paypal_account',
                    'payment_method.bank_account',
                    'checkout.discount',
                    'discount.promotion',
                    'checkout.charge',
                ],
            }),
        }));
    }
    renderLoading() {
        return (index.h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, index.h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
    }
    renderEmpty() {
        return index.h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__('Order not found.', 'surecart'));
    }
    renderContent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.loading) {
            return this.renderLoading();
        }
        if (!((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)) {
            return this.renderEmpty();
        }
        const checkout = (_b = this.order) === null || _b === void 0 ? void 0 : _b.checkout;
        const shippingMethod = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.selected_shipping_choice) === null || _c === void 0 ? void 0 : _c.shipping_method;
        const shippingMethodName = shippingMethod === null || shippingMethod === void 0 ? void 0 : shippingMethod.name;
        return (index.h(index.Fragment, null, (((_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 : _d.data) || []).map(item => {
            var _a, _b, _c, _d, _e, _f, _g;
            return (index.h("sc-product-line-item", { key: item.id, image: item === null || item === void 0 ? void 0 : item.image, name: (_b = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name, price: (_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, quantity: item.quantity, amount: item.subtotal_display_amount, trial: (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.trial_text, interval: `${(_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.short_interval_text} ${(_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.short_interval_count_text}`, scratch: item === null || item === void 0 ? void 0 : item.scratch_display_amount, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, fees: (_g = item === null || item === void 0 ? void 0 : item.fees) === null || _g === void 0 ? void 0 : _g.data }));
        }), (checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.trial_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.trial_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discounts) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display))), !!((_f = (_e = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _e === void 0 ? void 0 : _e.promotion) === null || _f === void 0 ? void 0 : _f.code) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), index.h("br", null), index.h("sc-tag", { type: "success" }, wp.i18n.__('Coupon:', 'surecart'), " ", (_h = (_g = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _g === void 0 ? void 0 : _g.promotion) === null || _h === void 0 ? void 0 :
            _h.code)), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.discounts_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, `${wp.i18n.__('Shipping', 'surecart')} ${shippingMethodName ? `(${shippingMethodName})` : ''}`), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.shipping_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, `${tax.formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label, (checkout === null || checkout === void 0 ? void 0 : checkout.tax_status) === 'estimated')} (${checkout === null || checkout === void 0 ? void 0 : checkout.tax_percent}%)`), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.tax_display_amount), !!(checkout === null || checkout === void 0 ? void 0 : checkout.tax_inclusive_amount) && index.h("span", { slot: "price-description" }, `(${wp.i18n.__('included', 'surecart')})`))), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Total', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.total_display_amount), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency)), !!(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Proration', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.proration_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), index.h("span", { style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            }, slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_display_amount))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.credited_balance_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Credited Balance', 'surecart')), index.h("span", { slot: "price", style: {
                'font-weight': 'var(--sc-font-weight-semibold)',
                'color': 'var(--sc-color-gray-800)',
            } }, checkout === null || checkout === void 0 ? void 0 : checkout.credited_balance_display_amount))), (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), !!(checkout === null || checkout === void 0 ? void 0 : checkout.paid_amount) && (index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Paid', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.paid_display_amount), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.refunded_amount) && (index.h(index.Fragment, null, index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "description" }, wp.i18n.__('Refunded', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.refunded_display_amount)), index.h("sc-line-item", { style: {
                'width': '100%',
                '--price-size': 'var(--sc-font-size-x-large)',
            } }, index.h("span", { slot: "title" }, wp.i18n.__('Net Payment', 'surecart')), index.h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.net_paid_display_amount)))), (checkout === null || checkout === void 0 ? void 0 : checkout.tax_reverse_charged_amount) > 0 && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('*Tax to be paid on reverse charge basis', 'surecart'))))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const checkout = (_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.checkout;
        const manualPaymentMethod = checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method;
        return (index.h("sc-spacing", { key: '9afe60e53b4ef55f5a47ead1726f83e95cc9beab', style: { '--spacing': 'var(--sc-spacing-large)' } }, index.h("sc-dashboard-module", { key: '9149bde2463aae583dfebc1b56227237cbe69b88', error: this.error }, index.h("span", { key: 'aba09c78a941652d761cc5428591081f92a683e0', slot: "heading" }, this.loading ? index.h("sc-skeleton", { style: { width: '120px' } }) : `#${(_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.number}`), !this.loading && !(checkout === null || checkout === void 0 ? void 0 : checkout.live_mode) && (index.h("sc-tag", { key: '051eec1e13f88d52e5aac94251a00832e0ae3278', type: "warning", slot: "end" }, wp.i18n.__('Test Mode', 'surecart'))), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (index.h("sc-order-manual-instructions", { key: 'c29f85e3933e69d9e33efda6d48f6dbfeba1a23b', manualPaymentTitle: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name, manualPaymentInstructions: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions })), index.h("sc-card", { key: '8050e739cfae827b3ebc94bb1cde0e658ec5b63d', "no-padding": !this.loading }, this.loading ? (this.renderLoading()) : (index.h(index.Fragment, null, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Order Status', 'surecart')), index.h("sc-order-status-badge", { status: (_c = this === null || this === void 0 ? void 0 : this.order) === null || _c === void 0 ? void 0 : _c.status })), index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Date', 'surecart')), index.h("span", null, (_d = this.order) === null || _d === void 0 ? void 0 : _d.created_at_date)), index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Payment Method', 'surecart')), index.h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method })), index.h("div", { class: "order__row" }, this.renderContent())))))), ((_e = this.order) === null || _e === void 0 ? void 0 : _e.statement_url) && (index.h("sc-button", { key: '2c6ca2386753da79e4d0ef26ce23ea2d909233d9', type: "primary", href: (_f = this.order) === null || _f === void 0 ? void 0 : _f.statement_url, target: "_blank" }, index.h("sc-icon", { key: '89799253a0ae24a1c8312d66fd8cd936922f7ab5', name: "inbox", slot: "prefix" }), wp.i18n.__('Download Receipt/Invoice', 'surecart'))), !!((_g = this.purchases) === null || _g === void 0 ? void 0 : _g.length) && index.h("sc-purchase-downloads-list", { key: 'd20cdb9fe07bf55713639c88d60921e9baf9f364', heading: wp.i18n.__('Downloads', 'surecart'), purchases: this.purchases })));
    }
    get el() { return index.getElement(this); }
};
ScOrder.style = ScOrderStyle0;

exports.sc_order = ScOrder;

//# sourceMappingURL=sc-order.cjs.entry.js.map