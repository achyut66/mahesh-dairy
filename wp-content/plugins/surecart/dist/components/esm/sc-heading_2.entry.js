import { r as registerInstance, h, a as getElement } from './index-745b6bec.js';

const scHeadingCss = ":host{display:block}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.heading--small .heading__title{font-size:var(--sc-font-size-small);text-transform:uppercase}.heading__text{width:100%}.heading__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense);white-space:normal}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);color:var(--sc-color-gray-500)}";
const ScHeadingStyle0 = scHeadingCss;

const ScHeading = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 'medium';
    }
    render() {
        return (h("div", { key: '5622e37d1931a7f91edec9ad503dd0d5f18ea406', part: "base", class: {
                'heading': true,
                'heading--small': this.size === 'small',
                'heading--medium': this.size === 'medium',
                'heading--large': this.size === 'large',
            } }, h("div", { key: '076084414563ea0eabcf7335dacd70b03fa3ec4e', class: { heading__text: true } }, h("div", { key: '4a54cfc78fb007ae4f22199e35238bd3db3da77f', class: "heading__title", part: "title" }, h("slot", { key: 'd1e5bf78dce01cb3e42e633960790c6e0a079a05' })), h("div", { key: '3407175ee5031ebed0b3e324f076dca304aca450', class: "heading__description", part: "description" }, h("slot", { key: 'c34b1e75e83b24b0be4de7df385fde8a64ebfac6', name: "description" }))), h("slot", { key: '5a856191764a21e72351497d306cd01f4120642b', name: "end" })));
    }
    get el() { return getElement(this); }
};
ScHeading.style = ScHeadingStyle0;

const ScOrderConfirmComponentsValidator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.checkout = undefined;
        this.hasManualInstructions = undefined;
    }
    handleOrderChange() {
        var _a;
        if ((_a = this.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment) {
            this.addManualPaymentInstructions();
        }
    }
    addManualPaymentInstructions() {
        var _a, _b;
        if (this.hasManualInstructions)
            return;
        const details = this.el.shadowRoot
            .querySelector('slot')
            .assignedElements({ flatten: true })
            .find(element => element.tagName === 'SC-ORDER-CONFIRMATION-DETAILS');
        const address = document.createElement('sc-order-manual-instructions');
        (_b = (_a = details === null || details === void 0 ? void 0 : details.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore) === null || _b === void 0 ? void 0 : _b.call(_a, address, details);
        this.hasManualInstructions = true;
    }
    componentWillLoad() {
        this.hasManualInstructions = !!this.el.querySelector('sc-order-manual-instructions');
    }
    render() {
        return h("slot", { key: '0f08b5f913d0e1cc1af86d0c267e72e0b6422776' });
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checkout": ["handleOrderChange"]
    }; }
};

export { ScHeading as sc_heading, ScOrderConfirmComponentsValidator as sc_order_confirm_components_validator };

//# sourceMappingURL=sc-heading_2.entry.js.map