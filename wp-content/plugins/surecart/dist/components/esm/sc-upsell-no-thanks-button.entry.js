import { r as registerInstance, h, H as Host } from './index-745b6bec.js';
import { d as decline } from './mutations-5702cb96.js';
import './fetch-8ecbbe53.js';
import './add-query-args-0e2a8393.js';
import './remove-query-args-938c53ea.js';
import './store-4bc13420.js';
import './utils-cd1431df.js';
import './index-06061d4e.js';
import './watchers-fbf07f32.js';
import './google-dd89f242.js';
import './currency-a0c9bff4.js';
import './google-a86aa761.js';
import './util-50af2a83.js';
import './index-c5a96d53.js';
import './mutations-ed6d0770.js';

const scUpsellNoThanksButtonCss = "sc-upsell-no-thanks-button{display:block}sc-upsell-no-thanks-button p{margin-block-start:0;margin-block-end:1em}sc-upsell-no-thanks-button .wp-block-button__link{position:relative;text-decoration:none}";
const ScUpsellNoThanksButtonStyle0 = scUpsellNoThanksButtonCss;

const ScUpsellNoThanksButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: '490adbfe64f3c4661284cd74c85b56e4575b36fc', onClick: () => decline() }, h("slot", { key: 'ec79ec99b39e1e59c0e0f8d21eb2ad902fbd8aed' })));
    }
};
ScUpsellNoThanksButton.style = ScUpsellNoThanksButtonStyle0;

export { ScUpsellNoThanksButton as sc_upsell_no_thanks_button };

//# sourceMappingURL=sc-upsell-no-thanks-button.entry.js.map