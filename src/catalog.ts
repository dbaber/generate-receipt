// catalog.ts

export enum ProductCategory { Candy = "CANDY", Popcorn = "POPCORN", Coffee = "COFFEE", Other = "OTHER" };

// TODO: Make this an interface? Not sure I even need this....
// XXX: Using floating point numbers to do currency math is not the greatest idea
export class Product {
    product_id: number;
    category: ProductCategory;
    description: string;
    price: number;
    imported: boolean = false;

    constructor(product_id: number, category: ProductCategory, description: string, price: number, imported: boolean) {
        this.product_id = product_id;
        this.category = category;
        this.description = description;
        this.price = price;
        this.imported = imported;
      }
}

// TODO: Ideally I'd pass a JSON file into the catalog and have it add the products, maybe in a static method?
export class Catalog {
    private products: Product[] = [
        {product_id: 1, category: ProductCategory.Candy, description: "16lb bag of Skittles", price: 16.00, imported: false},
        {product_id: 2, category: ProductCategory.Other, description: "Walkman", price: 99.99, imported: false},
        {product_id: 3, category: ProductCategory.Popcorn, description: "bag of microwave Popcorn", price: 0.99, imported: false},
        {product_id: 4, category: ProductCategory.Coffee, description: "imported bag of Vanilla-Hazelnut Coffee", price: 11.00, imported: true},
        {product_id: 5, category: ProductCategory.Other, description: "imported Vespa", price: 15001.25, imported: true},
        {product_id: 6, category: ProductCategory.Candy, description: "imported crate of Almond Snickers", price: 75.99, imported: true},
        {product_id: 7, category: ProductCategory.Other, description: "Discman", price: 55, imported: false},
        {product_id: 8, category: ProductCategory.Other, description: "Imported Bottle of Wine", price: 10.00, imported: true},
        {product_id: 9, category: ProductCategory.Coffee, description: "300# bag of Fair-Trade Coffee", price: 997.99, imported: false}
    ]

    private static instance: Catalog;

    private constructor() {}

    public static getInstance(): Catalog {
        if ( !Catalog.instance ) {
            Catalog.instance = new Catalog();
        }

        return Catalog.instance;
    }

    getProduct(product_id: number) {
        let product: Product | undefined =  this.products.find( x => x.product_id === product_id);
        if (product) {
            return product;
        } else {
            throw Error(`Product with product_id ${product_id} not found.`);
        }   
    }
}