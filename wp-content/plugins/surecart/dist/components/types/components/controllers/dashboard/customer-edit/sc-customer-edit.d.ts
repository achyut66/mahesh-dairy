import { Customer, CountryLocaleFieldValue, CountryLocaleField } from '../../../../types';
export declare class ScCustomerEdit {
    heading: string;
    customer: Customer;
    successUrl: string;
    i18n: {
        defaultCountryFields: Array<CountryLocaleFieldValue>;
        countryFields: Array<CountryLocaleField>;
    };
    loading: boolean;
    error: string;
    handleSubmit(e: any): Promise<void>;
    render(): any;
}
