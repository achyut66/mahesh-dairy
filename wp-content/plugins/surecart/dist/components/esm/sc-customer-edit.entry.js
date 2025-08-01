import { r as registerInstance, h } from './index-745b6bec.js';
import { a as apiFetch } from './fetch-8ecbbe53.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';

const scCustomerEditCss = ":host{display:block;position:relative}.customer-edit{display:grid;gap:0.75em}";
const ScCustomerEditStyle0 = scCustomerEditCss;

const ScCustomerEdit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = undefined;
        this.customer = undefined;
        this.successUrl = undefined;
        this.i18n = undefined;
        this.loading = undefined;
        this.error = undefined;
    }
    async handleSubmit(e) {
        var _a;
        this.loading = true;
        try {
            const { email, first_name, last_name, phone, billing_matches_shipping, shipping_name, shipping_city, 'tax_identifier.number_type': tax_identifier_number_type, 'tax_identifier.number': tax_identifier_number, shipping_country, shipping_line_1, shipping_postal_code, shipping_state, billing_name, billing_city, billing_country, billing_line_1, billing_postal_code, billing_state, } = await e.target.getFormJson();
            this.customer.billing_address = {
                name: billing_name,
                city: billing_city,
                country: billing_country,
                line_1: billing_line_1,
                postal_code: billing_postal_code,
                state: billing_state,
            };
            this.customer.shipping_address = {
                name: shipping_name,
                city: shipping_city,
                country: shipping_country,
                line_1: shipping_line_1,
                postal_code: shipping_postal_code,
                state: shipping_state,
            };
            await apiFetch({
                path: addQueryArgs(`surecart/v1/customers/${(_a = this.customer) === null || _a === void 0 ? void 0 : _a.id}`, { expand: ['tax_identifier'] }),
                method: 'PATCH',
                data: {
                    email,
                    first_name,
                    last_name,
                    phone,
                    billing_matches_shipping: billing_matches_shipping === true || billing_matches_shipping === 'on',
                    shipping_address: this.customer.shipping_address,
                    billing_address: this.customer.billing_address,
                    ...(tax_identifier_number && tax_identifier_number_type
                        ? {
                            tax_identifier: {
                                number: tax_identifier_number,
                                number_type: tax_identifier_number_type,
                            },
                        }
                        : {}),
                },
            });
            if (this.successUrl) {
                window.location.assign(this.successUrl);
            }
            else {
                this.loading = false;
            }
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
            this.loading = false;
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return (h("sc-dashboard-module", { key: '07d114eecf30ed395330b5b7ddfff3541ba48215', class: "customer-edit", error: this.error }, h("span", { key: '25deba97c1c5fcc1b9b0c34e3f46eedbf745b6cc', slot: "heading" }, this.heading || wp.i18n.__('Update Billing Details', 'surecart'), ' ', !((_a = this === null || this === void 0 ? void 0 : this.customer) === null || _a === void 0 ? void 0 : _a.live_mode) && (h("sc-tag", { key: '41a3e98fc997d2f3ca4117841087c34e0e039f87', type: "warning", size: "small" }, wp.i18n.__('Test', 'surecart')))), h("sc-card", { key: '37385a6d04e6900e32d18703d74a96d3bd8ee6bd' }, h("sc-form", { key: '095458517efb9e61bb94958528a0d775e5098f05', onScFormSubmit: e => this.handleSubmit(e) }, h("sc-columns", { key: '06cb728f04a862bc4b74a7ed471c51154530b6b8', style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, h("sc-column", { key: '0aabe9befbf0112295f034d342b3fe05f5ac8fb6' }, h("sc-input", { key: '0400d0b331f925421183e22d07f463ff0e00a9cc', label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.customer) === null || _b === void 0 ? void 0 : _b.first_name })), h("sc-column", { key: '908c5dbb5f5f5e45eaa2e8b47007e9f82e1fd931' }, h("sc-input", { key: 'f8b956292d5a78f56389c55063a3b68c035d4470', label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.customer) === null || _c === void 0 ? void 0 : _c.last_name }))), h("sc-column", { key: '460a4ecc86a062a38c93563c20aad606e71d01f7' }, h("sc-phone-input", { key: '2f2efc02eaee34d6522307521e80cc3df5fba816', label: wp.i18n.__('Phone', 'surecart'), name: "phone", value: (_d = this.customer) === null || _d === void 0 ? void 0 : _d.phone })), h("sc-flex", { key: '0edd0a2bdb4ab388cf942a54c433e6e0246fe815', style: { '--sc-flex-column-gap': 'var(--sc-spacing-medium)' }, flexDirection: "column" }, h("div", { key: 'f781c94e47d9cd8ae82f63e74b909a624667cf6b' }, h("sc-address", { key: '916a6f1d6fe5291db5933f36b7f0180d833fbfee', label: wp.i18n.__('Shipping Address', 'surecart'), showName: true, address: {
                ...(_e = this.customer) === null || _e === void 0 ? void 0 : _e.shipping_address,
            }, required: false, names: {
                name: 'shipping_name',
                country: 'shipping_country',
                line_1: 'shipping_line_1',
                line_2: 'shipping_line_2',
                city: 'shipping_city',
                postal_code: 'shipping_postal_code',
                state: 'shipping_state',
            }, defaultCountryFields: ((_f = this.i18n) === null || _f === void 0 ? void 0 : _f.defaultCountryFields) || [], countryFields: ((_g = this.i18n) === null || _g === void 0 ? void 0 : _g.countryFields) || [] })), h("div", { key: '851a39f20aafbb11113b44b49a81b7886d256666' }, h("sc-checkbox", { key: '2b2eae9c38bfb7de09481fb96318b989838db0b0', name: "billing_matches_shipping", checked: (_h = this.customer) === null || _h === void 0 ? void 0 : _h.billing_matches_shipping, onScChange: e => {
                this.customer = {
                    ...this.customer,
                    billing_matches_shipping: e.target.checked,
                };
            }, value: "on" }, wp.i18n.__('Billing address is same as shipping', 'surecart'))), h("div", { key: '6d2a3164b9ec45f2b432f0b3b4a6bfd4e3c66f0a', style: { display: ((_j = this.customer) === null || _j === void 0 ? void 0 : _j.billing_matches_shipping) ? 'none' : 'block' } }, h("sc-address", { key: '0df99157b0882a3f8754f4a42bff2fa5fe3991d4', label: wp.i18n.__('Billing Address', 'surecart'), showName: true, address: {
                ...(_k = this.customer) === null || _k === void 0 ? void 0 : _k.billing_address,
            }, names: {
                name: 'billing_name',
                country: 'billing_country',
                line_1: 'billing_line_1',
                line_2: 'billing_line_2',
                city: 'billing_city',
                postal_code: 'billing_postal_code',
                state: 'billing_state',
            }, required: true, defaultCountryFields: ((_l = this.i18n) === null || _l === void 0 ? void 0 : _l.defaultCountryFields) || [], countryFields: ((_m = this.i18n) === null || _m === void 0 ? void 0 : _m.countryFields) || [] })), h("sc-tax-id-input", { key: '51da03a5430806d612e4a4673a5761f3d2e08d21', show: true, number: (_p = (_o = this.customer) === null || _o === void 0 ? void 0 : _o.tax_identifier) === null || _p === void 0 ? void 0 : _p.number, type: (_r = (_q = this.customer) === null || _q === void 0 ? void 0 : _q.tax_identifier) === null || _r === void 0 ? void 0 : _r.number_type })), h("div", { key: 'a12a0ed5c3bc1694285b52ab56c3d11f7a138118' }, h("sc-button", { key: '32a2d734470fecbee07ee8a546ddd178fd96c644', type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && h("sc-block-ui", { key: '3f85836c69662242a912e2f93843005b91da0871', spinner: true })));
    }
};
ScCustomerEdit.style = ScCustomerEditStyle0;

export { ScCustomerEdit as sc_customer_edit };

//# sourceMappingURL=sc-customer-edit.entry.js.map