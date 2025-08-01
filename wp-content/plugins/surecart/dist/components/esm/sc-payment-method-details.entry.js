import { r as registerInstance, h } from './index-745b6bec.js';

const ScPaymentMethodDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.paymentMethod = undefined;
        this.editHandler = undefined;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return (h("sc-card", { key: '6f92c1fe304e4b8932f68b25483d3749942872d8' }, h("sc-flex", { key: 'f96782aa323f35bd29f9eae95dfb6e140a7b329d', alignItems: "center", justifyContent: "flex-start", style: { gap: '0.5em' } }, h("sc-payment-method", { key: '67ee450821a99e281b58cbad5485a66fb07b1bf5', paymentMethod: this.paymentMethod }), h("div", { key: '617588b794e46beca1ce904a59340e21b2d44551' }, !!((_b = (_a = this.paymentMethod) === null || _a === void 0 ? void 0 : _a.card) === null || _b === void 0 ? void 0 : _b.exp_month) && (h("span", { key: '63aa46a191e6c0c94744d42a270bf37bf9282da0' }, 
        // Translators: %d/%d is month and year of expiration.
        wp.i18n.sprintf(wp.i18n.__('Exp. %d/%d', 'surecart'), (_d = (_c = this.paymentMethod) === null || _c === void 0 ? void 0 : _c.card) === null || _d === void 0 ? void 0 : _d.exp_month, (_f = (_e = this.paymentMethod) === null || _e === void 0 ? void 0 : _e.card) === null || _f === void 0 ? void 0 : _f.exp_year))), !!((_h = (_g = this.paymentMethod) === null || _g === void 0 ? void 0 : _g.paypal_account) === null || _h === void 0 ? void 0 : _h.email) && ((_k = (_j = this.paymentMethod) === null || _j === void 0 ? void 0 : _j.paypal_account) === null || _k === void 0 ? void 0 : _k.email)), h("sc-button", { key: '4cdc05529488549073feca45b8c2709aa020a015', type: "text", circle: true, onClick: this.editHandler }, h("sc-icon", { key: 'e10af3deb50845af1b1c0d8ec08955403bf96284', name: "edit-2" })))));
    }
};

export { ScPaymentMethodDetails as sc_payment_method_details };

//# sourceMappingURL=sc-payment-method-details.entry.js.map