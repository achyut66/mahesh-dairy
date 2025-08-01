'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const index$1 = require('./index-fb76df07.js');
const mutations = require('./mutations-10a18c83.js');
const getters = require('./getters-87b7ef91.js');
const animationRegistry = require('./animation-registry-f7f1a08b.js');
require('./index-bcdafe6e.js');
require('./utils-2e91d46c.js');
require('./remove-query-args-b57e8cd3.js');
require('./add-query-args-49dcb630.js');
require('./google-59d23803.js');
require('./currency-71fce0f0.js');
require('./store-4a539aea.js');
require('./price-5b1afcfe.js');

const scOrderSummaryCss = ":host{display:block;font-family:var(--sc-font-sans);font-size:var(--sc-checkout-font-size, 16px)}.collapse-link{display:flex;align-items:center;gap:0.35em}.summary__content--empty{display:none}.collapse-link__icon{width:18px;height:18px;color:var(--sc-order-collapse-link-icon-color, var(--sc-color-gray-500))}.item__product+.item__product{margin-top:20px}.empty{color:var(--sc-order-summary-color, var(--sc-color-gray-500))}.price{display:inline-block;opacity:0;visibility:hidden;transform:translateY(5px);transition:var(--sc-input-transition, var(--sc-transition-medium)) visibility ease, var(--sc-input-transition, var(--sc-transition-medium)) opacity ease, var(--sc-input-transition, var(--sc-transition-medium)) transform ease}.price--collapsed{opacity:1;visibility:visible;transform:translateY(0)}.summary{position:relative;user-select:none;cursor:pointer}.summary .collapse-link__icon{transition:transform 0.25s ease-in-out}.summary .scratch-price{text-decoration:line-through;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-small);margin-right:var(--sc-spacing-xx-small)}.summary--open .collapse-link__icon{transform:rotate(180deg)}::slotted(*){margin:4px 0 !important}::slotted(sc-divider){margin:20px 0 !important}sc-line-item~sc-line-item{margin-top:14px}.total-price{white-space:nowrap}";
const ScOrderSummaryStyle0 = scOrderSummaryCss;

const ScOrderSummary = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scShow = index.createEvent(this, "scShow", 7);
        this.scHide = index.createEvent(this, "scHide", 7);
        this.order = undefined;
        this.busy = undefined;
        this.orderSummaryText = wp.i18n.__('Summary', 'surecart');
        this.invoiceSummaryText = wp.i18n.__('Invoice Summary', 'surecart');
        this.collapsible = false;
        this.collapsedOnMobile = false;
        this.collapsedOnDesktop = undefined;
        this.collapsed = false;
    }
    isMobileScreen() {
        var _a, _b;
        const bodyRect = (_a = document.body) === null || _a === void 0 ? void 0 : _a.getClientRects();
        return (bodyRect === null || bodyRect === void 0 ? void 0 : bodyRect.length) && ((_b = bodyRect[0]) === null || _b === void 0 ? void 0 : _b.width) < 781;
    }
    componentWillLoad() {
        if (this.isMobileScreen()) {
            this.collapsed = this.collapsed || this.collapsedOnMobile;
        }
        else {
            this.collapsed = this.collapsed || this.collapsedOnDesktop;
        }
        this.handleOpenChange();
    }
    handleClick(e) {
        e.preventDefault();
        if (this.empty() && !getters.formBusy())
            return;
        this.collapsed = !this.collapsed;
    }
    /** It's empty if there are no items or the mode does not match. */
    empty() {
        var _a, _b, _c, _d;
        return !((_c = (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.count) || (((_d = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.live_mode) ? (mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.mode) === 'test' : (mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.mode) === 'live');
    }
    getSummaryText() {
        var _a, _b;
        // If we have an invoice, show the invoice summary text instead.
        if ((_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.invoice) === null || _b === void 0 ? void 0 : _b.id) {
            return this.invoiceSummaryText || wp.i18n.__('Invoice Summary', 'surecart');
        }
        return this.orderSummaryText || wp.i18n.__('Summary', 'surecart');
    }
    renderHeader() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // busy state
        if ((getters.formBusy() || getters.formLoading()) && !((_c = (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length)) {
            return (index.h("sc-line-item", null, index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "price", style: { 'width': '70px', 'display': 'inline-block', '--border-radius': '6px' } }), index.h("sc-skeleton", { slot: "currency", style: { width: '30px', display: 'inline-block' } })));
        }
        return (index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { class: "collapse-link", slot: "title", onClick: e => this.handleClick(e), tabIndex: 0, "aria-label": wp.i18n.sprintf(wp.i18n.__('Order Summary %s', 'surecart'), this.collapsed ? wp.i18n.__('collapsed', 'surecart') : wp.i18n.__('expanded', 'surecart')), onKeyDown: e => {
                if (e.key === ' ') {
                    this.handleClick(e);
                    index$1.speak(wp.i18n.sprintf(wp.i18n.__('Order Summary %s', 'surecart'), this.collapsed ? wp.i18n.__('collapsed', 'surecart') : wp.i18n.__('expanded', 'surecart')), 'assertive');
                }
            } }, this.getSummaryText(), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "collapse-link__icon", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M19 9l-7 7-7-7" }))), index.h("span", { slot: "description" }, index.h("slot", { name: "description" })), ((_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.total_amount) !== ((_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.amount_due) ? (index.h("span", { slot: "price", class: { 'price': true, 'price--collapsed': this.collapsed } }, (_f = mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.amount_due_display_amount)) : (index.h("span", { slot: "price", class: { 'price': true, 'price--collapsed': this.collapsed } }, !!((_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.total_savings_amount) && index.h("span", { class: "total-price scratch-price" }, (_h = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _h === void 0 ? void 0 : _h.total_scratch_display_amount), index.h("sc-total", { class: "total-price", total: 'total' })))));
    }
    async handleOpenChange() {
        if (!this.collapsed) {
            this.scShow.emit();
            await animationRegistry.stopAnimations(this.body);
            this.body.hidden = false;
            this.body.style.overflow = 'hidden';
            const { keyframes, options } = animationRegistry.getAnimation(this.el, 'summary.show');
            await animationRegistry.animateTo(this.body, animationRegistry.shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
            this.body.style.height = 'auto';
            this.body.style.overflow = 'visible';
        }
        else {
            this.scHide.emit();
            await animationRegistry.stopAnimations(this.body);
            this.body.style.overflow = 'hidden';
            const { keyframes, options } = animationRegistry.getAnimation(this.el, 'summary.hide');
            await animationRegistry.animateTo(this.body, animationRegistry.shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
            this.body.hidden = true;
            this.body.style.height = 'auto';
            this.body.style.overflow = 'visible';
        }
    }
    render() {
        return (index.h("div", { key: 'a428b2c759c6a23c9b87329dc960b9b04ff51b1b', class: { 'summary': true, 'summary--open': !this.collapsed } }, this.collapsible && this.renderHeader(), index.h("div", { key: 'fa85e3d0a63d244f715b6998cbccdd9c1e028a4d', ref: el => (this.body = el), class: {
                'summary__content': true,
                'summary__content--empty': this.empty() && !getters.formBusy(),
            } }, index.h("slot", { key: '26206a08fd8a4e2aadb4eed8f5920e946202b765' })), this.empty() && !getters.formBusy() && index.h("p", { key: 'a7805d38a3f5642d9e48b0bb49287c9c8d594d1b', class: "empty" }, wp.i18n.__('Your cart is empty.', 'surecart'))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "collapsed": ["handleOpenChange"]
    }; }
};
animationRegistry.setDefaultAnimation('summary.show', {
    keyframes: [
        { height: '0', opacity: '0' },
        { height: 'auto', opacity: '1' },
    ],
    options: { duration: 250, easing: 'ease' },
});
animationRegistry.setDefaultAnimation('summary.hide', {
    keyframes: [
        { height: 'auto', opacity: '1' },
        { height: '0', opacity: '0' },
    ],
    options: { duration: 250, easing: 'ease' },
});
ScOrderSummary.style = ScOrderSummaryStyle0;

exports.sc_order_summary = ScOrderSummary;

//# sourceMappingURL=sc-order-summary.cjs.entry.js.map