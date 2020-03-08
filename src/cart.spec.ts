// cart.spec.ts
import 'mocha';
import { expect } from 'chai';
import 'chai/register-should';
import { Product, ProductCategory } from './catalog';
import { CartDataItem, CartItem, Cart } from './cart';

describe("CartItem", () => {
    describe("#constructor()", () => {
        it("should create a cart item from produt_id 1 with quantity 2 where amount and total are set properly", () => {
            let product: Product = Cart.catalog.getProduct(1);
            let cart_item: CartItem = new CartItem(2, product);
            expect(cart_item.amount).equal(32.00);
            expect(cart_item.total).equal(32.00);
        });
    });
});

describe("CartItem", () => {
    describe("#applyBasicSalesTax()", () => {
        let product_ids: number[] = [1,2,3,4,5,6,7,8,9];

        for(let pid of product_ids) {
            let product: Product = Cart.catalog.getProduct(pid);
            let cart_item: CartItem = new CartItem(1, product);
            let apply: boolean = ( ! [ProductCategory.Candy, ProductCategory.Coffee, ProductCategory.Popcorn].includes(product.category) ) ? true : false;
            cart_item.applyBasicSalesTax();

            it("should " + ( apply? "": "not " ) + "apply basic sales tax to product_id '" + pid + "' because it is " + product.category, () => {
                if (apply) {
                    expect(cart_item.sales_tax).to.be.above(0.00);
                }
                else {
                    expect(cart_item.sales_tax).to.equal(0.00);   
                }
                expect(cart_item.total).to.be.equal(cart_item.amount + cart_item.sales_tax);
            });
        }
    });
});

describe("CartItem", () => {
    describe("#applyImportDuty()", () => {
        let product_ids: number[] = [1,2,3,4,5,6,7,8,9];

        for(let pid of product_ids) {
            let product: Product = Cart.catalog.getProduct(pid);
            let cart_item: CartItem = new CartItem(1, product);
            cart_item.applyImportDuty();

            it("should " + ( product.imported? "": "not " ) + "apply import duty to product_id '" + pid + "' because imported is " + product.imported, () => {
                if (product.imported) {
                    expect(cart_item.import_duty).to.be.above(0.00);
                }
                else {
                    expect(cart_item.import_duty).to.equal(0.00);   
                }
                expect(cart_item.total).to.be.equal(cart_item.amount + cart_item.import_duty);
            });
        }
    });
});

describe("CartItem", () => {
    describe("#applyBasicSalesTax() and #applyImportDuty()", () => {
        let product_ids: number[] = [5,8];

        for(let pid of product_ids) {
            let product: Product = Cart.catalog.getProduct(pid);
            let cart_item: CartItem = new CartItem(1, product);
            cart_item.applyBasicSalesTax();
            cart_item.applyImportDuty();

            it(`should apply both basic sales tax and import duty to product_id '${pid}' because it is ${product.category} and imported is ${product.imported}`, () => {
                expect(cart_item.sales_tax).to.be.above(0.00);
                expect(cart_item.import_duty).to.be.above(0.00);
                expect(cart_item.total).to.be.equal(cart_item.amount + cart_item.sales_tax + cart_item.import_duty);
            });
        }
    });
});

describe("CartItem", () => {
    describe("#applyBasicSalesTax() and basic sales tax rounds up", () => {
        it("should round up the basic sales tax to the next $0.05", () => {
            let product: Product = new Product(10, ProductCategory.Other, "Sales tax rounds up imported", 5.82, true);
            Cart.catalog.addProduct(product);
            product = Cart.catalog.getProduct(10);
            let cart_item: CartItem = new CartItem(1, product);
            cart_item.applyBasicSalesTax();

            expect(cart_item.sales_tax).to.equal(0.60);
        });
    });
});

describe("CartItem", () => {
    describe("#applyImportDuty() and basic sales tax rounds up", () => {
        it("should round up the import duty tax to the next $0.05", () => {
            let product: Product = new Product(11, ProductCategory.Other, "Import duty rounds up imported", 5.19, true);
            Cart.catalog.addProduct(product);
            product = Cart.catalog.getProduct(11);
            let cart_item: CartItem = new CartItem(1, product);
            cart_item.applyImportDuty();

            expect(cart_item.import_duty).to.equal(0.30);
        });
    });
});

describe("Cart", () => {
    describe("#addItems()", () => {
        it("should return proper CartItem objects", () => {
            const items: CartDataItem[] = [{product_id: 1,quantity: 1},{product_id: 2,quantity: 1},{product_id: 3,quantity: 1}];
  
            let cart: Cart = new Cart();
            cart.addItems(items);
            const cart_items: CartItem[] = cart.getItems();
            expect(cart_items).to.deep.equal([
                {
                    quantity: 1,
                    product: {
                        category: "CANDY",
                        description: "16lb bag of Skittles",
                        imported: false,
                        price: 16,
                        product_id: 1,
                    },
                    amount: 16,
                    sales_tax: 0,
                    import_duty: 0,
                    total: 16
                  },
                  {
                    quantity: 1,
                    product: {
                        category: "OTHER",
                        description: "Walkman",
                        imported: false,
                        price: 99.99,
                        product_id: 2
                    },
                    amount: 99.99,
                    sales_tax: 10,
                    import_duty: 0,
                    total: 109.99
                  },
                  {
                    quantity: 1,
                    product: {
                        category: "POPCORN",
                        description: "bag of microwave Popcorn",
                        imported: false,
                        price: 0.99,
                        product_id: 3
                    },
                    amount: 0.99,
                    sales_tax: 0,
                    import_duty: 0,
                    total: 0.99
                  }
            ]);
        });
    });
});