'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const pageAlign = require('./page-align-5a2ab493.js');

const scTabCss = ":host{display:block}.tab{font-family:var(--sc-font-sans);color:var(--sc-color-gray-600);display:flex;align-items:center;justify-content:flex-start;line-height:1;padding:var(--sc-spacing-small) var(--sc-spacing-small);font-size:var(--sc-font-size-medium);font-weight:var(--sc-font-weight-semibold);border-radius:var(--sc-border-radius-small);cursor:pointer;transition:color 0.35s ease, background-color 0.35s ease;user-select:none;text-decoration:none}.tab.tab--active,.tab:hover{color:var(--sc-tab-active-color, var(--sc-color-gray-900));background-color:var(--sc-tab-active-background, var(--sc-color-gray-100))}.tab.tab--disabled{cursor:not-allowed;color:var(--sc-color-gray-400)}.tab__content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:var(--sc-line-height-dense)}.tab__prefix,.tab__suffix{flex:0 0 auto;display:flex;align-items:center}.tab__suffix{margin-left:auto}.tab__counter{background:var(--sc-color-gray-200);display:inline-block;padding:var(--sc-spacing-xx-small) var(--sc-spacing-small);border-radius:var(--sc-border-radius-pill);font-size:var(--sc-font-size-small);text-align:center;line-height:1;transition:color 0.35s ease, background-color 0.35s ease}.tab.tab--active .tab__counter,.tab:hover .tab__counter{background:var(--sc-color-white)}.tab--has-prefix{padding-left:var(--sc-spacing-small)}.tab--has-prefix .tab__content{padding-left:var(--sc-spacing-small)}.tab--has-suffix{padding-right:var(--sc-spacing-small)}.tab--has-suffix .tab__label{padding-right:var(--sc-spacing-small)}.tab--is-rtl.tab--has-prefix .tab__content{padding-left:0;padding-right:var(--sc-spacing-small)}";
const ScTabStyle0 = scTabCss;

let id = 0;
const ScTab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scClose = index.createEvent(this, "scClose", 7);
        this.componentId = `tab-${++id}`;
        this.panel = '';
        this.href = undefined;
        this.active = false;
        this.disabled = false;
        this.count = undefined;
        this.hasPrefix = false;
        this.hasSuffix = false;
    }
    /** Sets focus to the tab. */
    async triggerFocus(options) {
        this.tab.focus(options);
    }
    /** Removes focus from the tab. */
    async triggerBlur() {
        this.tab.blur();
    }
    handleSlotChange() {
        this.hasPrefix = !!this.el.querySelector('[slot="prefix"]');
        this.hasSuffix = !!this.el.querySelector('[slot="suffix"]');
    }
    render() {
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        this.el.id = this.el.id || this.componentId;
        const Tag = this.href ? 'a' : 'div';
        return (index.h(Tag, { key: '76b30a1512e783b728b4d6464f283d8a4ccba4c3', part: `base ${this.active ? `active` : ``}`, href: this.href, class: {
                'tab': true,
                'tab--active': this.active,
                'tab--disabled': this.disabled,
                'tab--has-prefix': this.hasPrefix,
                'tab--has-suffix': this.hasSuffix,
                'tab--is-rtl': pageAlign.isRtl(),
            }, ref: el => (this.tab = el), role: "tab", "aria-disabled": this.disabled ? 'true' : 'false', "aria-selected": this.active ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0' }, index.h("span", { key: 'd214c5b07eb96741d8eda5265589255873823cc4', part: "prefix", class: "tab__prefix" }, index.h("slot", { key: 'a68c4c5c4f914526d1462ece59c1372b5a5c6de4', onSlotchange: () => this.handleSlotChange(), name: "prefix" })), index.h("div", { key: '867f7918c85cd7ad7e9581719490bb767abb41e3', class: "tab__content", part: "content" }, index.h("slot", { key: '63de9c9ba8cf03101cae41efd2ad9da2f4fe57e0' })), index.h("span", { key: 'd37280d6f29832ed7230c4ad1128848d4c4131cc', part: "suffix", class: "tab__suffix" }, index.h("slot", { key: '4ed2a8606c9dd5f97eb60f1718df1ef6d94241d6', onSlotchange: () => this.handleSlotChange(), name: "suffix" })), index.h("slot", { key: '0f0935e6fc42083af061dfe4aeffb28abe53f2d9', name: "suffix" }, !!this.count && (index.h("div", { key: 'cad27f6514ed5383fb8daebc5bbc5de1460eee39', class: "tab__counter", part: "counter" }, this.count)))));
    }
    get el() { return index.getElement(this); }
};
ScTab.style = ScTabStyle0;

exports.sc_tab = ScTab;

//# sourceMappingURL=sc-tab.cjs.entry.js.map