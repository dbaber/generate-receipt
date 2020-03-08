// handler.ts

import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import { Catalog } from './catalog';

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

export const generate_receipt : Handler = (_event: APIGatewayEvent, _context: Context, cb: Callback) => {

  const catalog: Catalog  = Catalog.getInstance();

  /*const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
      context: context,
    }),
  };*/

   const response = {
    statusCode: 200,
    body: JSON.stringify(catalog.getProduct(1)),
  };

  cb(null, response);
}