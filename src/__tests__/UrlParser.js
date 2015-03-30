jest.dontMock("../UrlParser");
jest.dontMock("../Parser");
jest.dontMock("lodash");

import UrlParser from "../UrlParser";
import _ from "lodash";

describe("Url Parser", () => {
  let variables;
  describe("with valid format String", () => {
    describe("with valid url instance", () => {
      describe("without parameters", () => {
        beforeEach(() => {
          let urlParser = new UrlParser("/:version/api/:collection/:id");
          variables = urlParser.extractVariables("/6/api/listings/3");
        });

        it("returns a map with 3 elements", () => {
          expect(_.size(variables)).toBe(3);
        });

        it("returns the correct structure", () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe("listings");
          expect(variables.id).toBe(3);
        });
      });

      describe("with ? but no parameters", () => {
        beforeEach(() => {
          let urlParser = new UrlParser("/:version/api/:collection/:id");
          variables = urlParser.extractVariables("/6/api/listings/3?");
        });

        it("returns a map with 3 elements", () => {
          expect(_.size(variables)).toBe(3);
        });

        it("returns the correct structure", () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe("listings");
          expect(variables.id).toBe(3);
        });
      });

      describe("with parameters", () => {
        beforeEach(() => {
          let urlParser = new UrlParser("/:version/api/:collection/:id");
          variables = urlParser.extractVariables("/6/api/listings/3?sort=desc&limit=10");
        });

        it("returns a map with 5 elements", () => {
          expect(_.size(variables)).toBe(5);
        });

        it("returns the correct structure", () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe("listings");
          expect(variables.id).toBe(3);
          expect(variables.sort).toBe("desc");
          expect(variables.limit).toBe(10);
        });
      });

      describe("with array parameters", () => {
        beforeEach(() => {
          let urlParser = new UrlParser("/:version/api/:collection/:id");
          variables = urlParser.extractVariables("/6/api/listings/3?userId[]=1&userId[]=2&userId[]=3&sort=desc");
        });

        it("returns a map with 5 elements", () => {
          expect(_.size(variables)).toBe(5);
        });

        it("returns the correct structure", () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe("listings");
          expect(variables.id).toBe(3);
          expect(variables.sort).toBe("desc");
          expect(variables.userId).toEqual([1, 2, 3]);
        });
      });

      describe("with array parameter with only one value", () => {
        beforeEach(() => {
          let urlParser = new UrlParser("/:version/api/:collection/:id");
          variables = urlParser.extractVariables("/6/api/listings/3?userId[]=1");
        });

        it("returns a map with 4 elements", () => {
          expect(_.size(variables)).toBe(4);
        });

        it("returns the correct structure", () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe("listings");
          expect(variables.id).toBe(3);
          expect(variables.userId).toEqual([1]);
        });
      });

      describe("with parameter overriding url variables", () => {
        let urlParser;
        beforeEach(() => {
          urlParser = new UrlParser("/users/:userId/friends");
        });

        describe("with query string variables overriding", () => {
          let variables;
          describe("with override unset", () => {
            beforeEach(() => {
              variables = urlParser.extractVariables("/users/100/friends?userId=200");
            });

            it("returns a map with 1 element", () => {
              expect(_.size(variables)).toBe(1);
            });

            it("returns the correct structure", () => {
              expect(variables.userId).toBe(100);
            });
          });

          describe("with override set", () => {
            beforeEach(() => {
              variables = urlParser.extractVariables("/users/100/friends?userId=200", true);
            });

            it("returns a map with 1 element", () => {
              expect(_.size(variables)).toBe(1);
            });

            it("returns the correct structure", () => {
              expect(variables.userId).toBe(200);
            });
          });
        });

        describe("with query string array overriding", () => {
          let variables;
          describe("with override unset", () => {
            beforeEach(() => {
              variables = urlParser.extractVariables("/users/100/friends?userId[]=200");
            });

            it("returns a map with 1 element", () => {
              expect(_.size(variables)).toBe(1);
            });

            it("returns the correct structure", () => {
              expect(variables.userId).toBe(100);
            });
          });

          describe("with override set", () => {
            beforeEach(() => {
              variables = urlParser.extractVariables("/users/100/friends?userId[]=200", true);
            });

            it("returns a map with 1 element", () => {
              expect(_.size(variables)).toBe(1);
            });

            it("returns the correct structure", () => {
              expect(variables.userId).toEqual([200]);
            });
          });
        });
      });
    });
  });
});
