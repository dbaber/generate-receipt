// cart.ts

import { Catalog, Product, ProductCategory } from './catalog';

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
        this._update_total();
    }

    apply_basic_sales_tax () {
        // If we don't have candy, popcorn, or coffee then apply the basic sales tax
        if ( ! [ProductCategory.Candy, ProductCategory.Coffee, ProductCategory.Popcorn].includes(this.product.category) ) {
            this.sales_tax += this.amount * 0.10; // TODO: Make this some kind of class member constant
            this.sales_tax = this._round_up_tax(this.sales_tax);
            this._update_total();
        }
    }

    apply_import_duty() {
        if (this.product.imported){
            this.import_duty += this.amount * 0.05; // TODO: Make this some kind of class member constant
            this.import_duty = this._round_up_tax(this.import_duty);
            this._update_total();
        }
    }

    // XXX: Could make this more flexible
    private _round_up_tax(amount: number) {
       // return (Math.ceil(amount *20)/20).toFixed(2);
       return (Math.ceil(amount * 20)/20);
    }

    private _update_total() {
        this.total = this.amount + this.sales_tax + this.import_duty;
    }
}

export class Cart {
    static catalog: Catalog = Catalog.getInstance();
    private _items: CartItem[] = new Array();
    total_sales_tax: number = 0;
    total: number = 0;

    add_items(items: CartDataItem[]) {
        //console.log("Calling Cart#add_items() ", JSON.stringify(items));
        
        for (let item of items ) {
            let product: Product = Cart.catalog.getProduct(item.product_id);
            let cart_item: CartItem = new CartItem(item.quantity, product);

            cart_item.apply_basic_sales_tax();
            cart_item.apply_import_duty();

            this._items.push(cart_item);        
        }
        //console.log("Added cart items:", JSON.stringify(this._items));
    }

    get_items() {
        return this._items;
    }

    generate_receipt(): any {
        // TODO
    }
}