'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');

const scTableCss = ":host{display:table;width:100%;height:100%;border-spacing:0;border-collapse:collapse;table-layout:fixed;font-family:var(--sc-font-sans);border-radius:var(--border-radius, var(--sc-border-radius-small))}:host([shadowed]){box-shadow:var(--sc-shadow-medium)}::slotted([slot=head]){border-bottom:1px solid var(--sc-table-border-bottom-color, var(--sc-color-gray-200))}";
const ScTableStyle0 = scTableCss;

const ScTable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: 'f95581a7842629a20b1ea38c179c555b47f649e4' }, index.h("slot", { key: '5a398a0360c9f180407ed19d1747b58c5a0a42f4', name: "head" }), index.h("slot", { key: 'dc8e209fc669e8a613438a24f5938fd2abdddc8e' }), index.h("slot", { key: '90fff10b9fd4e10238b2e60205c654f9c99b9417', name: "footer" })));
    }
};
ScTable.style = ScTableStyle0;

const scTableCellCss = ":host{display:table-cell;font-size:var(--sc-font-size-medium);padding:var(--sc-table-cell-spacing, var(--sc-spacing-small)) var(--sc-table-cell-spacing, var(--sc-spacing-large)) !important;vertical-align:middle}:host([slot=head]){background:var(--sc-table-cell-background-color, var(--sc-color-gray-50));font-size:var(--sc-font-size-x-small);padding:var(--sc-table-cell-spacing, var(--sc-spacing-small));text-transform:uppercase;font-weight:var(--sc-font-weight-semibold);letter-spacing:var(--sc-letter-spacing-loose);color:var(--sc-color-gray-500)}:host(:last-child){text-align:right}sc-table-cell{display:table-cell;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const ScTableCellStyle0 = scTableCellCss;

const ScTableScll = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: '5ff2ee05d44a10829f1c2524e337e0567ad7d898' }, index.h("slot", { key: '47b3c45c7ea9eec0b0b686a5a7cf3a7162e80167' })));
    }
};
ScTableScll.style = ScTableCellStyle0;

const scTableRowCss = ":host{display:table-row;border:1px solid var(--sc-table-row-border-bottom-color, var(--sc-color-gray-200))}:host([href]){cursor:pointer}:host([href]:hover){background:var(--sc-color-gray-50)}";
const ScTableRowStyle0 = scTableRowCss;

const ScTableRow = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.href = undefined;
    }
    render() {
        return (index.h(index.Host, { key: '1bac8101fb6f79859b6197831dc7accb7f15ff10' }, index.h("slot", { key: 'fd8626132c0b49d6d64c5bab05449c2bc6f38c54' })));
    }
};
ScTableRow.style = ScTableRowStyle0;

exports.sc_table = ScTable;
exports.sc_table_cell = ScTableScll;
exports.sc_table_row = ScTableRow;

//# sourceMappingURL=sc-table_3.cjs.entry.js.map