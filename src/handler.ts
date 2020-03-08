// handler.ts

import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import { CartDataItem, Cart, CartItem } from './cart';

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
    const items: CartDataItem[] = JSON.parse(event.body);
    let cart: Cart = new Cart();
    cart.add_items(items);
    cart.generate_receipt();
    let cart_items: CartItem[] = cart.get_items();

    //console.log("Received event:", JSON.stringify(event, null, 2));
    const response = {
      statusCode: 200,
      //body: JSON.stringify({parsed_body: JSON.parse(event.body)}),
      body: JSON.stringify(cart_items),
    };
  
    cb(null, response);
  }
  catch(err){
    console.error(err);
    cb(null, {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    });
  }
}