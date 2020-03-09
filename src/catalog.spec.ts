// catalog.spec.ts
import 'mocha';
import { expect } from 'chai';
import 'chai/register-should';
import { Product, Catalog, ProductCategory } from './catalog';

describe("Catalog", () => {
    describe("#getInstance()", () => {
        it("should return the same singleton Catalog instance", () => {
            let c1: Catalog = Catalog.getInstance();
            let c2: Catalog = Catalog.getInstance();
            expect(c1).to.equal(c2);
        });

        it("should throw an error when given a bad product_id", () => {
            let c: Catalog = Catalog.getInstance();
            expect(() => c.getProduct(-1).should.throw("Product with product_id '-1' not found."));
        });
    });
});

describe("Catalog", () => {
    describe("#getProduct()", () => {
        it("should return an existing product given a valid product_id", () => {
            let c: Catalog = Catalog.getInstance();
            let p: Product = c.getProduct(1);
            expect(p).to.deep.equal({product_id: 1, category: ProductCategory.Candy, description: "16lb bag of Skittles", price: 16.00, imported: false});
        });
    });
});