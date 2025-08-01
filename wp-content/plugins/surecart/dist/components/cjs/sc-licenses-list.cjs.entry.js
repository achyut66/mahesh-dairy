'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const lazy = require('./lazy-2b509fa7.js');
const fetch = require('./fetch-d644cebd.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');

const scLicensesListCss = ":host{display:block}.license__name{font-weight:var(--sc-font-weight-semibold)}.license__details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}";
const ScLicensesListStyle0 = scLicensesListCss;

const ScLicensesList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.query = {
            page: 1,
            per_page: 10,
        };
        this.heading = wp.i18n.__('Licenses', 'surecart');
        this.isCustomer = undefined;
        this.allLink = undefined;
        this.licenses = [];
        this.copied = false;
        this.loading = false;
        this.error = '';
        this.pagination = {
            total: 0,
            total_pages: 0,
        };
    }
    /** Only fetch if visible */
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            this.initialFetch();
        });
    }
    nextPage() {
        this.query.page = this.query.page + 1;
        this.initialFetch();
    }
    prevPage() {
        this.query.page = this.query.page - 1;
        this.initialFetch();
    }
    async initialFetch() {
        try {
            this.loading = true;
            await this.getLicenses();
        }
        catch (e) {
            console.error(e);
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.loading = false;
        }
    }
    async getLicenses() {
        if (!this.isCustomer) {
            return;
        }
        const response = (await await fetch.apiFetch({
            path: addQueryArgs.addQueryArgs('surecart/v1/licenses', {
                expand: ['purchase', 'purchase.product', 'activations'],
                ...this.query,
            }),
            parse: false,
        }));
        this.pagination = {
            total: parseInt(response.headers.get('X-WP-Total')),
            total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
        };
        this.licenses = (await response.json());
        return this.licenses;
    }
    renderStatus(status) {
        if (status === 'active') {
            return index.h("sc-tag", { type: "success" }, wp.i18n.__('Active', 'surecart'));
        }
        if (status === 'revoked') {
            return index.h("sc-tag", { type: "danger" }, wp.i18n.__('Revoked', 'surecart'));
        }
        if (status === 'inactive') {
            return index.h("sc-tag", { type: "info" }, wp.i18n.__('Not Activated', 'surecart'));
        }
        return index.h("sc-tag", { type: "info" }, status);
    }
    async copyKey(key) {
        try {
            await navigator.clipboard.writeText(key);
            this.copied = true;
            setTimeout(() => {
                this.copied = false;
            }, 2000);
        }
        catch (err) {
            console.error(err);
            alert(wp.i18n.__('Error copying to clipboard', 'surecart'));
        }
    }
    renderLoading() {
        return (index.h("sc-card", { "no-padding": true, style: { '--overflow': 'hidden' } }, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))))));
    }
    renderEmpty() {
        return (index.h("div", null, index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("slot", { name: "empty" }, index.h("sc-empty", { icon: "file-text" }, wp.i18n.__("You don't have any licenses.", 'surecart')))));
    }
    renderContent() {
        var _a, _b;
        if (this.loading) {
            return this.renderLoading();
        }
        if (((_a = this.licenses) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.renderEmpty();
        }
        return (index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, (_b = this.licenses) === null || _b === void 0 ? void 0 : _b.map(({ id, purchase, status, activation_limit, activation_count }) => {
            var _a;
            return (index.h("sc-stacked-list-row", { key: id, href: addQueryArgs.addQueryArgs(window.location.href, {
                    action: 'show',
                    model: 'license',
                    id,
                }), "mobile-size": 0 }, index.h("div", { class: "license__details" }, index.h("div", { class: "license__name" }, (_a = purchase === null || purchase === void 0 ? void 0 : purchase.product) === null || _a === void 0 ? void 0 : _a.name), index.h("div", null, this.renderStatus(status), " ", wp.i18n.sprintf(wp.i18n.__('%1s of %2s Activations Used'), activation_count || 0, activation_limit || '∞'))), index.h("sc-icon", { name: "chevron-right", slot: "suffix" })));
        }))));
    }
    render() {
        var _a, _b;
        return (index.h("sc-dashboard-module", { key: '7564fddae99ca2d5e519a9a4121a5c803e954cce', class: "purchase", part: "base", error: this.error }, index.h("span", { key: '0259db43a4bdc21d396f760ab18a5424a81eac2e', slot: "heading" }, index.h("slot", { key: '7d354c8476559f2e4bb54e4b517441945603a974', name: "heading" }, this.heading || wp.i18n.__('License Keys', 'surecart'))), !!this.allLink && !!((_a = this.licenses) === null || _a === void 0 ? void 0 : _a.length) && (index.h("sc-button", { key: 'e5d8010b09f202a925dee9ca1d17cfc57dbf57ad', type: "link", href: this.allLink, slot: "end" }, wp.i18n.__('View all', 'surecart'), index.h("sc-icon", { key: '18ca407ab51ce1628119e6d8b8ef8bf098efa034', name: "chevron-right", slot: "suffix" }))), this.renderContent(), !this.allLink && (index.h("sc-pagination", { key: 'e79b138951df16c54d2be8f6c027b1563dd57bc8', page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_b = this === null || this === void 0 ? void 0 : this.licenses) === null || _b === void 0 ? void 0 : _b.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() }))));
    }
    get el() { return index.getElement(this); }
};
ScLicensesList.style = ScLicensesListStyle0;

exports.sc_licenses_list = ScLicensesList;

//# sourceMappingURL=sc-licenses-list.cjs.entry.js.map