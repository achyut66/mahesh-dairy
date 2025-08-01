import { r as registerInstance, h } from './index-745b6bec.js';
import { s as state } from './mutations-6bbbe793.js';
import { u as updateCheckoutLineItem, r as removeCheckoutLineItem } from './mutations-68705e5e.js';
import { f as formBusy } from './getters-487612aa.js';
import { g as getMaxStockQuantity } from './quantity-1f39f750.js';
import './index-06061d4e.js';
import './utils-cd1431df.js';
import './remove-query-args-938c53ea.js';
import './add-query-args-0e2a8393.js';
import './index-c5a96d53.js';
import './google-a86aa761.js';
import './currency-a0c9bff4.js';
import './store-627acec4.js';
import './price-af9f0dbf.js';
import './mutations-ed6d0770.js';
import './index-a2617916.js';
import './fetch-8ecbbe53.js';

const scLineItemsCss = ":host{display:block}:slotted(*~*){margin-top:20px}.line-items{display:grid;gap:var(--sc-form-row-spacing)}.line-item{display:grid;gap:var(--sc-spacing-small)}.line-item--has-swap{border:1px solid var(--sc-input-border-color);background:#fff;border-radius:var(--sc-border-radius-medium);gap:0;border-radius:var(--sc-input-border-radius-medium);overflow:hidden}.line-item--has-swap sc-product-line-item{padding:var(--sc-spacing-medium);border-bottom:solid var(--sc-input-border-width) var(--sc-input-border-color)}.line-item--has-swap sc-swap{padding:var(--sc-spacing-medium);background:var(--sc-color-gray-50)}sc-swap{font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense);color:var(--sc-input-label-color)}.fee__description{opacity:0.75}";
const ScLineItemsStyle0 = scLineItemsCss;

const ScLineItems = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.editable = undefined;
        this.removable = undefined;
    }
    /**
     * Is the line item editable?
     */
    isEditable(item) {
        var _a;
        // ad_hoc prices and bumps cannot have quantity.
        if (((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.ad_hoc) || (item === null || item === void 0 ? void 0 : item.bump_amount) || (item === null || item === void 0 ? void 0 : item.locked)) {
            return false;
        }
        return this.editable;
    }
    render() {
        var _a, _b, _c, _d, _e;
        if (!!formBusy() && !((_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length)) {
            return (h("sc-line-item", null, h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
        }
        // Sort items so that items with swaps are at the top.
        const sortedItems = (((_e = (_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || []).sort((a, b) => {
            const aHasSwap = (a === null || a === void 0 ? void 0 : a.is_swappable) ? 1 : 0;
            const bHasSwap = (b === null || b === void 0 ? void 0 : b.is_swappable) ? 1 : 0;
            return bHasSwap - aHasSwap;
        });
        return (h("div", { class: "line-items", part: "base", tabindex: "0" }, sortedItems.map(item => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const max = getMaxStockQuantity((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product, item === null || item === void 0 ? void 0 : item.variant);
            return (h("div", { class: `line-item ${(item === null || item === void 0 ? void 0 : item.is_swappable) ? 'line-item--has-swap' : ''}` }, h("sc-product-line-item", { key: item.id, image: item === null || item === void 0 ? void 0 : item.image, name: (_c = (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.name, price: (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.name, variant: item === null || item === void 0 ? void 0 : item.variant_display_options, fees: (_e = item === null || item === void 0 ? void 0 : item.fees) === null || _e === void 0 ? void 0 : _e.data, amount: item.ad_hoc_display_amount ? item.ad_hoc_display_amount : item.subtotal_display_amount, scratch: item.ad_hoc_display_amount ? null : item === null || item === void 0 ? void 0 : item.scratch_display_amount, trial: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.trial_text, interval: `${(_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.short_interval_text} ${(_h = item === null || item === void 0 ? void 0 : item.price) === null || _h === void 0 ? void 0 : _h.short_interval_count_text}`, quantity: item.quantity, purchasableStatus: item === null || item === void 0 ? void 0 : item.purchasable_status_display, ...(max ? { max } : {}), editable: this.isEditable(item), removable: !(item === null || item === void 0 ? void 0 : item.locked) && this.removable, onScUpdateQuantity: e => updateCheckoutLineItem({ id: item.id, data: { quantity: e.detail } }), onScRemove: () => removeCheckoutLineItem(item === null || item === void 0 ? void 0 : item.id), exportparts: "base:line-item, product-line-item, image:line-item__image, text:line-item__text, title:line-item__title, suffix:line-item__suffix, price:line-item__price, price__amount:line-item__price-amount, price__description:line-item__price-description, price__scratch:line-item__price-scratch, static-quantity:line-item__static-quantity, remove-icon__base:line-item__remove-icon, quantity:line-item__quantity, quantity__minus:line-item__quantity-minus, quantity__minus-icon:line-item__quantity-minus-icon, quantity__plus:line-item__quantity-plus, quantity__plus-icon:line-item__quantity-plus-icon, quantity__input:line-item__quantity-input, line-item__price-description:line-item__price-description" }), h("sc-swap", { lineItem: item })));
        })));
    }
};
ScLineItems.style = ScLineItemsStyle0;

export { ScLineItems as sc_line_items };

//# sourceMappingURL=sc-line-items.entry.js.map