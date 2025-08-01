'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const pure = require('./pure-bd6f0a6e.js');
const fetch = require('./fetch-d644cebd.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');

const scStripeAddMethodCss = "sc-stripe-add-method{display:block}sc-stripe-add-method [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";
const ScStripeAddMethodStyle0 = scStripeAddMethodCss;

const ScStripeAddMethod = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.liveMode = true;
        this.customerId = undefined;
        this.successUrl = undefined;
        this.loading = undefined;
        this.loaded = undefined;
        this.error = undefined;
        this.paymentIntent = undefined;
    }
    componentWillLoad() {
        this.createPaymentIntent();
    }
    async handlePaymentIntentCreate() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        // we need this data.
        if (!((_c = (_b = (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.processor_data) === null || _b === void 0 ? void 0 : _b.stripe) === null || _c === void 0 ? void 0 : _c.publishable_key) || !((_f = (_e = (_d = this.paymentIntent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.account_id))
            return;
        // check if stripe has been initialized
        if (!this.stripe) {
            try {
                this.stripe = await pure.pure.loadStripe((_j = (_h = (_g = this.paymentIntent) === null || _g === void 0 ? void 0 : _g.processor_data) === null || _h === void 0 ? void 0 : _h.stripe) === null || _j === void 0 ? void 0 : _j.publishable_key, { stripeAccount: (_m = (_l = (_k = this.paymentIntent) === null || _k === void 0 ? void 0 : _k.processor_data) === null || _l === void 0 ? void 0 : _l.stripe) === null || _m === void 0 ? void 0 : _m.account_id });
            }
            catch (e) {
                this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
                // don't continue.
                return;
            }
        }
        // load the element.
        // we need a stripe instance and client secret.
        if (!((_q = (_p = (_o = this.paymentIntent) === null || _o === void 0 ? void 0 : _o.processor_data) === null || _p === void 0 ? void 0 : _p.stripe) === null || _q === void 0 ? void 0 : _q.client_secret) || !this.container) {
            console.warn('do not have client secret or container');
            return;
        }
        // get the computed styles.
        const styles = getComputedStyle(document.body);
        // we have what we need, load elements.
        this.elements = this.stripe.elements({
            clientSecret: (_t = (_s = (_r = this.paymentIntent) === null || _r === void 0 ? void 0 : _r.processor_data) === null || _s === void 0 ? void 0 : _s.stripe) === null || _t === void 0 ? void 0 : _t.client_secret,
            appearance: {
                variables: {
                    colorPrimary: styles.getPropertyValue('--sc-color-primary-500'),
                    colorText: styles.getPropertyValue('--sc-input-label-color'),
                    borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium'),
                    colorBackground: styles.getPropertyValue('--sc-input-background-color'),
                    fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium'),
                },
                rules: {
                    '.Input': {
                        border: styles.getPropertyValue('--sc-input-border'),
                    },
                    '.Input::placeholder': {
                        color: styles.getPropertyValue('--sc-input-placeholder-color'),
                    },
                },
            },
        });
        // create the payment element.
        this.elements
            .create('payment', {
            wallets: {
                applePay: 'never',
                googlePay: 'never',
            },
        })
            .mount('.sc-payment-element-container');
        this.element = this.elements.getElement('payment');
        this.element.on('ready', () => (this.loaded = true));
    }
    async createPaymentIntent() {
        try {
            this.loading = true;
            this.error = '';
            this.paymentIntent = await fetch.apiFetch({
                method: 'POST',
                path: 'surecart/v1/payment_intents',
                data: {
                    processor_type: 'stripe',
                    live_mode: this.liveMode,
                    customer_id: this.customerId,
                    refresh_status: true,
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
    /**
     * Handle form submission.
     */
    async handleSubmit(e) {
        var _a;
        e.preventDefault();
        this.loading = true;
        try {
            const confirmed = await this.stripe.confirmSetup({
                elements: this.elements,
                confirmParams: {
                    return_url: addQueryArgs.addQueryArgs(this.successUrl, {
                        payment_intent: (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.id,
                    }),
                },
                redirect: 'always',
            });
            if (confirmed === null || confirmed === void 0 ? void 0 : confirmed.error) {
                this.error = confirmed.error.message;
                throw confirmed.error;
            }
        }
        catch (e) {
            console.error(e);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.loading = false;
        }
    }
    render() {
        return (index.h("sc-form", { key: '0ab462b6d3ad536caa437a98c334f0953678c944', onScFormSubmit: e => this.handleSubmit(e) }, this.error && (index.h("sc-alert", { key: '663834bcfc3af01922382248141b6a79737ad74f', open: !!this.error, type: "danger" }, index.h("span", { key: '47685c27e2e113c0726c99f363fcf78694b9fb90', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("div", { key: 'e5a2784f0c1a788c1a9b8e6dad2b5b4caac20f24', class: "loader", hidden: this.loaded }, index.h("div", { key: '1b7fa7096247a92610a4889cc3f909536df917c6', class: "loader__row" }, index.h("div", { key: '385c488e4067a335e0b07e5e38b8e09d53c9fad8', style: { width: '50%' } }, index.h("sc-skeleton", { key: '4b1d778277c00bfc7126f17417e7f478143f1bca', style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { key: '6ae747d2f7e560783200238e5ca13b5591a851fc' })), index.h("div", { key: '9d1d58d611ddb49824704f7f97a3ccd3e976bc4a', style: { flex: '1' } }, index.h("sc-skeleton", { key: '2d79d2f702d14b4f556eb465bf6ba0446ad0f8db', style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { key: '902bbda82ee37aebd5a1a12eb5637a1692d76855' })), index.h("div", { key: '3cda437171b90152265a93a4055d29fafe816110', style: { flex: '1' } }, index.h("sc-skeleton", { key: '19585b89e1debcf09bcc6cd5fbda054154cf8cff', style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { key: '507af1e0e2b39fc52f1a16e3eff50c99d9de0e5f' }))), index.h("div", { key: 'af68ff4fba8bff0e0b99d22a4a432a3c57d7cc86', class: "loader__details" }, index.h("sc-skeleton", { key: 'c2fb98bc481d3485c5367dd9033aadda50767b10', style: { height: '1rem' } }), index.h("sc-skeleton", { key: 'bd8d79ce7468e92558ea0326bc726b9b22a2838f', style: { height: '1rem', width: '30%' } }))), index.h("div", { key: '4b6eef97f97d300fc7bccf01e3ad5a6c06e173a1', hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) }), index.h("sc-button", { key: '92b84e597f7fb150c850f28b1c901a7206345e41', type: "primary", submit: true, full: true, loading: this.loading }, wp.i18n.__('Save Payment Method', 'surecart'))));
    }
    static get watchers() { return {
        "paymentIntent": ["handlePaymentIntentCreate"]
    }; }
};
ScStripeAddMethod.style = ScStripeAddMethodStyle0;

exports.sc_stripe_add_method = ScStripeAddMethod;

//# sourceMappingURL=sc-stripe-add-method.cjs.entry.js.map