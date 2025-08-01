'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const pure = require('./pure-bd6f0a6e.js');
const watchers = require('./watchers-2ad3abd1.js');
const mutations = require('./mutations-10a18c83.js');
const store = require('./store-4a539aea.js');
require('./watchers-5d4eed04.js');
const getters = require('./getters-ae03ef93.js');
const getters$1 = require('./getters-87b7ef91.js');
const mutations$1 = require('./mutations-11c8f9a8.js');
const getters$2 = require('./getters-66ca11f9.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./index-bcdafe6e.js');
require('./utils-2e91d46c.js');
require('./remove-query-args-b57e8cd3.js');
require('./index-fb76df07.js');
require('./google-59d23803.js');
require('./currency-71fce0f0.js');
require('./price-5b1afcfe.js');
require('./util-b877b2bd.js');
require('./address-4c70d641.js');

const scStripePaymentElementCss = "sc-stripe-payment-element{display:block}sc-stripe-payment-element [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";
const ScStripePaymentElementStyle0 = scStripePaymentElementCss;

const ScStripePaymentElement = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scPaid = index.createEvent(this, "scPaid", 7);
        this.scSetState = index.createEvent(this, "scSetState", 7);
        this.scPaymentInfoAdded = index.createEvent(this, "scPaymentInfoAdded", 7);
        this.error = undefined;
        this.confirming = false;
        this.loaded = false;
        this.styles = undefined;
    }
    async componentWillLoad() {
        this.fetchStyles();
        this.syncCheckoutMode();
    }
    async handleStylesChange() {
        this.createOrUpdateElements();
    }
    async fetchStyles() {
        this.styles = (await this.getComputedStyles());
    }
    /**
     * We wait for our property value to resolve (styles have been loaded)
     * This prevents the element appearance api being set before the styles are loaded.
     */
    getComputedStyles() {
        return new Promise(resolve => {
            let checkInterval = setInterval(() => {
                const styles = window.getComputedStyle(document.body);
                const color = styles.getPropertyValue('--sc-color-primary-500');
                if (color) {
                    clearInterval(checkInterval);
                    resolve(styles);
                }
            }, 100);
        });
    }
    /** Sync the checkout mode */
    async syncCheckoutMode() {
        mutations.onChange('checkout', () => {
            this.initializeStripe();
        });
    }
    async componentDidLoad() {
        this.initializeStripe();
    }
    async initializeStripe() {
        var _a, _b;
        if (typeof ((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.live_mode) === 'undefined' || ((_b = getters.state === null || getters.state === void 0 ? void 0 : getters.state.instances) === null || _b === void 0 ? void 0 : _b.stripe)) {
            return;
        }
        const { processor_data } = getters.getProcessorByType('stripe') || {};
        try {
            getters.state.instances.stripe = await pure.pure.loadStripe(processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key, { stripeAccount: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id });
            this.error = '';
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
            // don't continue.
            return;
        }
        // create or update elements.
        this.createOrUpdateElements();
        this.handleUpdateElement();
        this.unlistenToCheckout = mutations.onChange('checkout', () => {
            this.fetchStyles();
            this.createOrUpdateElements();
            this.handleUpdateElement();
        });
        // we need to listen to the form state and pay when the form state enters the paying state.
        this.unlistenToFormState = store.onChange('formState', () => {
            var _a;
            if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
                return;
            if ('paying' === getters$1.currentFormState()) {
                this.maybeConfirmOrder();
            }
        });
    }
    disconnectedCallback() {
        this.unlistenToFormState();
        this.unlistenToCheckout();
    }
    getElementsConfig() {
        var _a, _b, _c, _d;
        const styles = getComputedStyle(this.el);
        return {
            mode: ((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.remaining_amount_due) > 0 ? 'payment' : 'setup',
            amount: (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.remaining_amount_due,
            currency: (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
            setupFutureUsage: ((_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.reusable_payment_method_required) ? 'off_session' : null,
            appearance: {
                variables: {
                    colorPrimary: styles.getPropertyValue('--sc-color-primary-500') || 'black',
                    colorText: styles.getPropertyValue('--sc-input-label-color') || 'black',
                    borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium') || '4px',
                    colorBackground: styles.getPropertyValue('--sc-input-background-color') || 'white',
                    fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium') || '16px',
                    colorLogo: styles.getPropertyValue('--sc-stripe-color-logo') || 'light',
                    colorLogoTab: styles.getPropertyValue('--sc-stripe-color-logo-tab') || 'light',
                    colorLogoTabSelected: styles.getPropertyValue('--sc-stripe-color-logo-tab-selected') || 'light',
                    colorTextPlaceholder: styles.getPropertyValue('--sc-input-placeholder-color') || 'black',
                },
                rules: {
                    '.Input': {
                        border: styles.getPropertyValue('--sc-input-border'),
                    },
                },
            },
        };
    }
    /** Update the payment element mode, amount and currency when it changes. */
    createOrUpdateElements() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // need an order amount, etc.
        if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
            return;
        if (!getters.state.instances.stripe)
            return;
        if (((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.status) && ['paid', 'processing'].includes((_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.status))
            return;
        // create the elements if they have not yet been created.
        if (!getters.state.instances.stripeElements) {
            // we have what we need, load elements.
            getters.state.instances.stripeElements = getters.state.instances.stripe.elements(this.getElementsConfig());
            const { line1, line2, city, state, country, postal_code } = (_d = getters$2.getCompleteAddress('shipping')) !== null && _d !== void 0 ? _d : {};
            const options = {
                defaultValues: {
                    billingDetails: {
                        name: (_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.name,
                        email: (_f = mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.email,
                        ...(line1 && { address: { line1, line2, city, state, country, postal_code } }),
                    },
                },
                fields: {
                    billingDetails: {
                        email: 'never',
                    },
                },
            };
            if ((_h = (_g = window === null || window === void 0 ? void 0 : window.wp) === null || _g === void 0 ? void 0 : _g.hooks) === null || _h === void 0 ? void 0 : _h.applyFilters) {
                // apply filters to the options. 
                options.paymentMethodOrder = window.wp.hooks.applyFilters('surecart_stripe_payment_element_payment_method_order', [], mutations.state.checkout);
                options.wallets = window.wp.hooks.applyFilters('surecart_stripe_payment_element_wallets', {}, mutations.state.checkout);
                options.terms = window.wp.hooks.applyFilters('surecart_stripe_payment_element_terms', {}, mutations.state.checkout);
            }
            // create the payment element.
            getters.state.instances.stripeElements
                .create('payment', options)
                .mount(this.container);
            this.element = getters.state.instances.stripeElements.getElement('payment');
            this.element.on('ready', () => (this.loaded = true));
            this.element.on('change', (event) => {
                var _a, _b, _c, _d, _e, _f, _g;
                const requiredShippingPaymentTypes = ['cashapp', 'klarna', 'clearpay'];
                mutations.state.paymentMethodRequiresShipping = requiredShippingPaymentTypes.includes((_a = event === null || event === void 0 ? void 0 : event.value) === null || _a === void 0 ? void 0 : _a.type);
                if (event.complete) {
                    this.scPaymentInfoAdded.emit({
                        checkout_id: (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.id,
                        currency: (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
                        processor_type: 'stripe',
                        total_amount: (_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.total_amount,
                        line_items: (_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.line_items,
                        payment_method: {
                            billing_details: {
                                email: (_f = mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.email,
                                name: (_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.name,
                            },
                        },
                    });
                }
            });
            return;
        }
        getters.state.instances.stripeElements.update(this.getElementsConfig());
    }
    /** Update the default attributes of the element when they cahnge. */
    handleUpdateElement() {
        var _a, _b;
        if (!this.element)
            return;
        if (((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.status) !== 'draft')
            return;
        const { name, email } = mutations.state.checkout;
        const { line_1: line1, line_2: line2, city, state, country, postal_code } = ((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.shipping_address) || {};
        this.element.update({
            defaultValues: {
                billingDetails: {
                    name,
                    email,
                    address: {
                        line1,
                        line2,
                        city,
                        state,
                        country,
                        postal_code,
                    },
                },
            },
            fields: {
                billingDetails: {
                    email: 'never',
                },
            },
        });
    }
    async submit() {
        // this processor is not selected.
        if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'stripe')
            return;
        // submit the elements.
        const { error } = await getters.state.instances.stripeElements.submit();
        if (error) {
            console.error({ error });
            mutations.updateFormState('REJECT');
            mutations$1.createErrorNotice(error);
            this.error = error.message;
            return;
        }
    }
    /**
     * Watch order status and maybe confirm the order.
     */
    async maybeConfirmOrder() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        // this processor is not selected.
        if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'stripe')
            return;
        // must be a stripe session
        if (((_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_type) !== 'stripe')
            return;
        // need an external_type
        if (!((_f = (_e = (_d = (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.payment_intent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.type))
            return;
        // we need a client secret.
        if (!((_k = (_j = (_h = (_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.payment_intent) === null || _h === void 0 ? void 0 : _h.processor_data) === null || _j === void 0 ? void 0 : _j.stripe) === null || _k === void 0 ? void 0 : _k.client_secret))
            return;
        // confirm the intent.
        return await this.confirm((_p = (_o = (_m = (_l = mutations.state.checkout) === null || _l === void 0 ? void 0 : _l.payment_intent) === null || _m === void 0 ? void 0 : _m.processor_data) === null || _o === void 0 ? void 0 : _o.stripe) === null || _p === void 0 ? void 0 : _p.type);
    }
    async confirm(type, args = {}) {
        var _a, _b, _c, _d;
        const confirmArgs = {
            elements: getters.state.instances.stripeElements,
            clientSecret: (_d = (_c = (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.stripe) === null || _d === void 0 ? void 0 : _d.client_secret,
            confirmParams: {
                return_url: addQueryArgs.addQueryArgs(window.location.href, {
                    ...(mutations.state.checkout.id ? { checkout_id: mutations.state.checkout.id } : {}),
                }),
                payment_method_data: {
                    billing_details: {
                        email: mutations.state.checkout.email,
                    },
                },
            },
            redirect: 'if_required',
            ...args,
        };
        // prevent possible double-charges
        if (this.confirming)
            return;
        // stripe must be loaded.
        if (!getters.state.instances.stripe)
            return;
        try {
            this.scSetState.emit('PAYING');
            const response = type === 'setup' ? await getters.state.instances.stripe.confirmSetup(confirmArgs) : await getters.state.instances.stripe.confirmPayment(confirmArgs);
            if (response === null || response === void 0 ? void 0 : response.error) {
                this.error = response.error.message;
                throw response.error;
            }
            else {
                this.scSetState.emit('PAID');
                // paid
                this.scPaid.emit();
            }
        }
        catch (e) {
            console.error(e);
            mutations.updateFormState('REJECT');
            mutations$1.createErrorNotice(e);
            if (e.message) {
                this.error = e.message;
            }
        }
        finally {
            this.confirming = false;
        }
    }
    render() {
        return (index.h("div", { key: 'bada65913ad27a8a903d4273025a6f9cf8db20e0', class: "sc-stripe-payment-element", "data-testid": "stripe-payment-element" }, !!this.error && (index.h("sc-text", { key: '245257a81d156bc058499b0e1619afbc598b99b2', style: {
                'color': 'var(--sc-color-danger-500)',
                '--font-size': 'var(--sc-font-size-small)',
                'marginBottom': '0.5em',
            } }, this.error)), index.h("div", { key: 'df89322d8e52f6fcf2567eb5620ad48fb5b7de9e', class: "loader", hidden: this.loaded }, index.h("div", { key: 'e16d434bbe2e86d71722db0bd6fbcd1f664eb8d8', class: "loader__row" }, index.h("div", { key: '45f1a5d7ca430e1dfe1dcd50335fccb79a7284b5', style: { width: '50%' } }, index.h("sc-skeleton", { key: 'cbef1afca98f5f7109bbafcfc73af7e8f71214b8', style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { key: 'bafe9fe3cbe2cda906f4b4c3462fd51d027e7695' })), index.h("div", { key: 'efccbbb80eb13692bb6ace31b90284ac80230a37', style: { flex: '1' } }, index.h("sc-skeleton", { key: '4ff36a474929abc76338b8adf62919abcdf92c1c', style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { key: '99939dc84abb0f5ef9e78e39c918e64a91a04334' })), index.h("div", { key: 'dc54f7c4e586cce6fdf97886dd8219c0166c3236', style: { flex: '1' } }, index.h("sc-skeleton", { key: 'e8f000fec77b6ce9aaa6fba054659fc0fcfcc629', style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { key: '83243f067a3824bb05a1bcecb2c9e0d7c0a7ca66' }))), index.h("div", { key: 'cd0bf44c079c642b92c2a589aa5849e2ece17881', class: "loader__details" }, index.h("sc-skeleton", { key: '7f0d7d60327b2816de8558e6fcdb98a28f52aef1', style: { height: '1rem' } }), index.h("sc-skeleton", { key: '73782e2daae57e9944cfaaf66c2a2783aa13b660', style: { height: '1rem', width: '30%' } }))), index.h("div", { key: 'f01d6a3e000398bda40700f846239b5ab02d41c3', hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "styles": ["handleStylesChange"]
    }; }
};
ScStripePaymentElement.style = ScStripePaymentElementStyle0;

exports.sc_stripe_payment_element = ScStripePaymentElement;

//# sourceMappingURL=sc-stripe-payment-element.cjs.entry.js.map