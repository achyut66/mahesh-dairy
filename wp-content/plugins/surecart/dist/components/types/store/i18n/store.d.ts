/**
 * Internal dependencies.
 */
import { CountryLocaleField, CountryLocaleFieldValue } from '../../types';
interface Store {
    countryFields: Array<CountryLocaleField>;
    defaultCountryFields: Array<CountryLocaleFieldValue>;
}
declare const state: Store, onChange: import("@stencil/store/dist/types").OnChangeHandler<Store>, on: import("@stencil/store/dist/types").OnHandler<Store>, set: import("@stencil/store/dist/types").Setter<Store>, get: import("@stencil/store/dist/types").Getter<Store>, dispose: () => void;
export default state;
export { state, onChange, on, set, get, dispose };
