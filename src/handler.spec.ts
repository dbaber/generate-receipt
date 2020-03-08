// handler.spec.ts
import 'mocha';
import { expect } from 'chai';
import 'chai/register-should';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { hello, generate_receipt } from './handler';

function mock_event(body: any): APIGatewayProxyEvent {
  return {
    body: body,
    headers: {},
    multiValueHeaders: {
      "Accept": [ "*/*" ],
    },
    httpMethod: "POST",
    isBase64Encoded: false,
    path: "/receipt",
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: null,
      apiId: null,
      protocol: null,
      httpMethod: "POST",
      identity: null,
      path: null,
      stage:null,
      requestId: null,
      requestTimeEpoch: null,
      resourceId: null,
      resourcePath: null,
    },
    resource: "/receipt"
  };
}

describe("handler", () => {
  describe("hello", () => {
    it("should return Serverless boilerplate message", () => {
      hello(null, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null,"context":null}');
      })
    });
  });
});

describe("handler", () => {
  describe("generate_receipt", () => {
    it("should return a not found error with an invalid product_id", () => {
      const event: APIGatewayProxyEvent = mock_event( JSON.stringify([ { product_id: -1, quantity: 1 }]));

      generate_receipt(event, null, (error : Error, result : any) => {
        expect(error).to.be.null;;
        result.statusCode.should.equal(500);
        JSON.parse(result.body).error.should.equal("Error: Product with product_id '-1' not found.")
      })
    });

    it("should return a proper receipt for Shopping Basket 1", () => {
      const event: APIGatewayProxyEvent = mock_event( JSON.stringify(
        [ { product_id: 1, quantity: 1 }, { product_id: 2, quantity: 1 }, { product_id: 3, quantity: 1 }]));

      generate_receipt(event, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.statusCode.should.equal(200);
        result.body.should.equal( JSON.stringify({
          items: [
            {
              quantity: 1,
              description: "16lb bag of Skittles",
              amount: "16.00",
              sales_tax: "0.00",
              import_duty: "0.00",
              total: "16.00"
            },
            {
              quantity: 1,
              description: "Walkman",
              amount: "99.99",
              sales_tax: "10.00",
              import_duty: "0.00",
              total: "109.99"
            },
            {
              quantity: 1,
              description: "bag of microwave Popcorn",
              amount: "0.99",
              sales_tax: "0.00",
              import_duty: "0.00",
              total: "0.99"
            }
          ],
          sales_tax: "10.00",
          total: "126.98"
        }));
      })
    });

    it("should return a proper receipt for Shopping Basket 2", () => {
      const event: APIGatewayProxyEvent = mock_event( JSON.stringify(
        [ { product_id: 4, quantity: 1 }, { product_id: 5, quantity: 1 }]));

      generate_receipt(event, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.statusCode.should.equal(200);
        result.body.should.equal( JSON.stringify({
          items: [
            {
              quantity: 1,
              description: "imported bag of Vanilla-Hazelnut Coffee",
              amount: "11.00",
              sales_tax: "0.00",
              import_duty: "0.55",
              total: "11.55"
            },
            {
              quantity: 1,
              description: "imported Vespa",
              amount: "15001.25",
              sales_tax: "1500.15",
              import_duty: "750.10",
              total: "17251.50"
            }
          ],
          sales_tax: "2250.80",
          total: "17263.05"
        }));
      })
    });

    it("should return a proper receipt for Shopping Basket 3", () => {
      const event: APIGatewayProxyEvent = mock_event( JSON.stringify(
        [ { product_id: 6, quantity: 1 }, { product_id: 7, quantity: 1 },
          { product_id: 8, quantity: 1 }, { product_id: 9, quantity: 1 }]));

      generate_receipt(event, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.statusCode.should.equal(200);
        result.body.should.equal( JSON.stringify({
          items: [
            {
              quantity: 1,
              description: "imported crate of Almond Snickers",
              amount: "75.99",
              sales_tax: "0.00",
              import_duty: "3.80",
              total: "79.79"
            },
            {
              quantity: 1,
              description: "Discman",
              amount: "55.00",
              sales_tax: "5.50",
              import_duty: "0.00",
              total: "60.50"
            },
            {
              quantity: 1,
              description: "Imported Bottle of Wine",
              amount: "10.00",
              sales_tax: "1.00",
              import_duty: "0.50",
              total: "11.50"
            },
            {
              quantity: 1,
              description: "300# bag of Fair-Trade Coffee",
              amount: "997.99",
              sales_tax: "0.00",
              import_duty: "0.00",
              total: "997.99"
            }
          ],
          sales_tax: "10.80",
          total: "1149.78"
        }));
      })
    });    
  });
});