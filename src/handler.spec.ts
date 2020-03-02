// handler.spec.ts
import 'mocha';
import { expect } from 'chai';
import 'chai/register-should';
//import { APIGatewayEvent, Handler, Callback, Context } from 'aws-lambda';
//import { hello } from '../handler';
import { hello } from './handler';

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