'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const pageAlign = require('./page-align-5a2ab493.js');

const scAlertCss = ":host{display:block}[hidden]{display:none !important}::slotted(*:not(:first-child)){margin-top:0.5rem;margin-bottom:0}::slotted(ul){line-height:1.4em;list-style-type:disc;margin:0;padding:0;padding-left:20px}.alert{font-family:var(--sc-input-font-family);font-weight:var(--sc-font-weight-normal);font-size:var(--sc-button-font-size-medium);line-height:var(--sc-line-height-dense);border-radius:var(--sc-alert-border-radius, var(--sc-border-radius-medium));padding:var(--sc-spacing-large);margin-bottom:var(--sc-spacing-large);display:flex;align-items:flex-start;border:var(--sc-alert-border, var(--sc-input-border));border-top:solid var(--sc-alert-border-width, 3px);color:var(--sc-alert-color, var(--sc-input-label-color));background:var(--sc-alert-background-color, var(--sc-color-white));box-shadow:var(--sc-shadow-small)}.alert__text{flex:1}.alert.alert--primary{border-top-color:var(--sc-alert-primary-border-color, var(--sc-color-primary-500))}.alert.alert--primary a{color:var(--sc-color-primary-900)}.alert.alert--primary .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--primary .alert__icon{color:var(--sc-alert-primary-icon-color, var(--sc-color-primary-500))}.alert.alert--info{border-top-color:var(--sc-alert-info-border-color, var(--sc-color-info-500))}.alert.alert--info a{color:var(--sc-color-info-900)}.alert.alert--info .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--info .alert__icon{color:var(--sc-alert-info-icon-color, var(--sc-color-info-500))}.alert.alert--danger{border-top-color:var(--sc-alert-danger-border-color, var(--sc-color-danger-500))}.alert.alert--danger a{color:var(--sc-color-danger-900)}.alert.alert--danger .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--danger .alert__icon{color:var(--sc-alert-danger-icon-color, var(--sc-color-danger-500))}.alert.alert--warning{border-top-color:var(--sc-alert-warning-border-color, var(--sc-color-warning-500))}.alert.alert--warning a{color:var(--sc-color-warning-900)}.alert.alert--warning .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--warning .alert__icon{color:var(--sc-alert-warning-icon-color, var(--sc-color-warning-500))}.alert.alert--success{border-top-color:var(--sc-alert-success-border-color, var(--sc-color-success-500))}.alert.alert--success a{color:var(--sc-color-success-900)}.alert.alert--success .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--success .alert__icon{color:var(--sc-alert-success-icon-color, var(--sc-color-success-500))}.alert__icon{flex:1;flex:0 0 auto;display:flex;align-items:center;font-size:var(--sc-font-size-large);padding-inline-end:var(--sc-spacing-medium)}.alert__title{font-weight:var(--sc-font-weight-semibold)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.alert__close{transition:background-color var(--sc-transition-fast) ease;display:inline-flex;border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-x-small);margin-left:auto;cursor:pointer}.alert__close svg{width:1em;height:1em}.alert--is-rtl{text-align:right}.alert--is-rtl.alert-close{margin-right:auto;margin-left:unset}.alert--is-rtl ::slotted(ul){margin:0;padding:0;padding-right:20px}";
const ScAlertStyle0 = scAlertCss;

const ScAlert = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scHide = index.createEvent(this, "scHide", 7);
        this.scShow = index.createEvent(this, "scShow", 7);
        this.open = false;
        this.title = undefined;
        this.closable = false;
        this.type = 'primary';
        this.duration = Infinity;
        this.scrollOnOpen = undefined;
        this.scrollMargin = '0px';
        this.noIcon = undefined;
        this.autoHideTimeout = undefined;
    }
    /** Shows the alert. */
    async show() {
        if (this.open) {
            return;
        }
        this.open = true;
    }
    /** Hides the alert */
    async hide() {
        if (!this.open) {
            return;
        }
        this.open = false;
    }
    restartAutoHide() {
        clearTimeout(this.autoHideTimeout);
        if (this.open && this.duration < Infinity) {
            this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
        }
    }
    handleMouseMove() {
        this.restartAutoHide();
    }
    handleCloseClick() {
        this.hide();
    }
    /** Emit event when showing or hiding changes */
    handleOpenChange() {
        this.open ? this.scShow.emit() : this.scHide.emit();
        if (this.open && this.scrollOnOpen) {
            this.el.scrollIntoView({ behavior: 'smooth' });
        }
    }
    componentDidLoad() {
        this.handleOpenChange();
    }
    iconName() {
        switch (this.type) {
            case 'danger':
                return 'alert-circle';
            case 'success':
                return 'check-circle';
            case 'warning':
                return 'alert-triangle';
            default:
                return 'info';
        }
    }
    icon() {
        return index.h("sc-icon", { name: this.iconName() });
    }
    render() {
        return (index.h(index.Host, { key: '2c059ebd03c57aca1f1f6d35e328fe0d3c0538a0', style: { 'scroll-margin-top': this.scrollMargin } }, index.h("div", { key: 'cb04522924566b7c43b58c95a54087ebea2af68b', class: {
                'alert': true,
                'alert--primary': this.type === 'primary',
                'alert--success': this.type === 'success',
                'alert--info': this.type === 'info',
                'alert--warning': this.type === 'warning',
                'alert--danger': this.type === 'danger',
                'alert--is-rtl': pageAlign.isRtl()
            }, part: "base", role: "alert", "aria-live": "assertive", "aria-atomic": "true", "aria-hidden": this.open ? 'false' : 'true', hidden: this.open ? false : true, onMouseMove: () => this.handleMouseMove() }, index.h("div", { key: '6937ecc9e14df74497e4f409e50af20e38c04b74', class: "alert__icon", part: "icon" }, index.h("slot", { key: '1259514d48cd63764ef38796460d7c0d5b1bdfb5', name: "icon" }, this.icon())), index.h("div", { key: '196cfc97754fc227fa20cb136bc795bf7caefb76', class: "alert__text", part: "text" }, index.h("div", { key: '41229748190e9df28d0866a04f69498304d01dcc', class: "alert__title", part: "title" }, index.h("slot", { key: '45670eb83b947ca29bdb478451bcffa2bf863c3e', name: "title" }, this.title)), index.h("div", { key: '81629d5516646fb033c912f6e1748fdb6e3cbdd7', class: "alert__message", part: "message" }, index.h("slot", { key: '7e9a94aad5b03a6c6b2885435e8fdd2283e5c071' }))), this.closable && (index.h("span", { key: '3eb799e3c9d410ce1860421c418452f7297ebdd0', part: "close", class: "alert__close", onClick: () => this.handleCloseClick() }, index.h("span", { key: 'eff79c38aca946dfca72b84d26d7826e9d21103f', class: "sr-only" }, "Dismiss"), index.h("svg", { key: '8bad7623b04a8eaa79f555fe8bbf89215f237aab', class: "h-5 w-5", "x-description": "Heroicon name: solid/x", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, index.h("path", { key: '7b0f137e19f6f5080ae6be36b52e118f42f84645', "fill-rule": "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", "clip-rule": "evenodd" })))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
};
ScAlert.style = ScAlertStyle0;

exports.sc_alert = ScAlert;

//# sourceMappingURL=sc-alert.cjs.entry.js.map