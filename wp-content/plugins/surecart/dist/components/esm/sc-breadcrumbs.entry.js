import { r as registerInstance, h, F as Fragment, a as getElement } from './index-745b6bec.js';

const scBreadcrumbsCss = ":host{display:block}.breadcrumb{display:flex;align-items:center;flex-wrap:wrap}";
const ScBreadcrumbsStyle0 = scBreadcrumbsCss;

const ScBreadcrumbs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = 'Breadcrumb';
    }
    // Generates a clone of the separator element to use for each breadcrumb item
    getSeparator() {
        const slotted = this.el.shadowRoot.querySelector('slot[name=separator]');
        const separator = slotted.assignedElements({ flatten: true })[0];
        // Clone it, remove ids, and slot it
        const clone = separator.cloneNode(true);
        [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
        clone.slot = 'separator';
        return clone;
    }
    handleSlotChange() {
        const slotted = this.el.shadowRoot.querySelector('.breadcrumb slot');
        const items = slotted.assignedElements().filter(node => {
            return node.nodeName === 'CE-BREADCRUMB';
        });
        items.forEach((item, index) => {
            // Append separators to each item if they don't already have one
            const separator = item.querySelector('[slot="separator"]');
            if (separator === null) {
                item.append(this.getSeparator());
            }
            // The last breadcrumb item is the "current page"
            if (index === items.length - 1) {
                item.setAttribute('aria-current', 'page');
            }
            else {
                item.removeAttribute('aria-current');
            }
        });
    }
    render() {
        return (h(Fragment, { key: 'fdd228b073b3eb07aa6bcbd2c6e536e3c14c1105' }, h("nav", { key: 'fb1e88a4dc12e861a9dbcf65d3b4549318f2289d', part: "base", class: "breadcrumb", "aria-label": this.label }, h("slot", { key: 'f8b26472d614a1bc1c6be0526dbf84bed7161a9e', onSlotchange: () => this.handleSlotChange() })), h("div", { key: '45e0240377ba862fe77a9dabeed14c1a5ab36e35', part: "separator", hidden: true, "aria-hidden": "true" }, h("slot", { key: '89afd7a282a6c43ecfadaac2d38e6da993e97bdf', name: "separator" }, h("sc-icon", { key: '21cc11df2002e9a1d7f0aabd50c098a1e0ef1843', name: "chevron-right" })))));
    }
    get el() { return getElement(this); }
};
ScBreadcrumbs.style = ScBreadcrumbsStyle0;

export { ScBreadcrumbs as sc_breadcrumbs };

//# sourceMappingURL=sc-breadcrumbs.entry.js.map