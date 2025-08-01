import { r as registerInstance, h, H as Host, a as getElement } from './index-745b6bec.js';

const scTabPanelCss = ":host{--padding:0;--spacing:var(--sc-spacing-large);display:block}::slotted(*~*){margin-top:var(--spacing)}.tab-panel{border:solid 1px transparent;padding:var(--padding);font-family:var(--sc-font-sans);font-size:var(--sc-font-size-medium)}";
const ScTabPanelStyle0 = scTabPanelCss;

let id = 0;
const ScTabPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.componentId = `tab-panel-${++id}`;
        this.name = '';
        this.active = false;
    }
    render() {
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        this.el.id = this.el.id || this.componentId;
        return (h(Host, { key: 'ef1cab9a4d010f7686e35b0ef62a879865a0f2ad', style: { display: this.active ? 'block' : 'none' } }, h("div", { key: '10d72c33fc9301117fff40b2de48cd21b3b2899c', part: "base", class: "tab-panel", role: "tabpanel", "aria-hidden": this.active ? 'false' : 'true' }, h("slot", { key: '4014ee8afa37a8b1f93cfde87c7e9b96af4b9dad' }))));
    }
    get el() { return getElement(this); }
};
ScTabPanel.style = ScTabPanelStyle0;

export { ScTabPanel as sc_tab_panel };

//# sourceMappingURL=sc-tab-panel.entry.js.map