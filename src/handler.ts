// handler.ts

import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import { CartDataItem, Cart } from './cart';
import { ReceiptData } from './receipt';

export const hello : Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
      context: context,
    }),
  };

  cb(null, response);
}

export const generate_receipt : Handler = (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  try{
    //console.log("Handled event:", JSON.stringify(event));
    //console.log("Event body:", JSON.stringify(JSON.parse(event.body)));
    const items: CartDataItem[] = JSON.parse(event.body);
  
    let cart: Cart = new Cart();
    cart.addItems(items);
    
    const receipt: ReceiptData = cart.generateReceipt();

    const response = {
      statusCode: 200,
      body: JSON.stringify(receipt),
    };
  
    cb(null, response);
  }
  catch(err){
    console.error(err);
    cb(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: err.toString(),
        full_error: err.stack,
      }),
    });
  }
}