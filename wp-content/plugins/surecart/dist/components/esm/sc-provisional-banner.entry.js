import { r as registerInstance, h } from './index-745b6bec.js';

const scProvisionalBannerCss = ".sc-banner{background-color:var(--sc-color-brand-primary);color:white;display:flex;align-items:center;justify-content:center}.sc-banner>p{font-size:14px;line-height:1;margin:var(--sc-spacing-small)}.sc-banner>p a{color:inherit;font-weight:600;margin-left:10px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}";
const ScProvisionalBannerStyle0 = scProvisionalBannerCss;

const ScProvisionalBanner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.claimUrl = '';
    }
    render() {
        return (h("div", { key: '9c1a279d59eda1f71ff41b3e92d4b8eb62210a54', class: { 'sc-banner': true } }, h("p", { key: '1ed3981a9c5c94547d15ab8e917b77cd7f386858' }, wp.i18n.__('Complete your store setup to go live.', 'surecart'), h("a", { key: '6cd131b30beb1caf4a62848ab6337a5f8c84a617', href: this.claimUrl, target: "_blank", rel: "noopener noreferrer" }, wp.i18n.__('Complete Setup', 'surecart'), " ", h("sc-icon", { key: 'f570c6b0ce054553413b96eccdb2d07bd8279a81', name: "arrow-right" })))));
    }
};
ScProvisionalBanner.style = ScProvisionalBannerStyle0;

export { ScProvisionalBanner as sc_provisional_banner };

//# sourceMappingURL=sc-provisional-banner.entry.js.map