'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const currency = require('./currency-71fce0f0.js');

const UNIT_TYPES = {
    kg: 'kilogram',
    lb: 'pound',
    g: 'gram',
    oz: 'ounce',
};
const ScFormatNumber = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.value = 0;
        this.locale = undefined;
        this.type = 'decimal';
        this.noGrouping = false;
        this.currency = 'USD';
        this.currencyDisplay = 'symbol';
        this.minimumIntegerDigits = undefined;
        this.minimumFractionDigits = null;
        this.maximumFractionDigits = undefined;
        this.minimumSignificantDigits = undefined;
        this.maximumSignificantDigits = undefined;
        this.noConvert = undefined;
        this.unit = 'lb';
    }
    render() {
        if (isNaN(this.value)) {
            return '';
        }
        const lang = navigator.language || (navigator === null || navigator === void 0 ? void 0 : navigator.browserLanguage) || (navigator.languages || ['en'])[0];
        // maybe convert zero decimal currencies.
        const value = this.noConvert || this.type !== 'currency' ? this.value : currency.maybeConvertAmount(this.value, this.currency.toUpperCase());
        // decide how many decimal places to use.
        const minimumFractionDigits = value % 1 == 0 ? 0 : 2;
        return new Intl.NumberFormat(this.locale || lang, {
            style: this.type,
            currency: this.currency.toUpperCase(),
            currencyDisplay: this.currencyDisplay,
            useGrouping: !this.noGrouping,
            minimumIntegerDigits: this.minimumIntegerDigits,
            minimumFractionDigits: this.minimumFractionDigits !== null ? this.minimumFractionDigits : minimumFractionDigits,
            maximumFractionDigits: this.maximumFractionDigits,
            minimumSignificantDigits: this.minimumSignificantDigits,
            maximumSignificantDigits: this.maximumSignificantDigits,
            unit: UNIT_TYPES[this.unit],
        }).format(value);
    }
};

exports.sc_format_number = ScFormatNumber;

//# sourceMappingURL=sc-format-number.cjs.entry.js.map