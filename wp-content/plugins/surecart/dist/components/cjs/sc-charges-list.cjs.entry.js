'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const fetch = require('./fetch-d644cebd.js');
const lazy = require('./lazy-2b509fa7.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
require('./remove-query-args-b57e8cd3.js');

const scChargesListCss = ":host{display:block;position:relative}.charges-list{display:grid;gap:1em}";
const ScChargesListStyle0 = scChargesListCss;

const ScChargesList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.query = {
            page: 1,
            per_page: 10,
        };
        this.heading = undefined;
        this.showPagination = true;
        this.allLink = undefined;
        this.charges = [];
        this.loading = undefined;
        this.loaded = undefined;
        this.error = undefined;
        this.pagination = {
            total: 0,
            total_pages: 0,
        };
    }
    /** Only fetch if visible */
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            this.getItems();
        });
    }
    /** Get items */
    async getItems() {
        try {
            this.loading = true;
            const response = (await fetch.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/charges/`, {
                    expand: ['checkout', 'checkout.order'],
                    ...this.query,
                }),
                parse: false,
            }));
            this.pagination = {
                total: parseInt(response.headers.get('X-WP-Total')),
                total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
            };
            this.charges = (await response.json());
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.loading = false;
            this.loaded = true;
        }
    }
    renderRefundStatus(charge) {
        if (charge === null || charge === void 0 ? void 0 : charge.fully_refunded) {
            return index.h("sc-tag", { type: "danger" }, wp.i18n.__('Refunded', 'surecart'));
        }
        if (charge === null || charge === void 0 ? void 0 : charge.refunded_amount) {
            return index.h("sc-tag", { type: "warning" }, wp.i18n.__('Partially Refunded', 'surecart'));
        }
        return index.h("sc-tag", { type: "success" }, wp.i18n.__('Paid', 'surecart'));
    }
    renderEmpty() {
        return (index.h("sc-stacked-list-row", { "mobile-size": 0 }, index.h("slot", { name: "empty" }, wp.i18n.__('You have no saved payment methods.', 'surecart'))));
    }
    renderLoading() {
        return (index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))));
    }
    renderContent() {
        var _a;
        if (this.loading && !this.loaded) {
            return this.renderLoading();
        }
        if (((_a = this.charges) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return this.renderEmpty();
        }
        return this.charges.map(charge => {
            var _a;
            const { created_at_date, display_amount } = charge;
            return (index.h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 600, href: addQueryArgs.addQueryArgs(window.location.href, {
                    action: 'show',
                    model: 'order',
                    id: (_a = charge.checkout.order) === null || _a === void 0 ? void 0 : _a.id,
                }) }, index.h("strong", null, created_at_date), index.h("sc-text", { style: { '--color': 'var(--sc-color-gray-500)' } }, wp.i18n.sprintf(wp.i18n.__('#%s', 'surecart'), charge.checkout.order.number)), index.h("div", null, this.renderRefundStatus(charge)), index.h("strong", null, display_amount)));
        });
    }
    nextPage() {
        this.query.page = this.query.page + 1;
        this.getItems();
    }
    prevPage() {
        this.query.page = this.query.page - 1;
        this.getItems();
    }
    render() {
        var _a;
        return (index.h("sc-dashboard-module", { key: '694ccddceb466addce8c4a5efa52d8def0f15a6c', class: "charges-list", error: this.error }, index.h("span", { key: '2e67a7595708193402c8cf063375e08db97820d6', slot: "heading" }, index.h("slot", { key: 'a3710378d7c579f0cd487d65710591baee0a2798', name: "heading" }, this.heading || wp.i18n.__('Payment History', 'surecart'))), !!this.allLink && (index.h("sc-button", { key: '078a935096b4413d116a3ca1c999b4b21f8b6317', type: "link", href: this.allLink, slot: "end" }, wp.i18n.__('View all', 'surecart'), index.h("sc-icon", { key: '481a0cc8557aee9bd1b6972e55d6cd89105d97f9', name: "chevron-right", slot: "suffix" }))), index.h("sc-card", { key: '50e7c7956538bd21e6f39eec8488600c363e5ecb', "no-padding": true, style: { '--overflow': 'hidden' } }, index.h("sc-stacked-list", { key: 'fe09dc61473d1a8fcb788a9ed57515497d601df5' }, this.renderContent())), this.showPagination && (index.h("sc-pagination", { key: 'a5a06f247799e7579cf53ad0d6e0eb2c209e40be', page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_a = this === null || this === void 0 ? void 0 : this.charges) === null || _a === void 0 ? void 0 : _a.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() })), this.loading && this.loaded && index.h("sc-block-ui", { key: '496fb42b86d4cd66fb8b9cd7dbb7cce2cef0f3d1', spinner: true })));
    }
    get el() { return index.getElement(this); }
};
ScChargesList.style = ScChargesListStyle0;

exports.sc_charges_list = ScChargesList;

//# sourceMappingURL=sc-charges-list.cjs.entry.js.map