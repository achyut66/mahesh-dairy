import { r as registerInstance, h, a as getElement } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { o as onFirstVisible } from './lazy-deb42890.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scPaymentMethodsListCss = ":host{display:block;position:relative}.payment-methods-list{display:grid;gap:0.5em}.payment-methods-list sc-heading a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.payment-id{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}";
const ScPaymentMethodsListStyle0 = scPaymentMethodsListCss;

const ScPaymentMethodsList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.query = undefined;
        this.heading = undefined;
        this.isCustomer = undefined;
        this.canDetachDefaultPaymentMethod = false;
        this.paymentMethods = [];
        this.loading = undefined;
        this.busy = undefined;
        this.error = undefined;
        this.hasTitleSlot = undefined;
        this.editPaymentMethod = false;
        this.deletePaymentMethod = false;
        this.cascadeDefaultPaymentMethod = false;
    }
    /** Only fetch if visible */
    componentWillLoad() {
        onFirstVisible(this.el, () => this.getPaymentMethods());
        this.handleSlotChange();
    }
    handleSlotChange() {
        this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
    }
    /**
     * Delete the payment method.
     */
    async deleteMethod() {
        var _a;
        if (!this.deletePaymentMethod)
            return;
        try {
            this.busy = true;
            (await apiFetch({
                path: `surecart/v1/payment_methods/${(_a = this.deletePaymentMethod) === null || _a === void 0 ? void 0 : _a.id}/detach`,
                method: 'PATCH',
            }));
            // remove from view.
            this.paymentMethods = this.paymentMethods.filter(m => { var _a; return m.id !== ((_a = this.deletePaymentMethod) === null || _a === void 0 ? void 0 : _a.id); });
            this.deletePaymentMethod = false;
        }
        catch (e) {
            alert((e === null || e === void 0 ? void 0 : e.messsage) || wp.i18n.__('Something went wrong', 'surecart'));
        }
        finally {
            this.busy = false;
        }
    }
    /**
     * Set the default payment method.
     */
    async setDefault() {
        var _a, _b, _c;
        if (!this.editPaymentMethod)
            return;
        try {
            this.error = '';
            this.busy = true;
            (await apiFetch({
                path: `surecart/v1/customers/${(_b = (_a = this.editPaymentMethod) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.id}`,
                method: 'PATCH',
                data: {
                    default_payment_method: (_c = this.editPaymentMethod) === null || _c === void 0 ? void 0 : _c.id,
                    cascade_default_payment_method: this.cascadeDefaultPaymentMethod,
                },
            }));
            this.editPaymentMethod = false;
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
        try {
            this.busy = true;
            this.paymentMethods = (await apiFetch({
                path: addQueryArgs(`surecart/v1/payment_methods/`, {
                    expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
                    ...this.query,
                }),
            }));
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all paymentMethods */
    async getPaymentMethods() {
        if (!this.isCustomer) {
            return;
        }
        try {
            this.loading = true;
            this.paymentMethods = (await apiFetch({
                path: addQueryArgs(`surecart/v1/payment_methods/`, {
                    expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
                    ...this.query,
                    per_page: 100,
                }),
            }));
        }
        catch (e) {
            console.error(this.error);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    renderLoading() {
        return (h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
    }
    renderEmpty() {
        return (h("div", null, h("sc-divider", { style: { '--spacing': '0' } }), h("slot", { name: "empty" }, h("sc-empty", { icon: "credit-card" }, wp.i18n.__("You don't have any saved payment methods.", 'surecart')))));
    }
    renderPaymentMethodActions(paymentMethod) {
        const { id, customer } = paymentMethod;
        // If this is a string, don't show the actions.
        if (typeof customer === 'string')
            return;
        // If this is the default payment method and it cannot be detached, don't show the actions.
        if (customer.default_payment_method === id && !this.canDetachDefaultPaymentMethod)
            return;
        return (h("sc-dropdown", { placement: "bottom-end", slot: "suffix" }, h("sc-icon", { role: "button", tabIndex: 0, name: "more-horizontal", slot: "trigger" }), h("sc-menu", null, customer.default_payment_method !== id && h("sc-menu-item", { onClick: () => (this.editPaymentMethod = paymentMethod) }, wp.i18n.__('Make Default', 'surecart')), h("sc-menu-item", { onClick: () => (this.deletePaymentMethod = paymentMethod) }, wp.i18n.__('Delete', 'surecart')))));
    }
    renderList() {
        return this.paymentMethods.map(paymentMethod => {
            const { id, card, customer, live_mode, billing_agreement, paypal_account } = paymentMethod;
            return (h("sc-stacked-list-row", { style: { '--columns': billing_agreement ? '2' : '3' } }, h("sc-payment-method", { paymentMethod: paymentMethod }), h("div", { class: "payment-id" }, !!(card === null || card === void 0 ? void 0 : card.exp_month) && (h("span", null, wp.i18n.__('Exp.', 'surecart'), card === null || card === void 0 ? void 0 :
                card.exp_month, "/", card === null || card === void 0 ? void 0 :
                card.exp_year)), !!paypal_account && (paypal_account === null || paypal_account === void 0 ? void 0 : paypal_account.email)), h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em', 'marginLeft': 'auto' } }, typeof customer !== 'string' && (customer === null || customer === void 0 ? void 0 : customer.default_payment_method) === id && h("sc-tag", { type: "info" }, wp.i18n.__('Default', 'surecart')), !live_mode && h("sc-tag", { type: "warning" }, wp.i18n.__('Test', 'surecart'))), this.renderPaymentMethodActions(paymentMethod)));
        });
    }
    renderContent() {
        var _a;
        if (!this.isCustomer) {
            return this.renderEmpty();
        }
        if (this.loading) {
            return this.renderLoading();
        }
        if (((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.renderEmpty();
        }
        return (h("sc-card", { "no-padding": true }, h("sc-stacked-list", null, this.renderList())));
    }
    handleEditPaymentMethodChange() {
        // reset when payment method edit changes
        this.cascadeDefaultPaymentMethod = false;
    }
    render() {
        return (h("sc-dashboard-module", { key: '09086ce17be8b594ef853c09491abfd1aab72f8b', class: "payment-methods-list", error: this.error }, h("span", { key: '0f4042bc2ba34bebdcf8ff3a3d1a82c652c20834', slot: "heading" }, h("slot", { key: '8992d01e035f1569bf10289c01f7210b89fb540f', name: "heading" }, this.heading || wp.i18n.__('Payment Methods', 'surecart'))), this.isCustomer && (h("sc-flex", { key: '4964d240006bc4fef96ba5aace156ff63ef7bcdf', slot: "end" }, h("sc-button", { key: 'd7be77e382596d116c5c7ac8e9b8f9ac536c55bc', type: "link", href: addQueryArgs(window.location.href, {
                action: 'index',
                model: 'charge',
            }) }, h("sc-icon", { key: '11a73f682c0c273370d4cd7d7147c9cc8b3a0bd3', name: "clock", slot: "prefix" }), wp.i18n.__('Payment History', 'surecart')), h("sc-button", { key: 'fd5c50131480992ab0113b00e1fd3aa593223ae7', type: "link", href: addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
            }) }, h("sc-icon", { key: '0cd83a86511cbc2d6d281095d741208ea385cbc3', name: "plus", slot: "prefix" }), wp.i18n.__('Add', 'surecart')))), this.renderContent(), h("sc-dialog", { key: '5447af802b1ee6a6f32540e2ca2ab8f335293a67', open: !!this.editPaymentMethod, label: wp.i18n.__('Update Default Payment Method', 'surecart'), onScRequestClose: () => (this.editPaymentMethod = false) }, h("sc-alert", { key: 'a3a6c10617d51f595099b5b97a8a144f909290b4', type: "danger", open: !!this.error }, this.error), h("sc-flex", { key: '9e6697935c04b3b981a30a3daf1a52bb49fb291c', flexDirection: "column", style: { '--sc-flex-column-gap': 'var(--sc-spacing-small)' } }, h("sc-alert", { key: '9d5f4797da099bf02e1ca5ff90658d01ca4c57fa', type: "info", open: true }, wp.i18n.__('A default payment method will be used as a fallback in case other payment methods get removed from a subscription.', 'surecart')), h("sc-switch", { key: '51001ae2b9d7d12f5dd4a9b9361d7a0a90a1b7f7', checked: this.cascadeDefaultPaymentMethod, onScChange: e => (this.cascadeDefaultPaymentMethod = e.target.checked) }, wp.i18n.__('Update All Subscriptions', 'surecart'), h("span", { key: 'cd26b31724ccead67060c4334c8991a4546aa1a7', slot: "description" }, wp.i18n.__('Update all existing subscriptions to use this payment method', 'surecart')))), h("div", { key: 'e1a5d9e349f6bf5ba905cdde237d63391a8807c9', slot: "footer" }, h("sc-button", { key: 'f4fba760ebc187829cef89c3b9ae1a77bbe383ce', type: "text", onClick: () => (this.editPaymentMethod = false) }, wp.i18n.__('Cancel', 'surecart')), h("sc-button", { key: '5b59935d49e8e4a5a41cac63aceb87779327b7e8', type: "primary", onClick: () => this.setDefault() }, wp.i18n.__('Make Default', 'surecart'))), this.busy && h("sc-block-ui", { key: '15e2803eee6e4ebd748a7008302a558b62227558', spinner: true })), h("sc-dialog", { key: 'baa7c067b601e067ccacfe4f2a7188e0686aa651', open: !!this.deletePaymentMethod, label: wp.i18n.__('Delete Payment Method', 'surecart'), onScRequestClose: () => (this.deletePaymentMethod = false) }, h("sc-alert", { key: '73a1d582bcfdcfcd1d7fe8e4a420d75b1509a770', type: "danger", open: !!this.error }, this.error), h("sc-text", { key: 'ec6593d06be8281b34de144b10a50ca763b31932' }, wp.i18n.__('Are you sure you want to remove this payment method?', 'surecart')), h("div", { key: 'ff9c10f3f73b96f74202b713a1ef49b9010a943b', slot: "footer" }, h("sc-button", { key: 'cd7da50146bdb32ed71e1921e0c2afc34d2de967', type: "text", onClick: () => (this.deletePaymentMethod = false) }, wp.i18n.__('Cancel', 'surecart')), h("sc-button", { key: 'b4073082365b1273454e650035a1d028fb2ffc5d', type: "primary", onClick: () => this.deleteMethod() }, wp.i18n.__('Delete', 'surecart'))), this.busy && h("sc-block-ui", { key: 'ec25d336cc92f6ffbb0523111280f8511240e5ef', spinner: true })), this.busy && h("sc-block-ui", { key: '85f275ed626a40033d725298de6cdc601efa137d', spinner: true })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "editPaymentMethod": ["handleEditPaymentMethodChange"]
    }; }
};
ScPaymentMethodsList.style = ScPaymentMethodsListStyle0;

export { ScPaymentMethodsList as sc_payment_methods_list };

//# sourceMappingURL=sc-payment-methods-list.entry.js.map