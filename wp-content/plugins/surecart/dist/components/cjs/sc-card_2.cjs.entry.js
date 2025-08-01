'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scCardCss = ":host{display:block;--overflow:visible}.card{font-family:var(--sc-font-sans);overflow:var(--overflow);display:block}.card:not(.card--borderless){padding:var(--sc-card-padding, var(--sc-spacing-large));background:var(--sc-card-background-color, var(--sc-color-white));border:1px solid var(--sc-card-border-color, var(--sc-color-gray-300));border-radius:var(--sc-input-border-radius-medium);box-shadow:var(--sc-shadow-small)}.card:not(.card--borderless).card--no-padding{padding:0}.title--divider{display:none}.card--has-title-slot .card--title{font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.card--has-title-slot .title--divider{display:block}::slotted(*){margin-bottom:var(--sc-form-row-spacing)}::slotted(*:first-child){margin-top:0}::slotted(*:last-child){margin-bottom:0 !important}";
const ScCardStyle0 = scCardCss;

const ScCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.noDivider = undefined;
        this.borderless = undefined;
        this.noPadding = undefined;
        this.href = undefined;
        this.loading = undefined;
        this.hasTitleSlot = undefined;
    }
    componentWillLoad() {
        this.handleSlotChange();
    }
    handleSlotChange() {
        this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
    }
    render() {
        const Tag = this.href ? 'a' : 'div';
        return (index.h(Tag, { key: 'cfd588654fb558d1ac533a542a80f5fa53dbe5a0', part: "base", class: {
                'card': true,
                'card--borderless': this.borderless,
                'card--no-padding': this.noPadding,
            } }, index.h("slot", { key: 'a92379e9ea082e7824320586ff06e8c533cc88bd' })));
    }
    get el() { return index.getElement(this); }
};
ScCard.style = ScCardStyle0;

const scDashboardModuleCss = ":host{display:block;position:relative}.dashboard-module{display:grid;gap:var(--sc-dashboard-module-spacing, 1em)}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;gap:1em;align-items:center;justify-content:space-between}.heading__text{display:grid;flex:1;gap:calc(var(--sc-dashboard-module-spacing, 1em) / 2)}@media screen and (min-width: 720px){.heading{gap:2em}}.heading__title{font-size:var(--sc-dashbaord-module-heading-size, var(--sc-font-size-x-large));font-weight:var(--sc-dashbaord-module-heading-weight, var(--sc-font-weight-bold));line-height:var(--sc-dashbaord-module-heading-line-height, var(--sc-line-height-dense));white-space:nowrap}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);opacity:0.85}";
const ScDashboardModuleStyle0 = scDashboardModuleCss;

const ScDashboardModule = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.heading = undefined;
        this.error = undefined;
        this.loading = undefined;
    }
    render() {
        return (index.h("div", { key: '6322d656468c83c59d2ea619acaf116c1de3659d', class: "dashboard-module", part: "base" }, !!this.error && (index.h("sc-alert", { key: '28e9774ad74a2ae7b08fd764085aa8baa173fb57', exportparts: "base:error__base, icon:error__icon, text:error__text, title:error__title, message:error__message", open: !!this.error, type: "danger" }, index.h("span", { key: 'ac87578d374d16ec4c6e4397dceb2cf2c4c54541', slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("div", { key: '08a957c21aad43f7a0b0668f3b9482fda6d50fee', class: "heading", part: "heading" }, index.h("div", { key: '505ff6353ef977403f22e56fb7acaf770452252f', class: "heading__text", part: "heading-text" }, index.h("div", { key: '89b5c485caac60b92c9d620605e7fbacb2d1565c', class: "heading__title", part: "heading-title" }, index.h("slot", { key: '9e6b972eeab38c680392506ade72cc1fd191a7c2', name: "heading", "aria-label": this.heading }, this.heading)), index.h("div", { key: 'c51f5ae4eac060f014997a78bad2bc90459abb45', class: "heading__description", part: "heading-description" }, index.h("slot", { key: '78142e2e2d91f09b4fb978f81166362f2d707c54', name: "description" }))), index.h("slot", { key: 'e33cbca8a122fa42ebd12749aa2b5beedc1e8742', name: "end" })), index.h("slot", { key: '2f5a5d98b9205ace8290790b84ef540bc02832c5' })));
    }
};
ScDashboardModule.style = ScDashboardModuleStyle0;

exports.sc_card = ScCard;
exports.sc_dashboard_module = ScDashboardModule;

//# sourceMappingURL=sc-card_2.cjs.entry.js.map