'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-8acc3c89.js');
const address = require('./address-4c70d641.js');
const formData = require('./form-data-0da9940f.js');
const index = require('./index-bcdafe6e.js');
const utils = require('./utils-2e91d46c.js');
const pageAlign = require('./page-align-5a2ab493.js');
const index$2 = require('./index-fb76df07.js');
const tax = require('./tax-a4582e73.js');

function sortAddressFields(countryCode, defaultCountryFields, countryFields) {
    const fields = defaultCountryFields || [];
    const fieldsByCountry = countryFields || {};
    if (countryCode && (fieldsByCountry === null || fieldsByCountry === void 0 ? void 0 : fieldsByCountry[countryCode])) {
        fields.forEach(field => {
            var _a;
            if ((_a = fieldsByCountry === null || fieldsByCountry === void 0 ? void 0 : fieldsByCountry[countryCode]) === null || _a === void 0 ? void 0 : _a[field === null || field === void 0 ? void 0 : field.name]) {
                const countryField = fieldsByCountry[countryCode][field.name];
                field.priority = (countryField === null || countryField === void 0 ? void 0 : countryField.priority) || (field === null || field === void 0 ? void 0 : field.priority);
                field.label = (countryField === null || countryField === void 0 ? void 0 : countryField.label) || (field === null || field === void 0 ? void 0 : field.label);
            }
        });
    }
    return fields.sort((a, b) => a.priority - b.priority);
}

/**
 * External dependencies.
 */
const { i18n } = utils.getSerializedState();
const { state, onChange, on, set, get, dispose } = index.createStore({
    countryFields: [],
    defaultCountryFields: [],
    ...i18n,
}, (newValue, oldValue) => {
    return JSON.stringify(newValue) !== JSON.stringify(oldValue);
});

const scAddressCss = ":host{display:block}.sc-address{display:block;position:relative}.sc-address [hidden]{display:none}.sc-address--loading{min-height:230px}.sc-address sc-skeleton{display:block;margin-bottom:1em}.sc-address__control{display:block}.sc-address__control>*{margin-bottom:var(--sc-address-column-spacing, -1px)}.sc-address__columns{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:space-between}.sc-address__columns>*{flex:1;width:50%;margin-right:var(--sc-address-column-spacing, -1px)}.sc-address__columns>*:last-child{margin-right:0}";
const ScAddressStyle0 = scAddressCss;

const ScAddress = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.scChangeAddress = index$1.createEvent(this, "scChangeAddress", 7);
        this.scInputAddress = index$1.createEvent(this, "scInputAddress", 7);
        this.address = {
            country: null,
            city: null,
            line_1: null,
            line_2: null,
            postal_code: null,
            state: null,
        };
        this.names = {
            name: 'shipping_name',
            country: 'shipping_country',
            city: 'shipping_city',
            line_1: 'shipping_line_1',
            line_2: 'shipping_line_2',
            postal_code: 'shipping_postal_code',
            state: 'shipping_state',
        };
        this.loading = false;
        this.disabled = undefined;
        this.label = undefined;
        this.showName = undefined;
        this.showLine2 = undefined;
        this.required = false;
        this.requireName = false;
        this.defaultCountryFields = undefined;
        this.countryFields = undefined;
        this.showCity = true;
        this.showPostal = true;
        this.regions = undefined;
        this.countryChoices = address.countryChoices;
    }
    /** When the state changes, we want to update city and postal fields. */
    handleAddressChange() {
        var _a;
        if (!((_a = this.address) === null || _a === void 0 ? void 0 : _a.country))
            return;
        this.setRegions();
        this.showPostal = address.hasPostal(this.address.country);
        this.showCity = address.hasCity(this.address.country);
        this.scChangeAddress.emit(this.address);
        this.scInputAddress.emit(this.address);
    }
    handleNameChange() {
        if (this.requireName) {
            this.showName = true;
        }
    }
    decodeHtmlEntities(html) {
        var _a;
        return ((_a = new DOMParser().parseFromString(html, 'text/html')) === null || _a === void 0 ? void 0 : _a.body.textContent) || html;
    }
    updateAddress(address) {
        this.address = { ...this.address, ...address };
    }
    handleAddressInput(address) {
        this.scInputAddress.emit({ ...this.address, ...address });
    }
    clearAddress() {
        var _a;
        this.address = {
            name: (_a = this.address) === null || _a === void 0 ? void 0 : _a.name,
            country: null,
            city: null,
            line_1: null,
            line_2: null,
            postal_code: null,
            state: null,
        };
    }
    /** Set the regions based on the country. */
    setRegions() {
        Promise.resolve().then(function () { return require('./data-2282167f.js'); }).then(module => {
            var _a, _b, _c;
            this.regions = (((_a = module === null || module === void 0 ? void 0 : module[this.address.country]) === null || _a === void 0 ? void 0 : _a[2]) || []).map(region => ({
                value: region[1],
                label: this.decodeHtmlEntities(region[0]),
            }));
            if ((_c = (_b = window === null || window === void 0 ? void 0 : window.wp) === null || _b === void 0 ? void 0 : _b.hooks) === null || _c === void 0 ? void 0 : _c.applyFilters) {
                this.regions = window.wp.hooks.applyFilters('surecart_address_regions', this.regions, this.address.country);
            }
        });
    }
    componentWillLoad() {
        var _a;
        this.handleAddressChange();
        const country = ((_a = this.countryChoices.find(country => { var _a; return country.value === ((_a = this.address) === null || _a === void 0 ? void 0 : _a.country); })) === null || _a === void 0 ? void 0 : _a.value) || null;
        // Set default country fields.
        this.defaultCountryFields = this.defaultCountryFields || state.defaultCountryFields || [];
        this.countryFields = this.countryFields || state.countryFields || [];
        this.updateAddress({ country });
        this.handleNameChange();
    }
    async reportValidity() {
        return formData.reportChildrenValidity(this.el);
    }
    /**
     * Compute and return the sorted fields based on current country, defaultCountryFields and countryFields.
     * This method can be used as a computed property.
     */
    sortedFields() {
        var _a, _b, _c;
        const countrySpecificFields = ((_a = this.countryFields) === null || _a === void 0 ? void 0 : _a[(_b = this.address) === null || _b === void 0 ? void 0 : _b.country]) || {};
        const mergedCountryFields = (this.defaultCountryFields || []).map(field => {
            if (countrySpecificFields[field.name]) {
                return {
                    ...field,
                    ...countrySpecificFields[field.name],
                };
            }
            return field;
        });
        return sortAddressFields((_c = this.address) === null || _c === void 0 ? void 0 : _c.country, mergedCountryFields, this.countryFields);
    }
    getRoundedProps(index, length) {
        const isFirst = index === 0;
        const isLast = index === length - 1;
        return {
            squaredTop: isLast,
            squaredBottom: isFirst,
            squared: !isLast && !isFirst,
        };
    }
    render() {
        var _a;
        const visibleFields = ((_a = this.sortedFields()) !== null && _a !== void 0 ? _a : []).filter(field => {
            var _a, _b, _c, _d;
            switch (field.name) {
                case 'name':
                    return this.showName;
                case 'address_2':
                    return this.showLine2 || !!((_b = (_a = this === null || this === void 0 ? void 0 : this.address) === null || _a === void 0 ? void 0 : _a.line_2) === null || _b === void 0 ? void 0 : _b.length);
                case 'city':
                    return this.showCity;
                case 'state':
                    return !!((_c = this === null || this === void 0 ? void 0 : this.regions) === null || _c === void 0 ? void 0 : _c.length) && !!((_d = this === null || this === void 0 ? void 0 : this.address) === null || _d === void 0 ? void 0 : _d.country);
                case 'postcode':
                    return this.showPostal;
                default:
                    return true;
            }
        });
        return (index$1.h("div", { class: "sc-address", part: "base" }, index$1.h("sc-form-control", { label: this.label, exportparts: "label, help-text, form-control", class: "sc-address__control", required: this.required }, visibleFields.map((field, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            const roundedProps = this.getRoundedProps(index, visibleFields.length);
            switch (field.name) {
                case 'country':
                    return (index$1.h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", part: "name__input", value: (_a = this.address) === null || _a === void 0 ? void 0 : _a.country, onScChange: (e) => {
                            var _a;
                            if (e.target.value === ((_a = this.address) === null || _a === void 0 ? void 0 : _a.country))
                                return;
                            this.clearAddress();
                            this.updateAddress({ country: e.target.value });
                        }, choices: this.countryChoices, autocomplete: 'country-name', placeholder: field.label, name: (_b = this.names) === null || _b === void 0 ? void 0 : _b.country, search: true, unselect: false, disabled: this.disabled, required: this.required, "aria-label": field.label, ...roundedProps }));
                case 'name':
                    return (index$1.h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", value: (_c = this === null || this === void 0 ? void 0 : this.address) === null || _c === void 0 ? void 0 : _c.name, onScChange: (e) => this.updateAddress({ name: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ name: e.target.value || null }), autocomplete: "street-address", placeholder: field.label, name: (_d = this.names) === null || _d === void 0 ? void 0 : _d.name, disabled: this.disabled, required: this.requireName, "aria-label": field.label, ...roundedProps }));
                case 'address_1':
                    return (index$1.h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", value: (_e = this === null || this === void 0 ? void 0 : this.address) === null || _e === void 0 ? void 0 : _e.line_1, onScChange: (e) => this.updateAddress({ line_1: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ line_1: e.target.value || null }), autocomplete: "street-address", placeholder: field.label, name: (_f = this.names) === null || _f === void 0 ? void 0 : _f.line_1, disabled: this.disabled, required: this.required, "aria-label": field.label, ...roundedProps }));
                case 'address_2':
                    return (index$1.h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", value: (_g = this === null || this === void 0 ? void 0 : this.address) === null || _g === void 0 ? void 0 : _g.line_2, onScChange: (e) => this.updateAddress({ line_2: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ line_2: e.target.value || null }), autocomplete: "street-address", placeholder: field.label, name: (_h = this.names) === null || _h === void 0 ? void 0 : _h.line_2, disabled: this.disabled, "aria-label": field.label, ...roundedProps }));
                case 'city':
                    return (index$1.h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", placeholder: field.label, name: (_j = this.names) === null || _j === void 0 ? void 0 : _j.city, value: (_k = this === null || this === void 0 ? void 0 : this.address) === null || _k === void 0 ? void 0 : _k.city, onScChange: (e) => this.updateAddress({ city: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ city: e.target.value || null }), required: this.required, disabled: this.disabled, "aria-label": field.label, ...roundedProps }));
                case 'state':
                    return (index$1.h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", placeholder: field.label, name: (_l = this.names) === null || _l === void 0 ? void 0 : _l.state, autocomplete: 'address-level1', value: (_m = this === null || this === void 0 ? void 0 : this.address) === null || _m === void 0 ? void 0 : _m.state, onScChange: (e) => { var _a; return this.updateAddress({ state: e.target.value || ((_a = e.detail) === null || _a === void 0 ? void 0 : _a.value) || null }); }, choices: this.regions, required: this.required, disabled: this.disabled, search: true, "aria-label": field.label, ...roundedProps }));
                case 'postcode':
                    return (index$1.h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", placeholder: field.label, name: (_o = this.names) === null || _o === void 0 ? void 0 : _o.postal_code, onScChange: (e) => this.updateAddress({ postal_code: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ postal_code: e.target.value || null }), autocomplete: 'postal-code', required: this.required, value: (_p = this === null || this === void 0 ? void 0 : this.address) === null || _p === void 0 ? void 0 : _p.postal_code, disabled: this.disabled, maxlength: ((_q = this.address) === null || _q === void 0 ? void 0 : _q.country) === 'US' ? 5 : null, "aria-label": field.label, ...roundedProps }));
                default:
                    return null;
            }
        })), this.loading && index$1.h("sc-block-ui", { exportparts: "base:block-ui, content:block-ui__content" })));
    }
    get el() { return index$1.getElement(this); }
    static get watchers() { return {
        "address": ["handleAddressChange"],
        "requireName": ["handleNameChange"]
    }; }
};
ScAddress.style = ScAddressStyle0;

const scCheckboxCss = ":host{display:block}.checkbox{display:flex;font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-medium);font-weight:var(--sc-input-font-weight);color:var(--sc-input-color);vertical-align:middle;cursor:pointer}.checkbox__control{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sc-checkbox-size);height:var(--sc-checkbox-size);border:solid var(--sc-input-border-width) var(--sc-input-border-color);border-radius:2px;background-color:var(--sc-input-background-color);color:var(--sc-color-white);transition:var(--sc-input-transition, var(--sc-transition-medium)) border-color, var(--sc-input-transition, var(--sc-transition-medium)) opacity, var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.checkbox__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.checkbox__control .checkbox__icon{display:inline-flex;width:var(--sc-checkbox-size);height:var(--sc-checkbox-size)}.checkbox__control .checkbox__icon svg{width:100%;height:100%}.checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover{border-color:var(--sc-input-border-color-hover);background-color:var(--sc-input-background-color-hover)}.checkbox.checkbox--focused:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control{border-color:var(--sc-input-border-color-focus);background-color:var(--sc-input-background-color-focus);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.checkbox--checked .checkbox__control,.checkbox--indeterminate .checkbox__control{border-color:var(--sc-color-primary-500);background-color:var(--sc-color-primary-500)}.checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,.checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover{opacity:0.8}.checkbox.checkbox--checked:not(.checkbox--disabled).checkbox--focused .checkbox__control,.checkbox.checkbox--indeterminate:not(.checkbox--disabled).checkbox--focused .checkbox__control{border-color:var(--sc-color-white);background-color:var(--sc-color-primary-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.checkbox--disabled{opacity:0.5;cursor:not-allowed}.checkbox__label{line-height:var(--sc-checkbox-size);margin-top:var(--sc-input-border-width);margin-left:0.5em;flex:1}.checkbox--is-required .checkbox__label:after{content:\" *\";color:var(--sc-color-danger-500)}::slotted(*){display:inline-block}.checkbox--is-rtl .checkbox__label{margin-left:0;margin-right:0.5em}";
const ScCheckboxStyle0 = scCheckboxCss;

let id = 0;
const ScCheckbox = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.scBlur = index$1.createEvent(this, "scBlur", 7);
        this.scChange = index$1.createEvent(this, "scChange", 7);
        this.scFocus = index$1.createEvent(this, "scFocus", 7);
        this.inputId = `checkbox-${++id}`;
        this.labelId = `checkbox-label-${id}`;
        this.hasFocus = false;
        this.name = undefined;
        this.value = undefined;
        this.disabled = false;
        this.edit = false;
        this.required = false;
        this.checked = false;
        this.indeterminate = false;
        this.invalid = false;
    }
    firstUpdated() {
        this.input.indeterminate = this.indeterminate;
    }
    /** Simulates a click on the checkbox. */
    async triggerClick() {
        return this.input.click();
    }
    /** Sets focus on the checkbox. */
    async triggerFocus(options) {
        return this.input.focus(options);
    }
    /** Removes focus from the checkbox. */
    async triggerBlur() {
        return this.input.blur();
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    async reportValidity() {
        this.invalid = !this.input.checkValidity();
        return this.input.reportValidity();
    }
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message) {
        this.input.setCustomValidity(message);
        this.invalid = !this.input.checkValidity();
    }
    handleClick() {
        this.checked = !this.checked;
        this.indeterminate = false;
    }
    handleBlur() {
        this.hasFocus = false;
        this.scBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.scFocus.emit();
    }
    handleLabelMouseDown() {
        // Prevent clicks on the label from briefly blurring the input
        // event.preventDefault();
        this.input.focus();
    }
    handleStateChange() {
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
        this.scChange.emit();
    }
    componentDidLoad() {
        this.formController = new formData.FormSubmitController(this.el, {
            value: (control) => (control.checked ? control.value : undefined),
        }).addFormData();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.formController) === null || _a === void 0 ? void 0 : _a.removeFormData();
    }
    render() {
        const Tag = this.edit ? 'div' : 'label';
        return (index$1.h(Tag, { key: '8d70fe81ac15659d3c7a318bedf2c09e4f8ae370', part: "base", class: {
                'checkbox': true,
                'checkbox--is-required': this.required,
                'checkbox--checked': this.checked,
                'checkbox--disabled': this.disabled,
                'checkbox--focused': this.hasFocus,
                'checkbox--indeterminate': this.indeterminate,
                'checkbox--is-rtl': pageAlign.isRtl()
            }, htmlFor: this.inputId, onMouseDown: () => this.handleLabelMouseDown() }, index$1.h("span", { key: 'db843c1c0db46159b0288c19eeda4e54640464fa', part: "control", class: "checkbox__control" }, this.checked ? (index$1.h("span", { part: "checked-icon", class: "checkbox__icon" }, index$1.h("svg", { viewBox: "0 0 16 16" }, index$1.h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, index$1.h("g", { stroke: "currentColor", "stroke-width": "2" }, index$1.h("g", { transform: "translate(3.428571, 3.428571)" }, index$1.h("path", { d: "M0,5.71428571 L3.42857143,9.14285714" }), index$1.h("path", { d: "M9.14285714,0 L3.42857143,9.14285714" }))))))) : (''), !this.checked && this.indeterminate ? (index$1.h("span", { part: "indeterminate-icon", class: "checkbox__icon" }, index$1.h("svg", { viewBox: "0 0 16 16" }, index$1.h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, index$1.h("g", { stroke: "currentColor", "stroke-width": "2" }, index$1.h("g", { transform: "translate(2.285714, 6.857143)" }, index$1.h("path", { d: "M10.2857143,1.14285714 L1.14285714,1.14285714" }))))))) : (''), index$1.h("input", { key: '3d7ea3678057cf0507b814ccebaf8779de035746', id: this.inputId, ref: el => (this.input = el), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, required: this.required, role: "checkbox", "aria-checked": this.checked ? 'true' : 'false', "aria-labelledby": this.labelId, onClick: () => this.handleClick(), onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus() })), index$1.h("span", { key: '5655af01105cd2411f61a92c9d2e1556719d2cee', part: "label", id: this.labelId, class: "checkbox__label" }, index$1.h("slot", { key: '3de4e31731a2a675d38e21b95d5dca192002dd78' }))));
    }
    get el() { return index$1.getElement(this); }
    static get watchers() { return {
        "checked": ["handleStateChange"],
        "indeterminate": ["handleStateChange"]
    }; }
};
ScCheckbox.style = ScCheckboxStyle0;

const scTaxIdInputCss = ":host{display:block;z-index:3;position:relative}";
const ScTaxIdInputStyle0 = scTaxIdInputCss;

const ScTaxIdInput = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.scChange = index$1.createEvent(this, "scChange", 7);
        this.scInput = index$1.createEvent(this, "scInput", 7);
        this.scInputType = index$1.createEvent(this, "scInputType", 7);
        this.scSetState = index$1.createEvent(this, "scSetState", 7);
        this.country = undefined;
        this.show = false;
        this.type = 'other';
        this.number = null;
        this.status = 'unknown';
        this.loading = undefined;
        this.help = undefined;
        this.otherLabel = wp.i18n.__('Tax ID', 'surecart');
        this.caGstLabel = wp.i18n.__('GST Number', 'surecart');
        this.auAbnLabel = wp.i18n.__('ABN Number', 'surecart');
        this.gbVatLabel = wp.i18n.__('UK VAT', 'surecart');
        this.euVatLabel = wp.i18n.__('EU VAT', 'surecart');
        this.taxIdTypes = [];
        this.required = false;
    }
    async reportValidity() {
        return this.input.reportValidity();
    }
    onLabelChange() {
        tax.zones.ca_gst.label = this.caGstLabel || tax.zones.ca_gst.label;
        tax.zones.au_abn.label = this.auAbnLabel || tax.zones.au_abn.label;
        tax.zones.gb_vat.label = this.gbVatLabel || tax.zones.gb_vat.label;
        tax.zones.eu_vat.label = this.euVatLabel || tax.zones.eu_vat.label;
        tax.zones.other.label = this.otherLabel || tax.zones.other.label;
    }
    componentWillLoad() {
        this.onLabelChange();
    }
    renderStatus() {
        if (this.status === 'valid') {
            return index$1.h("sc-icon", { name: "check", slot: "prefix", style: { color: 'var(--sc-color-success-500)' } });
        }
        if (this.status === 'invalid') {
            return index$1.h("sc-icon", { name: "x", slot: "prefix", style: { color: 'var(--sc-color-danger-500)' } });
        }
    }
    filteredZones() {
        if (!!this.taxIdTypes.length) {
            return Object.keys(tax.zones)
                .filter(name => this.taxIdTypes.includes(name))
                .reduce((obj, key) => {
                obj[key] = tax.zones[key];
                return obj;
            }, {});
        }
        return tax.zones;
    }
    onTaxIdTypesChange() {
        // If there is no other type, set the first one as default type.
        if (!!this.taxIdTypes.length) {
            this.type = !this.taxIdTypes.includes('other') ? this.taxIdTypes[0] : 'other';
        }
    }
    getZoneLabel() {
        var _a, _b;
        const filteredZones = this.filteredZones() || {};
        // Get the label of the current type or the other type.
        // If there is no other type, get the first one.
        return ((_a = filteredZones === null || filteredZones === void 0 ? void 0 : filteredZones[(this === null || this === void 0 ? void 0 : this.type) || 'other']) === null || _a === void 0 ? void 0 : _a.label) || ((_b = filteredZones === null || filteredZones === void 0 ? void 0 : filteredZones[Object.keys(filteredZones)[0]]) === null || _b === void 0 ? void 0 : _b.label);
    }
    render() {
        var _a, _b, _c, _d, _e;
        return (index$1.h(index$1.Fragment, { key: 'e55c1f3af51d0a38827a451791168042cd50db9b' }, index$1.h("sc-input", { key: 'd1a1a9489286b78f79c37082875a926a7eca42d2', name: "tax_identifier.number_type", required: this.required, value: this.type, style: { display: 'none' } }), index$1.h("sc-input", { key: 'b7692d2e3b98c42edefddc6ee9756ace19127e3c', ref: el => (this.input = el), label: this.getZoneLabel(), "aria-label": wp.i18n.__('Tax ID', 'surecart'), placeholder: wp.i18n.__('Enter Tax ID', 'surecart'), name: "tax_identifier.number", value: this.number, onScInput: (e) => {
                e.stopImmediatePropagation();
                this.scInput.emit({
                    number: e.target.value,
                    number_type: this.type || 'other',
                });
            }, onScChange: (e) => {
                e.stopImmediatePropagation();
                this.scChange.emit({
                    number: e.target.value,
                    number_type: this.type || 'other',
                });
            }, help: this.help, required: this.required }, this.loading && this.type === 'eu_vat' ? index$1.h("sc-spinner", { slot: "prefix", style: { '--spinner-size': '10px' } }) : this.renderStatus(), ((_a = Object.keys(this.filteredZones() || {})) === null || _a === void 0 ? void 0 : _a.length) === 1 ? (index$1.h("span", { slot: "suffix" }, (_c = (_b = Object.values(this.filteredZones() || {})) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['label_small'])) : (index$1.h("sc-dropdown", { slot: "suffix", position: "bottom-right", role: "select", "aria-multiselectable": "false", "aria-label": wp.i18n.__('Select number type', 'surecart') }, index$1.h("sc-button", { type: "text", slot: "trigger", caret: true, loading: false, style: { color: 'var(--sc-input-label-color)' }, tabindex: "0" }, (_e = (_d = this.filteredZones()) === null || _d === void 0 ? void 0 : _d[(this === null || this === void 0 ? void 0 : this.type) || 'other']) === null || _e === void 0 ? void 0 : _e.label_small), index$1.h("sc-menu", null, Object.keys(this.filteredZones() || {}).map(name => (index$1.h("sc-menu-item", { role: "option", onClick: () => {
                this.scInput.emit({
                    number: this.number,
                    number_type: name,
                });
                this.scChange.emit({
                    number: this.number,
                    number_type: name,
                });
                this.type = name;
            }, onKeyDown: e => {
                var _a;
                if (e.key === 'Enter') {
                    this.scInput.emit({
                        number: this.number,
                        number_type: name,
                    });
                    this.scChange.emit({
                        number: this.number,
                        number_type: name,
                    });
                    this.type = name;
                    (_a = this.input) === null || _a === void 0 ? void 0 : _a.triggerFocus();
                    index$2.speak(wp.i18n.sprintf(wp.i18n.__('%s selected', 'surecart'), tax.zones[name].label_small, 'assertive'));
                }
            }, checked: this.type === name, "aria-selected": this.type === name ? 'true' : 'false', "aria-label": tax.zones[name].label_small }, tax.zones[name].label_small)))))))));
    }
    static get watchers() { return {
        "otherLabel": ["onLabelChange"],
        "caGstLabel": ["onLabelChange"],
        "auAbnLabel": ["onLabelChange"],
        "gbVatLabel": ["onLabelChange"],
        "euVatLabel": ["onLabelChange"],
        "taxIdTypes": ["onTaxIdTypesChange"]
    }; }
};
ScTaxIdInput.style = ScTaxIdInputStyle0;

exports.sc_address = ScAddress;
exports.sc_checkbox = ScCheckbox;
exports.sc_tax_id_input = ScTaxIdInput;

//# sourceMappingURL=sc-address_3.cjs.entry.js.map