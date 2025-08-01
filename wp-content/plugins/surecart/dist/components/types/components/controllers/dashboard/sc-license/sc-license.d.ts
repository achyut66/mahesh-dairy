import { Activation, License } from "../../../../types";
export declare class ScLicense {
    el: HTMLScLicenseElement;
    /**The license id */
    licenseId: string;
    loading: boolean;
    error: string;
    license: License;
    activations: Activation[];
    copied: boolean;
    showConfirmDelete: boolean;
    selectedActivationId: string;
    deleteActivationError: string;
    busy: boolean;
    /** Activations pagination */
    pagination: {
        total: number;
        total_pages: number;
    };
    /** Query to fetch Activations */
    query: {
        page: number;
        per_page: number;
    };
    nextPage(): void;
    prevPage(): void;
    /** Only fetch if visible */
    componentWillLoad(): void;
    fetchActivations(): Promise<void>;
    initialFetch(): Promise<void>;
    getLicense(): Promise<void>;
    getActivations(): Promise<void>;
    deleteActivation: () => Promise<void>;
    copyKey(key: string): Promise<void>;
    renderStatus(): any;
    renderLoading(): any;
    renderEmpty(): any;
    renderLicenseHeader(): any;
    renderContent(): any;
    onCloseDeleteModal: () => void;
    renderConfirmDelete(): any;
    render(): any;
}
