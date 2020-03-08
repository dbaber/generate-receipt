// handler.spec.ts
import 'mocha';
import { expect } from 'chai';
import 'chai/register-should';
//import { hello, generate_receipt } from './handler';
import { hello  } from './handler';

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

/*describe("handler", () => {
  describe("generate_receipt", () => {
    it("should return Serverless boilerplate message", () => {
      generate_receipt(null, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null,"context":null}');
      })
    });
  });
});*/