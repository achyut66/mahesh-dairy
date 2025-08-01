import { r as registerInstance, h } from './index-745b6bec.js';

const scFeatureDemoBannerCss = ".sc-banner{background-color:var(--sc-color-brand-primary);color:white;display:flex;align-items:center;justify-content:center}.sc-banner>p{font-size:14px;line-height:1;margin:var(--sc-spacing-small)}.sc-banner>p a{color:inherit;font-weight:600;margin-left:10px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}";
const ScFeatureDemoBannerStyle0 = scFeatureDemoBannerCss;

const ScFeatureDemoBanner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.url = 'https://app.surecart.com/plans';
        this.buttonText = wp.i18n.__('Upgrade Your Plan', 'surecart');
    }
    render() {
        return (h("div", { key: '1f18400acf9f833c7796b07dc76b86e437342314', class: { 'sc-banner': true } }, h("p", { key: '033ddf0ae091d55b843f0058ffbc3f2f97d20742' }, h("slot", { key: 'cbbb102a4eb9e13f324a17eaab12a1a2d53df6ee' }, wp.i18n.__('This is a feature demo. In order to use it, you must upgrade your plan.', 'surecart')), h("a", { key: 'e4054dd68291cad9776fa96be3b880bd14a3b47a', href: this.url, target: "_blank" }, h("slot", { key: '120b7d616c4a3489cb0dc3e1115f94fb20c8f871', name: "link" }, this.buttonText, " ", h("sc-icon", { key: '3fa65f7736e18f5b1cb0458cf5b8fee18bb255c6', name: "arrow-right" }))))));
    }
};
ScFeatureDemoBanner.style = ScFeatureDemoBannerStyle0;

export { ScFeatureDemoBanner as sc_feature_demo_banner };

//# sourceMappingURL=sc-feature-demo-banner.entry.js.map