// cart.ts

import { Catalog, Product, ProductCategory } from './catalog';
import { ReceiptData, ReceiptItemData } from './receipt';

export interface CartDataItem {
    quantity: number;
    product_id: number;
}

// XXX: Using floating point numbers to do currency math is not the greatest idea
export class CartItem {
    quantity: number;
    product: Product;
    amount: number = 0;
    sales_tax?: number = 0;
    import_duty?: number = 0;
    total?: number = 0;

    constructor(quantity: number, product: Product) {
        this.quantity = quantity;
        this.product = product;

        this.amount += this.quantity * this.product.price;
        this._updateTotal();
    }

    applyBasicSalesTax () {
        // If we don't have candy, popcorn, or coffee then apply the basic sales tax
        if ( ! [ProductCategory.Candy, ProductCategory.Coffee, ProductCategory.Popcorn].includes(this.product.category) ) {
            this.sales_tax += this.amount * 0.10; // TODO: Make this some kind of class member constant?
            this.sales_tax = this._roundUpTax(this.sales_tax);
            this._updateTotal();
        }
    }

    applyImportDuty() {
        if (this.product.imported){
            this.import_duty += this.amount * 0.05; // TODO: Make this some kind of class member constant?
            this.import_duty = this._roundUpTax(this.import_duty);
            this._updateTotal();
        }
    }

    // XXX: Could make this more flexible and use some params/member to dictate rounding
    private _roundUpTax(amount: number) {
       return (Math.ceil(amount * 20)/20);
    }

    private _updateTotal() {
        this.total = this.amount + this.sales_tax + this.import_duty;
    }
}

export class Cart {
    static catalog: Catalog = Catalog.getInstance();
    private _items: CartItem[] = new Array();
    total_sales_tax: number = 0;
    total: number = 0;

    addItems(items: CartDataItem[]) {
        //console.log("Calling Cart#add_items() ", JSON.stringify(items));
        
        for (let item of items ) {
            let product: Product = Cart.catalog.getProduct(item.product_id);
            let cart_item: CartItem = new CartItem(item.quantity, product);

            cart_item.applyBasicSalesTax();
            cart_item.applyImportDuty();

            this._items.push(cart_item);        
        }
        //console.log("Added cart items:", JSON.stringify(this._items));
    }

    getItems() {
        return this._items;
    }

    // TODO: move this to a Receipt class?
    generateReceipt(): ReceiptData {
        let receipt_items: Array<ReceiptItemData> = new Array();
        let sales_tax: number = 0;
        let total: number = 0;

        for (let item of this._items) {
            let r: ReceiptItemData = {
                quantity: item.quantity,
                description: item.product.description,
                amount: item.amount,
                sales_tax: item.sales_tax,
                import_duty: item.import_duty,
                total: item.total
            };

            receipt_items.push(r);
            sales_tax += ( (r.sales_tax as number) + (r.import_duty as number) );
            total += r.total as number;
        }

        return {
            items: receipt_items.map(item => ({
                quantity: item.quantity,
                description: item.description,
                amount: (item.amount as number).toFixed(2),
                sales_tax: (item.sales_tax as number).toFixed(2),
                import_duty: (item.import_duty as number).toFixed(2),
                total: (item.total as number).toFixed(2)
            })),
            sales_tax: sales_tax.toFixed(2),
            total: total.toFixed(2),
        };
    }
}