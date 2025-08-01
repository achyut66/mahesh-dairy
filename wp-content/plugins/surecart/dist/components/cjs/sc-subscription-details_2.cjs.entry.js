'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const fetch = require('./fetch-d644cebd.js');
const price = require('./price-5b1afcfe.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');
require('./currency-71fce0f0.js');

const maybeConvertAmount = (amount, currency) => {
	return [
		'BIF',
		'BYR',
		'CLP',
		'DJF',
		'GNF',
		'ISK',
		'JPY',
		'KMF',
		'KRW',
		'PYG',
		'RWF',
		'UGX',
		'VND',
		'VUV',
		'XAF',
		'XAG',
		'XAU',
		'XBA',
		'XBB',
		'XBC',
		'XBD',
		'XDR',
		'XOF',
		'XPD',
		'XPF',
		'XPT',
		'XTS',
	].includes(currency?.toUpperCase())
		? amount
		: amount / 100;
};

const formatNumber = (value, currency = '') =>
	new Intl.NumberFormat([], {
		style: 'currency',
		currency: currency.toUpperCase(),
		currencyDisplay: 'symbol',
	}).format(maybeConvertAmount(value, currency.toUpperCase()));

const scSubscriptionDetailsCss = ":host{display:block}.subscription-details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}.subscription-details__missing-method{display:flex;align-items:center;gap:var(--sc-spacing-x-small)}";
const ScSubscriptionDetailsStyle0 = scSubscriptionDetailsCss;

const ScSubscriptionDetails = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.subscription = undefined;
        this.pendingPrice = undefined;
        this.hideRenewalText = undefined;
        this.activationsModal = undefined;
        this.loading = undefined;
        this.hasPendingUpdate = undefined;
    }
    renderName() {
        var _a, _b, _c;
        if (typeof ((_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.product) !== 'string') {
            return price.productNameWithPrice((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.price);
        }
        return wp.i18n.__('Subscription', 'surecart');
    }
    async handleSubscriptionChange() {
        var _a, _b, _c, _d;
        this.hasPendingUpdate = !!((_b = Object.keys(((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.pending_update) || {})) === null || _b === void 0 ? void 0 : _b.length);
        if (((_d = (_c = this === null || this === void 0 ? void 0 : this.subscription) === null || _c === void 0 ? void 0 : _c.pending_update) === null || _d === void 0 ? void 0 : _d.price) && !(this === null || this === void 0 ? void 0 : this.pendingPrice) && !this.hideRenewalText) {
            this.pendingPrice = await this.fetchPrice(this.subscription.pending_update.price);
        }
    }
    componentWillLoad() {
        this.handleSubscriptionChange();
    }
    async fetchPrice(price_id) {
        try {
            this.loading = true;
            const price = await fetch.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/prices/${price_id}`, {
                    expand: ['product'],
                }),
            });
            return price;
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this.loading = false;
        }
    }
    renderRenewalText() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        const tag = index.h("sc-subscription-status-badge", { subscription: this === null || this === void 0 ? void 0 : this.subscription });
        if (((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && ((_b = this === null || this === void 0 ? void 0 : this.subscription) === null || _b === void 0 ? void 0 : _b.current_period_end_at)) {
            return (index.h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: %s: current period end date */
                wp.i18n.__('Renewal Update - Your plan will be canceled on %s', 'surecart'), this.subscription.current_period_end_at_date) }, tag, ' ', 
            /* translators: %s: current period end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan will be canceled on %s', 'surecart'), this.subscription.current_period_end_at_date)));
        }
        if (this.hasPendingUpdate) {
            if (!this.pendingPrice && !((_d = (_c = this.subscription) === null || _c === void 0 ? void 0 : _c.pending_update) === null || _d === void 0 ? void 0 : _d.ad_hoc_amount)) {
                return index.h("sc-skeleton", null);
            }
            if ((_f = (_e = this.subscription) === null || _e === void 0 ? void 0 : _e.pending_update) === null || _f === void 0 ? void 0 : _f.ad_hoc_amount) {
                return (index.h("span", { "aria-label": wp.i18n.sprintf(
                    /* translators: 1: new price, 2: current period end date */
                    wp.i18n.__('Renewal Update - Your plan switches to %1s on %2s', 'surecart'), formatNumber((_h = (_g = this.subscription) === null || _g === void 0 ? void 0 : _g.pending_update) === null || _h === void 0 ? void 0 : _h.ad_hoc_amount, ((_j = this.pendingPrice) === null || _j === void 0 ? void 0 : _j.currency) || ((_l = (_k = this.subscription) === null || _k === void 0 ? void 0 : _k.price) === null || _l === void 0 ? void 0 : _l.currency)), this.subscription.current_period_end_at_date) }, wp.i18n.__('Your plan switches to', 'surecart'), ' ', index.h("strong", null, index.h("sc-format-number", { type: "currency", currency: ((_m = this.pendingPrice) === null || _m === void 0 ? void 0 : _m.currency) || ((_p = (_o = this.subscription) === null || _o === void 0 ? void 0 : _o.price) === null || _p === void 0 ? void 0 : _p.currency), value: (_r = (_q = this.subscription) === null || _q === void 0 ? void 0 : _q.pending_update) === null || _r === void 0 ? void 0 : _r.ad_hoc_amount }), ' ', price.intervalString(this.pendingPrice || ((_s = this.subscription) === null || _s === void 0 ? void 0 : _s.price))), ' ', wp.i18n.__('on', 'surecart'), " ", this.subscription.current_period_end_at_date));
            }
            return (index.h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: 1: new plan name, 2: current period end date */
                wp.i18n.__('Renewal Update - Your plan switches to %1s on %2s', 'surecart'), this.pendingPrice.product.name, this.subscription.current_period_end_at_date) }, wp.i18n.__('Your plan switches to', 'surecart'), " ", index.h("strong", null, this.pendingPrice.product.name), " ", wp.i18n.__('on', 'surecart'), ' ', this.subscription.current_period_end_at_date));
        }
        if (((_t = this === null || this === void 0 ? void 0 : this.subscription) === null || _t === void 0 ? void 0 : _t.status) === 'trialing' && ((_u = this === null || this === void 0 ? void 0 : this.subscription) === null || _u === void 0 ? void 0 : _u.trial_end_at)) {
            return (index.h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: %s: trial end date */
                wp.i18n.__('Renewal Update - Your plan begins on %s.', 'surecart'), this.subscription.trial_end_at_date) }, tag, ' ', wp.i18n.sprintf(
            /* translators: %s: trial end date */
            wp.i18n.__('Your plan begins on %s', 'surecart'), (_v = this === null || this === void 0 ? void 0 : this.subscription) === null || _v === void 0 ? void 0 : _v.trial_end_at_date)));
        }
        if (((_w = this.subscription) === null || _w === void 0 ? void 0 : _w.status) === 'active' && ((_x = this.subscription) === null || _x === void 0 ? void 0 : _x.current_period_end_at)) {
            return (index.h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: %s: current period end date */
                wp.i18n.__('Renewal Update - Your next payment is on %s', 'surecart'), this.subscription.current_period_end_at_date) }, tag, ' ', ((_y = this.subscription) === null || _y === void 0 ? void 0 : _y.remaining_period_count) === null
                ? /* translators: %s: current period end date */
                    wp.i18n.sprintf(wp.i18n.__('Your plan renews on %s', 'surecart'), this.subscription.current_period_end_at_date)
                : /* translators: %s: current period end date */
                    wp.i18n.sprintf(wp.i18n.__('Your next payment is on %s', 'surecart'), this.subscription.current_period_end_at_date)));
        }
        return tag;
    }
    getActivations() {
        var _a, _b, _c, _d;
        return (((_d = (_c = (_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.purchase) === null || _b === void 0 ? void 0 : _b.license) === null || _c === void 0 ? void 0 : _c.activations) === null || _d === void 0 ? void 0 : _d.data) || []).filter(activation => {
            return activation === null || activation === void 0 ? void 0 : activation.counted;
        });
    }
    renderActivations() {
        var _a;
        const activations = this.getActivations();
        if (!(activations === null || activations === void 0 ? void 0 : activations.length))
            return null;
        return (index.h("sc-flex", { justifyContent: "flex-start", alignItems: "center" }, index.h("sc-tag", { size: "small" }, (_a = activations === null || activations === void 0 ? void 0 : activations[0]) === null || _a === void 0 ? void 0 : _a.name), (activations === null || activations === void 0 ? void 0 : activations.length) > 1 && (index.h("sc-text", { style: { '--font-size': 'var(--sc-font-size-small)', 'cursor': 'pointer' }, onClick: e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.activationsModal = true;
            } }, "+ ", (activations === null || activations === void 0 ? void 0 : activations.length) - 1, " More"))));
    }
    showWarning() {
        var _a, _b, _c, _d, _e, _f, _g;
        // no payment method.
        if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.payment_method) || this.subscription.manual_payment) {
            return false;
        }
        // don't show if not looking for payment.
        if (!['active', 'past_due', 'unpaid', 'incomplete'].includes((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status)) {
            return false;
        }
        // handle ad_hoc.
        if ((_d = (_c = this.subscription) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.ad_hoc) {
            return ((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.ad_hoc_amount) !== 0;
        }
        // show the warning if the subscription is not free.
        return ((_g = (_f = this.subscription) === null || _f === void 0 ? void 0 : _f.price) === null || _g === void 0 ? void 0 : _g.amount) !== 0;
    }
    render() {
        return (index.h("div", { key: '746af28d3128b0da8f1aa894dcc0bec1b1f0f996', class: "subscription-details" }, this.hasPendingUpdate && (index.h("div", { key: '210ede46b07a8ace73b327acb4444fb94f29586d' }, index.h("sc-tag", { key: '969af1e4ebe5b683628da1f4d70d692a01356b04', size: "small", type: "warning" }, wp.i18n.__('Update Scheduled', 'surecart')))), index.h("sc-flex", { key: '688ada18a3b98e3039678865093c60d614aba985', alignItems: "center", justifyContent: "flex-start" }, index.h("sc-text", { key: 'f14c9e7ce84a1e956a6d24b3083494772d7be6f0', "aria-label": wp.i18n.sprintf(
            /* translators: %s: plan name */
            wp.i18n.__('Plan name - %s', 'surecart'), this.renderName()), style: { '--font-weight': 'var(--sc-font-weight-bold)' } }, this.renderName()), this.renderActivations()), !this.hideRenewalText && index.h("div", { key: 'b7beba76996cc98b2943fe0b74e790a0a5a08260' }, this.renderRenewalText(), " "), index.h("slot", { key: '26919ad0c8d6e963ac17722edd436497a33d6d9b' }), index.h("sc-dialog", { key: '6d33abc7b653e8345f39a892c53a12a1587f8f4b', label: wp.i18n.__('Activations', 'surecart'), onScRequestClose: () => (this.activationsModal = false), open: !!this.activationsModal }, index.h("sc-card", { key: 'ce15c11bcc5a4fa3d02cd3820948fb5f45ad2620', "no-padding": true, style: { '--overflow': 'hidden' } }, index.h("sc-stacked-list", { key: '9ccfd914b9e13794b63eb0640280b92eb832f20f' }, (this.getActivations() || []).map(activation => {
            return (index.h("sc-stacked-list-row", { style: { '--columns': '2' }, mobileSize: 0 }, index.h("sc-text", { style: { '--line-height': 'var(--sc-line-height-dense)' } }, index.h("strong", null, activation === null || activation === void 0 ? void 0 : activation.name), index.h("div", null, index.h("sc-text", { style: { '--color': 'var(--sc-color-gray-500)' } }, activation === null || activation === void 0 ? void 0 : activation.fingerprint))), index.h("sc-text", { style: { '--color': 'var(--sc-color-gray-500)' } }, activation === null || activation === void 0 ? void 0 : activation.created_at_date)));
        })))), this.showWarning() && (index.h("div", { key: '7fc4f2f405849158178256de5effd505a1ebb8cc' }, index.h("sc-tag", { key: '21c1f847e72f6b4239780f583d23f4a8426b42b4', type: "warning" }, index.h("div", { key: '899c234708119e05cb2ba0ff02dabe02b4161303', class: "subscription-details__missing-method" }, index.h("sc-icon", { key: '05f851fae92cf4bcc0ecceadc19b4a5ca05bfe45', name: "alert-triangle" }), wp.i18n.__('Payment Method Missing', 'surecart')))))));
    }
    static get watchers() { return {
        "subscription": ["handleSubscriptionChange"]
    }; }
};
ScSubscriptionDetails.style = ScSubscriptionDetailsStyle0;

const scSubscriptionStatusBadgeCss = ":host{display:inline-block}";
const ScSubscriptionStatusBadgeStyle0 = scSubscriptionStatusBadgeCss;

const ScSubscriptionStatusBadge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.status = undefined;
        this.subscription = undefined;
        this.size = 'medium';
        this.pill = false;
        this.clearable = false;
    }
    getType() {
        var _a, _b, _c;
        if ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) {
            return 'info';
        }
        switch (this.status || ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status)) {
            case 'incomplete':
                return 'warning';
            case 'trialing':
                return 'info';
            case 'active':
                return 'success';
            case 'completed':
                return 'success';
            case 'past_due':
                return 'warning';
            case 'canceled':
                if ((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.restore_at) {
                    return 'info';
                }
                return 'danger';
            case 'unpaid':
                return 'warning';
        }
    }
    getText() {
        var _a, _b, _c, _d, _e;
        if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && this.subscription.current_period_end_at && ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status) !== 'canceled') {
            return (index.h(index.Fragment, null, !!((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.restore_at) ? wp.i18n.__('Pauses', 'surecart') : wp.i18n.__('Cancels', 'surecart'), " ", this.subscription.current_period_end_at_date));
        }
        switch (this.status || ((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.status)) {
            case 'incomplete':
                return wp.i18n.__('Incomplete', 'surecart');
            case 'trialing':
                return wp.i18n.__('Trialing', 'surecart');
            case 'active':
                return wp.i18n.__('Active', 'surecart');
            case 'past_due':
                return wp.i18n.__('Past Due', 'surecart');
            case 'canceled':
                if ((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.restore_at) {
                    return 'Paused';
                }
                return wp.i18n.__('Canceled', 'surecart');
            case 'completed':
                return wp.i18n.__('Completed', 'surecart');
            case 'unpaid':
                return wp.i18n.__('Unpaid', 'surecart');
        }
    }
    render() {
        return (index.h("sc-tag", { key: '194460f3977d263ade1bda350c3addf1ce102eaa', "aria-label": wp.i18n.sprintf(wp.i18n.__('Plan Status - %s', 'surecart'), this.getText()), type: this.getType() }, this.getText()));
    }
};
ScSubscriptionStatusBadge.style = ScSubscriptionStatusBadgeStyle0;

exports.sc_subscription_details = ScSubscriptionDetails;
exports.sc_subscription_status_badge = ScSubscriptionStatusBadge;

//# sourceMappingURL=sc-subscription-details_2.cjs.entry.js.map