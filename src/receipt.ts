// receipt.ts

export interface ReceiptItemData {
    quantity: number;
    description: string;
    amount: number | string;
    sales_tax: number | string;
    import_duty: number | string;
    total: number | string;
}

export interface ReceiptData {
    items: ReceiptItemData[];
    sales_tax: string;
    total: string;
}