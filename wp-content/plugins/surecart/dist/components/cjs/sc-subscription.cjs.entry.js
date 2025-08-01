'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const fetch = require('./fetch-d644cebd.js');
const lazy = require('./lazy-2b509fa7.js');
const price = require('./price-5b1afcfe.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./currency-71fce0f0.js');

const scSubscriptionCss = ":host{display:block}.subscription{display:grid;gap:0.5em}.subscription a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscription a.cancel{color:var(--sc-color-danger-500)}@media screen and (max-width: 720px){.subscription__action-buttons{--sc-flex-column-gap:var(--sc-spacing-xxx-small)}.subscription__action-buttons::part(base){flex-direction:column}.subscription__action-buttons sc-button::part(base){width:auto;height:2em}}";
const ScSubscriptionStyle0 = scSubscriptionCss;

const ScSubscription = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.subscriptionId = undefined;
        this.showCancel = undefined;
        this.heading = undefined;
        this.query = undefined;
        this.protocol = undefined;
        this.subscription = undefined;
        this.updatePaymentMethodUrl = undefined;
        this.loading = undefined;
        this.cancelModal = undefined;
        this.resubscribeModal = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            if (!this.subscription) {
                this.getSubscription();
            }
        });
    }
    async cancelPendingUpdate() {
        var _a;
        const r = confirm(wp.i18n.__('Are you sure you want to cancel the pending update to your plan?', 'surecart'));
        if (!r)
            return;
        try {
            this.busy = true;
            this.subscription = (await fetch.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/`, {
                    expand: ['price', 'price.product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
                }),
                method: 'PATCH',
                data: {
                    purge_pending_update: true,
                },
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.busy = false;
        }
    }
    async renewSubscription() {
        var _a;
        try {
            this.error = '';
            this.busy = true;
            this.subscription = (await fetch.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/renew`, {
                    expand: ['price', 'price.product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
                }),
                method: 'PATCH',
            }));
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all subscriptions */
    async getSubscription() {
        var _a;
        try {
            this.loading = true;
            this.subscription = (await await fetch.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId || ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id)}`, {
                    expand: ['price', 'price.product', 'current_period'],
                    ...(this.query || {}),
                }),
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.loading = false;
        }
    }
    renderName(subscription) {
        var _a;
        if (typeof ((_a = subscription === null || subscription === void 0 ? void 0 : subscription.price) === null || _a === void 0 ? void 0 : _a.product) !== 'string') {
            return price.productNameWithPrice(subscription === null || subscription === void 0 ? void 0 : subscription.price);
        }
        return wp.i18n.__('Subscription', 'surecart');
    }
    renderRenewalText(subscription) {
        const tag = index.h("sc-subscription-status-badge", { subscription: subscription });
        if ((subscription === null || subscription === void 0 ? void 0 : subscription.cancel_at_period_end) && subscription.current_period_end_at) {
            return (index.h("span", null, tag, " ", ' ', 
            /* translators: %s: current period end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan will be canceled on %s', 'surecart'), subscription.current_period_end_at_date)));
        }
        if (subscription.status === 'trialing' && subscription.trial_end_at) {
            return (index.h("span", null, tag, " ", ' ', 
            /* translators: %s: trial end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan begins on %s', 'surecart'), subscription.trial_end_at_date)));
        }
        if (subscription.status === 'active' && subscription.current_period_end_at) {
            return (index.h("span", null, tag, " ", ' ', 
            /* translators: %s: current period end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan renews on %s', 'surecart'), subscription.current_period_end_at_date)));
        }
        return tag;
    }
    renderEmpty() {
        return index.h("slot", { name: "empty" }, wp.i18n.__('This subscription does not exist.', 'surecart'));
    }
    renderLoading() {
        return (index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))));
    }
    renderContent() {
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.subscription) {
            return this.renderEmpty();
        }
        return (index.h(index.Fragment, null, index.h("sc-subscription-next-payment", { subscription: this.subscription, updatePaymentMethodUrl: this.updatePaymentMethodUrl }, index.h("sc-subscription-details", { subscription: this.subscription }))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
        return (index.h("sc-dashboard-module", { key: '307774617c8ed2f971b8650b48fcfbc5ed80467f', heading: this.heading || wp.i18n.__('Current Plan', 'surecart'), class: "subscription", error: this.error }, !!this.subscription && (index.h("sc-flex", { key: '1d1066b5b4c84ba26fe3f50ba2fa8b7ef114308d', slot: "end", class: "subscription__action-buttons" }, this.updatePaymentMethodUrl && paymentMethodExists && (index.h("sc-button", { key: '27ff05b6ec713a9306a7a747455c32a30f788c5f', type: "link", href: this.updatePaymentMethodUrl }, index.h("sc-icon", { key: 'bf2eda0832001369f09fce9a57624f29be69e0ba', name: "credit-card", slot: "prefix" }), wp.i18n.__('Update Payment Method', 'surecart'))), !paymentMethodExists && (index.h("sc-button", { key: '933b22dd4edbf7b393da4096d84eeaf1b6bee273', type: "link", href: addQueryArgs.addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
                id: this === null || this === void 0 ? void 0 : this.subscription.id,
                ...(((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode) === false ? { live_mode: false } : {}),
            }) }, index.h("sc-icon", { key: 'b7cedd4088ef04d666326d42a58237b0588dfb88', name: "credit-card", slot: "prefix" }), wp.i18n.__('Add Payment Method', 'surecart'))), !!Object.keys((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.pending_update).length && (index.h("sc-button", { key: '07e1ff81526628bb3a27cb8593ca41710b6ec70c', type: "link", onClick: () => this.cancelPendingUpdate() }, index.h("sc-icon", { key: 'deb7bff1fc6524d71c61c434c4b077e1d3391ae3', name: "x-octagon", slot: "prefix" }), wp.i18n.__('Cancel Scheduled Update', 'surecart'))), ((_c = this === null || this === void 0 ? void 0 : this.subscription) === null || _c === void 0 ? void 0 : _c.cancel_at_period_end) ? (index.h("sc-button", { type: "link", onClick: () => this.renewSubscription() }, index.h("sc-icon", { name: "repeat", slot: "prefix" }), wp.i18n.__('Restore Plan', 'surecart'))) : (((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.status) !== 'canceled' &&
            ((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.current_period_end_at) &&
            this.showCancel && (index.h("sc-button", { type: "link", onClick: () => (this.cancelModal = true) }, index.h("sc-icon", { name: "x", slot: "prefix" }), wp.i18n.__('Cancel Plan', 'surecart')))), ((_f = this.subscription) === null || _f === void 0 ? void 0 : _f.status) === 'canceled' && (index.h("sc-button", { key: 'debca43f748aad5c4e2536e7d2d06f2c7ce2a1b8', type: "link", ...(!!((_g = this.subscription) === null || _g === void 0 ? void 0 : _g.payment_method)
                ? {
                    onClick: () => (this.resubscribeModal = true),
                }
                : {
                    href: this === null || this === void 0 ? void 0 : this.updatePaymentMethodUrl,
                }) }, index.h("sc-icon", { key: 'ecdf3b6628fbbae4b9a53603f831365f6f9f7a0c', name: "repeat", slot: "prefix" }), wp.i18n.__('Resubscribe', 'surecart'))))), index.h("sc-card", { key: 'c262a3e207013d545651c51e29aae5d78d1f7ebf', style: { '--overflow': 'hidden' }, noPadding: true }, this.renderContent()), this.busy && index.h("sc-block-ui", { key: 'f27574d212d8d17ba447bfe5898e5beae8c67701', spinner: true }), index.h("sc-cancel-dialog", { key: '30a53098c8834d1385fe6ab111228489a0c1a931', subscription: this.subscription, protocol: this.protocol, open: this.cancelModal, onScRequestClose: () => (this.cancelModal = false), onScRefresh: () => this.getSubscription() }), index.h("sc-subscription-reactivate", { key: '0d3b02178b73ed6b0d73b23883e6a7df57d839d5', subscription: this.subscription, open: this.resubscribeModal, onScRequestClose: () => (this.resubscribeModal = false), onScRefresh: () => this.getSubscription() })));
    }
    get el() { return index.getElement(this); }
};
ScSubscription.style = ScSubscriptionStyle0;

exports.sc_subscription = ScSubscription;

//# sourceMappingURL=sc-subscription.cjs.entry.js.map