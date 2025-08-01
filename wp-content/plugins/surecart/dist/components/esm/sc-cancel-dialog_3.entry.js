import { r as registerInstance, c as createEvent, h, H as Host, F as Fragment } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { f as formatTaxDisplay } from './tax-a03623ca.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scCancelDialogCss = ":host{display:block;font-size:var(--sc-font-size-medium)}.close__button{position:absolute;top:0;right:0;font-size:22px}";
const ScCancelDialogStyle0 = scCancelDialogCss;

const ScCancelDialog = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scRequestClose = createEvent(this, "scRequestClose", 7);
        this.scRefresh = createEvent(this, "scRefresh", 7);
        this.open = undefined;
        this.protocol = undefined;
        this.subscription = undefined;
        this.reasons = undefined;
        this.reason = undefined;
        this.step = 'cancel';
        this.comment = undefined;
    }
    close() {
        this.reset();
        this.trackAttempt();
        this.scRequestClose.emit('close-button');
    }
    reset() {
        var _a;
        this.reason = null;
        this.step = ((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.preservation_enabled) ? 'survey' : 'cancel';
    }
    async trackAttempt() {
        var _a, _b;
        if (!((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.preservation_enabled))
            return;
        await apiFetch({
            method: 'PATCH',
            path: `surecart/v1/subscriptions/${(_b = this.subscription) === null || _b === void 0 ? void 0 : _b.id}/preserve`,
        });
    }
    componentWillLoad() {
        this.reset();
    }
    render() {
        return (h("sc-dialog", { key: 'e9a7237483abaa13564859c35557dcb02de0c382', style: {
                '--width': this.step === 'survey' ? '675px' : '500px',
                '--body-spacing': 'var(--sc-spacing-xxx-large)',
            }, noHeader: true, open: this.open, onScRequestClose: () => this.close() }, h("div", { key: 'c75a106453e37a0b14b0fbba4db5d269b9e4be00', class: {
                cancel: true,
            } }, h("sc-button", { key: '1305ebce71aeeb78991212f9ab30e9cb7322bbd7', class: "close__button", type: "text", circle: true, onClick: () => this.close() }, h("sc-icon", { key: 'fd49a962e66087a6258cb5c7641c3853ed870d02', name: "x" })), this.step === 'cancel' && (h("sc-subscription-cancel", { key: 'bdaa12418ba3d923bda657deb015de0c4f1f588b', subscription: this.subscription, protocol: this.protocol, reason: this.reason, comment: this.comment, onScAbandon: () => this.close(), onScCancelled: () => {
                this.scRefresh.emit();
                this.reset();
                this.scRequestClose.emit('close-button');
            } })), this.step === 'survey' && (h("sc-cancel-survey", { key: '5eb0580486720b44a22f84708b23e38ce7b6c3cf', protocol: this.protocol, onScAbandon: () => this.close(), onScSubmitReason: e => {
                const { comment, reason } = e.detail;
                this.reason = reason;
                this.comment = comment;
                this.step = (reason === null || reason === void 0 ? void 0 : reason.coupon_enabled) ? 'discount' : 'cancel';
            } })), this.step === 'discount' && (h("sc-cancel-discount", { key: 'dc1d28a8ef37a83b3844a742f7a86c02b10394d3', protocol: this.protocol, subscription: this.subscription, reason: this.reason, comment: this.comment, onScCancel: () => (this.step = 'cancel'), onScPreserved: () => {
                this.scRefresh.emit();
                this.reset();
                this.scRequestClose.emit('close-button');
            } })))));
    }
};
ScCancelDialog.style = ScCancelDialogStyle0;

const ScSubscriptionNextPayment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.subscription = undefined;
        this.updatePaymentMethodUrl = undefined;
        this.period = undefined;
        this.loading = true;
        this.error = undefined;
        this.details = undefined;
    }
    componentWillLoad() {
        this.fetch();
    }
    handleSubscriptionChange() {
        this.fetch();
    }
    async fetch() {
        var _a, _b, _c;
        if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && this.subscription.current_period_end_at) {
            this.loading = false;
            return;
        }
        if (((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status) === 'canceled') {
            this.loading = false;
            return;
        }
        try {
            this.loading = true;
            this.period = (await apiFetch({
                method: 'PATCH',
                path: addQueryArgs(`surecart/v1/subscriptions/${(_c = this.subscription) === null || _c === void 0 ? void 0 : _c.id}/upcoming_period`, {
                    skip_product_group_validation: true,
                    expand: [
                        'period.checkout',
                        'checkout.line_items',
                        'checkout.payment_method',
                        'checkout.manual_payment_method',
                        'payment_method.card',
                        'payment_method.payment_instrument',
                        'payment_method.paypal_account',
                        'payment_method.bank_account',
                        'line_item.price',
                        'price.product',
                        'period.subscription',
                    ],
                }),
                data: {
                    purge_pending_update: false,
                },
            }));
        }
        catch (e) {
            console.error(e);
            this.error = e;
        }
        finally {
            this.loading = false;
        }
    }
    render() {
        var _a, _b, _c, _d, _e;
        if (this.loading) {
            return (h("sc-toggle", { borderless: true, disabled: true }, h("sc-flex", { slot: "summary", flexDirection: "column" }, h("sc-skeleton", { style: { width: '200px' } }), h("sc-skeleton", { style: { width: '400px' } }), h("sc-skeleton", { style: { width: '300px' } }))));
        }
        const checkout = (_a = this === null || this === void 0 ? void 0 : this.period) === null || _a === void 0 ? void 0 : _a.checkout;
        if (!checkout)
            return (h("div", { style: { padding: 'var(--sc-spacing-medium)' } }, h("sc-subscription-details", { slot: "summary", subscription: this.subscription })));
        const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
        const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
        return (h(Host, null, h("sc-toggle", { borderless: true, shady: true }, h("span", { slot: "summary" }, h("sc-subscription-details", { subscription: this.subscription }, h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, wp.i18n.__('Your next payment is', 'surecart'), " ", h("strong", null, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), ' ', !!((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.remaining_period_text) && `— ${(_c = this.subscription) === null || _c === void 0 ? void 0 : _c.remaining_period_text}`))), h("sc-card", { noPadding: true, borderless: true }, (_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 :
            _d.data.map(item => {
                var _a, _b, _c, _d, _e, _f, _g;
                return (h("sc-product-line-item", { image: (_b = (_a = item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.line_item_image, name: (_d = (_c = item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, price: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, editable: false, removable: false, scratchDisplayAmount: item === null || item === void 0 ? void 0 : item.scratch_display_amount, displayAmount: item === null || item === void 0 ? void 0 : item.subtotal_display_amount, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.subtotal_display_amount, interval: `${(_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.short_interval_text} ${(_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.short_interval_count_text}`, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display }));
            }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), checkout === null || checkout === void 0 ? void 0 :
            checkout.subtotal_display_amount), !!checkout.proration_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), checkout === null || checkout === void 0 ? void 0 :
            checkout.proration_display_amount)), !!checkout.applied_balance_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), checkout === null || checkout === void 0 ? void 0 :
            checkout.applied_balance_display_amount)), !!checkout.trial_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), checkout === null || checkout === void 0 ? void 0 :
            checkout.trial_display_amount)), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), checkout === null || checkout === void 0 ? void 0 :
            checkout.discounts_display_amount)), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, h("span", { slot: "description" }, wp.i18n.__('Shipping', 'surecart')), checkout === null || checkout === void 0 ? void 0 :
            checkout.shipping_display_amount)), !!checkout.tax_amount && (h("sc-line-item", null, h("span", { slot: "description" }, formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label)), checkout === null || checkout === void 0 ? void 0 :
            checkout.tax_display_amount)), h("sc-divider", { style: { '--spacing': '0' } }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), paymentMethodExists && (h("a", { href: this.updatePaymentMethodUrl, slot: "price-description" }, h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, manualPaymentMethod ? h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }) : h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), h("sc-icon", { name: "edit-3" })))), !paymentMethodExists && (h("a", { href: addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
                id: this === null || this === void 0 ? void 0 : this.subscription.id,
                ...(((_e = this === null || this === void 0 ? void 0 : this.subscription) === null || _e === void 0 ? void 0 : _e.live_mode) === false ? { live_mode: false } : {}),
            }), slot: "price-description" }, wp.i18n.__('Add Payment Method', 'surecart')))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), h("span", { slot: "price" }, checkout === null || checkout === void 0 ? void 0 : checkout.amount_due_display_amount), h("span", { slot: "currency" }, checkout.currency))))));
    }
    static get watchers() { return {
        "subscription": ["handleSubscriptionChange"]
    }; }
};

const ScSubscriptionReactivate = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scRequestClose = createEvent(this, "scRequestClose", 7);
        this.scRefresh = createEvent(this, "scRefresh", 7);
        this.open = undefined;
        this.subscription = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.upcomingPeriod = undefined;
        this.loading = false;
    }
    openChanged() {
        if (this.open) {
            this.fetchUpcoming();
        }
    }
    async fetchUpcoming() {
        var _a;
        this.loading = true;
        try {
            this.upcomingPeriod = await apiFetch({
                method: 'PATCH',
                path: addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/upcoming_period`, {
                    skip_product_group_validation: true,
                    expand: ['period.checkout'],
                }),
                data: {
                    purge_pending_update: false,
                },
            });
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async reactivateSubscription() {
        var _a;
        try {
            this.error = '';
            this.busy = true;
            await apiFetch({
                path: `surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/restore`,
                method: 'PATCH',
            });
            this.scRefresh.emit();
            this.scRequestClose.emit('close-button');
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    renderLoading() {
        return (h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
    }
    render() {
        var _a, _b, _c;
        return (h("sc-dialog", { key: '4037e8e5a4f5ed97a2ab2ffaf57cba73c976c461', noHeader: true, open: this.open, style: { '--width': '600px', '--body-spacing': 'var(--sc-spacing-xxx-large)' } }, h("sc-dashboard-module", { key: 'd2550a955aacaa20f8d744855017e05fc113564b', loading: this.loading, heading: wp.i18n.__('Resubscribe', 'surecart'), class: "subscription-reactivate", error: this.error, style: { '--sc-dashboard-module-spacing': '1em' } }, this.loading ? (this.renderLoading()) : (h(Fragment, null, h("div", { slot: "description" }, h("sc-alert", { open: true, type: "warning", title: wp.i18n.__('Confirm Charge', 'surecart') }, wp.i18n.__('You will be charged', 'surecart'), " ", (_b = (_a = this.upcomingPeriod) === null || _a === void 0 ? void 0 : _a.checkout) === null || _b === void 0 ? void 0 :
            _b.amount_due_display_amount, wp.i18n.__('immediately for your subscription.', 'surecart')), h("sc-text", { style: {
                '--font-size': 'var(--sc-font-size-medium)',
                '--color': 'var(--sc-input-label-color)',
                '--line-height': 'var(--sc-line-height-dense)',
                'margin-top': 'var(--sc-spacing-medium)',
            } }, wp.i18n.__('Your subscription will be reactivated and will renew automatically on', 'surecart'), " ", h("strong", null, (_c = this.upcomingPeriod) === null || _c === void 0 ? void 0 : _c.end_at_date))), h("sc-flex", { justifyContent: "flex-start" }, h("sc-button", { type: "primary", loading: this.busy, disabled: this.busy, onClick: () => this.reactivateSubscription() }, wp.i18n.__('Yes, Reactivate', 'surecart')), h("sc-button", { disabled: this.busy, style: { color: 'var(--sc-color-gray-500)' }, type: "text", onClick: () => this.scRequestClose.emit() }, wp.i18n.__('No, Keep Inactive', 'surecart'))))), this.busy && h("sc-block-ui", { key: '1fcc0579cee611fbf9cef526bc0d62cb1c94153b' }))));
    }
    static get watchers() { return {
        "open": ["openChanged"]
    }; }
};

export { ScCancelDialog as sc_cancel_dialog, ScSubscriptionNextPayment as sc_subscription_next_payment, ScSubscriptionReactivate as sc_subscription_reactivate };

//# sourceMappingURL=sc-cancel-dialog_3.entry.js.map