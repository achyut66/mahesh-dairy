import { r as registerInstance, h, F as Fragment } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scSubscriptionPaymentCss = ":host{display:block;position:relative}.subscription-payment{display:grid;gap:0.5em}";
const ScSubscriptionPaymentStyle0 = scSubscriptionPaymentCss;

const ScSubscriptionPayment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.subscriptionId = undefined;
        this.backUrl = undefined;
        this.successUrl = undefined;
        this.subscription = undefined;
        this.paymentMethods = [];
        this.customerIds = [];
        this.manualPaymentMethods = undefined;
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    componentWillLoad() {
        this.fetchItems();
    }
    async fetchItems() {
        try {
            this.loading = true;
            await Promise.all([this.fetchSubscription(), this.fetchPaymentMethods()]);
        }
        catch (e) {
            console.error(e);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async fetchSubscription() {
        if (!this.subscriptionId)
            return;
        this.subscription = (await apiFetch({
            path: addQueryArgs(`/surecart/v1/subscriptions/${this.subscriptionId}`, {
                expand: ['price', 'price.product', 'current_period', 'product'],
            }),
        }));
    }
    async fetchPaymentMethods() {
        var _a, _b;
        this.paymentMethods = (await apiFetch({
            path: addQueryArgs(`/surecart/v1/payment_methods`, {
                expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
                customer_ids: this.customerIds,
                reusable: true,
                ...(((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode) !== null ? { live_mode: this.subscription.live_mode } : {}),
            }),
        }));
        this.manualPaymentMethods = (await apiFetch({
            path: addQueryArgs(`surecart/v1/manual_payment_methods`, {
                customer_ids: this.customerIds,
                reusable: true,
                live_mode: (_b = this.subscription) === null || _b === void 0 ? void 0 : _b.live_mode,
            }),
        }));
        // remove archived methods if the current payment method id is not the archived one.
        this.manualPaymentMethods = this.manualPaymentMethods.filter(method => {
            if ((method === null || method === void 0 ? void 0 : method.archived) && (method === null || method === void 0 ? void 0 : method.id) !== this.currentPaymentMethodId()) {
                return false;
            }
            return true;
        });
    }
    async handleSubmit(e) {
        var _a;
        const { payment_method } = await e.target.getFormJson();
        const isManualPaymentMethod = (this.manualPaymentMethods || []).some(method => method.id === payment_method);
        try {
            this.error = '';
            this.busy = true;
            await apiFetch({
                path: `/surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}`,
                method: 'PATCH',
                data: {
                    ...(!isManualPaymentMethod ? { payment_method, manual_payment: false } : { manual_payment_method: payment_method, manual_payment: true }),
                },
            });
            if (this.successUrl) {
                window.location.assign(this.successUrl);
            }
            else {
                this.busy = false;
            }
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.busy = false;
        }
    }
    renderLoading() {
        return (h(Fragment, null, h("sc-choice", { name: "loading", disabled: true }, h("sc-skeleton", { style: { width: '60px', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '80px', display: 'inline-block' }, slot: "price" }), h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "description" })), h("sc-button", { type: "primary", full: true, submit: true, loading: true, busy: true }), !!this.backUrl && h("sc-button", { href: this.backUrl, full: true, loading: true, busy: true })));
    }
    currentPaymentMethodId() {
        var _a, _b, _c, _d, _e;
        return ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.manual_payment)
            ? (_b = this.subscription) === null || _b === void 0 ? void 0 : _b.manual_payment_method
            : ((_d = (_c = this.subscription) === null || _c === void 0 ? void 0 : _c.payment_method) === null || _d === void 0 ? void 0 : _d.id) || ((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.payment_method);
    }
    renderContent() {
        var _a, _b, _c;
        if (this.loading) {
            return this.renderLoading();
        }
        const modeMethods = this.paymentMethods.filter(method => { var _a; return (method === null || method === void 0 ? void 0 : method.live_mode) === ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode); });
        const hasNoPaymentMethods = (!((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length) && !((_b = this.manualPaymentMethods) === null || _b === void 0 ? void 0 : _b.length)) || (((_c = this.paymentMethods) === null || _c === void 0 ? void 0 : _c.length) && !(modeMethods === null || modeMethods === void 0 ? void 0 : modeMethods.length));
        if (hasNoPaymentMethods) {
            return (h(Fragment, null, h("sc-empty", { icon: "credit-card" }, wp.i18n.__('You have no saved payment methods.', 'surecart')), !!this.backUrl && (h("sc-button", { href: this.backUrl, full: true }, wp.i18n.__('Go Back', 'surecart')))));
        }
        return (h(Fragment, null, h("sc-choices", null, h("div", null, (this.paymentMethods || []).map(method => {
            var _a;
            if ((method === null || method === void 0 ? void 0 : method.live_mode) !== ((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode))
                return null;
            return (h("sc-choice", { checked: this.currentPaymentMethodId() === (method === null || method === void 0 ? void 0 : method.id), name: "payment_method", value: method === null || method === void 0 ? void 0 : method.id }, h("sc-payment-method", { paymentMethod: method, full: true })));
        }), (this.manualPaymentMethods || []).map(method => {
            return (h("sc-choice", { checked: this.currentPaymentMethodId() === (method === null || method === void 0 ? void 0 : method.id), name: "payment_method", value: method === null || method === void 0 ? void 0 : method.id }, h("sc-manual-payment-method", { paymentMethod: method, showDescription: true })));
        }))), h("sc-button", { type: "primary", full: true, submit: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Update', 'surecart')), !!this.backUrl && (h("sc-button", { href: this.backUrl, full: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Go Back', 'surecart')))));
    }
    render() {
        return (h("sc-dashboard-module", { key: '23b5a655ca2997c1961411d72c1dd3468c689a4a', heading: wp.i18n.__('Select a payment method', 'surecart'), class: "subscription-payment", error: this.error }, h("sc-form", { key: '5f9ddadb8527708511599573383a546b0e968116', onScFormSubmit: e => this.handleSubmit(e) }, h("sc-card", { key: 'e143136e0e49ab75055cf000ff8bb173c1bed081' }, this.renderContent())), this.busy && h("sc-block-ui", { key: 'bcd1edd62854207e86cd0f663435e6b4f9b04401' })));
    }
};
ScSubscriptionPayment.style = ScSubscriptionPaymentStyle0;

export { ScSubscriptionPayment as sc_subscription_payment };

//# sourceMappingURL=sc-subscription-payment.entry.js.map