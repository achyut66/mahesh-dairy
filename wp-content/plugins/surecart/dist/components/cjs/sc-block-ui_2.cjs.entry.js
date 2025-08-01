'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scBlockUiCss = ":host{display:block;position:var(--sc-block-ui-position, absolute);top:-5px;left:-5px;right:-5px;bottom:-5px;overflow:hidden;display:flex;align-items:center;justify-content:center}:host>*{z-index:1}:host:after{content:\"\";position:var(--sc-block-ui-position, absolute);top:0;left:0;right:0;bottom:0;cursor:var(--sc-block-ui-cursor, wait);background:var(--sc-block-ui-background-color, var(--sc-color-white));opacity:var(--sc-block-ui-opacity, 0.15)}:host.transparent:after{background:transparent}.overlay__content{font-size:var(--sc-font-size-large);font-weight:var(--sc-font-weight-semibold);display:grid;gap:0.5em;text-align:center}";
const ScBlockUiStyle0 = scBlockUiCss;

const ScBlockUi = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.zIndex = 1;
        this.transparent = undefined;
        this.spinner = undefined;
    }
    render() {
        return (index.h("div", { key: 'dd58679ef3289448e80d7f131bfb373feff9867b', part: "base", class: { overlay: true, transparent: this.transparent }, style: { 'z-index': this.zIndex.toString() } }, index.h("div", { key: '0ea42adf2a5f8952c01c464dc80b9177086c4240', class: "overlay__content", part: "content" }, index.h("slot", { key: '341a0c75b8b55288cfe0198ba69d568c0320eb49', name: "spinner" }, !this.transparent && this.spinner && index.h("sc-spinner", { key: 'ecaaa1049ca7b31e4426e9dfb519c3ddb6fffa40' })), index.h("slot", { key: '6a1b196acb76b8385bdc7d68621a155536bc6da3' }))));
    }
};
ScBlockUi.style = ScBlockUiStyle0;

const scSpinnerCss = ":host{--track-color:#0d131e20;--indicator-color:var(--sc-color-primary-500);--stroke-width:2px;--spinner-size:1em;display:inline-block}.spinner{display:inline-block;width:var(--spinner-size);height:var(--spinner-size);border-radius:50%;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";
const ScSpinnerStyle0 = scSpinnerCss;

const ScSpinner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("span", { key: '6745e754b0f52996c290e3d7e506ff11c5c5f7a4', part: "base", class: "spinner", "aria-busy": "true", "aria-live": "polite" });
    }
};
ScSpinner.style = ScSpinnerStyle0;

exports.sc_block_ui = ScBlockUi;
exports.sc_spinner = ScSpinner;

//# sourceMappingURL=sc-block-ui_2.cjs.entry.js.map