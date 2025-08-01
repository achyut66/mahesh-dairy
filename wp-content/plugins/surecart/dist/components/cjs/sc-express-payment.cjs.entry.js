'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const getters = require('./getters-ae03ef93.js');
const getters$1 = require('./getters-87b7ef91.js');
require('./util-b877b2bd.js');
require('./index-bcdafe6e.js');
require('./utils-2e91d46c.js');
require('./mutations-10a18c83.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./index-fb76df07.js');
require('./google-59d23803.js');
require('./currency-71fce0f0.js');
require('./store-4a539aea.js');
require('./price-5b1afcfe.js');

const scExpressPaymentCss = "sc-express-payment{display:block}";
const ScExpressPaymentStyle0 = scExpressPaymentCss;

const ScExpressPayment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.processor = undefined;
        this.dividerText = undefined;
        this.debug = undefined;
        this.hasPaymentOptions = undefined;
    }
    onPaymentRequestLoaded() {
        this.hasPaymentOptions = true;
    }
    renderStripePaymentRequest() {
        const { processor_data } = getters.getProcessorByType('stripe') || {};
        return index.h("sc-stripe-payment-request", { debug: this.debug, stripeAccountId: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id, publishableKey: processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key });
    }
    render() {
        return (index.h(index.Host, { key: '03d79ade65f62e194567328e2110be7685c833ce', class: { 'is-empty': !this.hasPaymentOptions && !this.debug } }, this.renderStripePaymentRequest(), (this.hasPaymentOptions || this.debug) && index.h("sc-divider", { key: '57d20315a41736e2bb259182052a9217c8bd82c4', style: { '--spacing': 'calc(var(--sc-form-row-spacing)/2)' } }, this.dividerText), !!getters$1.formBusy() && index.h("sc-block-ui", { key: '1fca0a7a58721ae3ec8569744c609be941ef52e7' })));
    }
};
ScExpressPayment.style = ScExpressPaymentStyle0;

exports.sc_express_payment = ScExpressPayment;

//# sourceMappingURL=sc-express-payment.cjs.entry.js.map