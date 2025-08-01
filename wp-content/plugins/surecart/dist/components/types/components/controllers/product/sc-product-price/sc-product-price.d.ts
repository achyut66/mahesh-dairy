import { Price, Variant } from '../../../../types';
export declare class ScProductPrice {
    /** The product's prices. */
    prices: Price[];
    /** The sale text */
    saleText: string;
    /** The product id */
    productId: string;
    renderRange(): string;
    renderVariantPrice(selectedVariant: Variant): any;
    renderPrice(price: Price, variant?: Variant): any;
    render(): any;
}
