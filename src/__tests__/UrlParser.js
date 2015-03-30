jest.dontMock('../UrlParser');
jest.dontMock('lodash');

import UrlParser from '../UrlParser';
import _ from 'lodash';

// Analizar:
//  - Colisión en nombre url / variable (/6/users/8?users=9&pepe=soriano)
//  - variables como array (/6/users/8?users[]='pepe'&users[]='soriano')
//

describe('Url Parser', () => {
  let variables;
  describe('with valid format String', () => {
    describe('with valid url instance', () => {
      describe('without parameters', () => {
        beforeEach(() => {
          let urlParser = new UrlParser('/:version/api/:collection/:id');
          variables = urlParser.extractVariables('/6/api/listings/3');
        });

        it('returns a map with 3 elements', () => {
          expect(_.size(variables)).toBe(3);
        });

        it('returns the correct structure', () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe('listings');
          expect(variables.id).toBe(3);
        });
      });

      describe('with ? but no parameters', () => {
        beforeEach(() => {
          let urlParser = new UrlParser('/:version/api/:collection/:id');
          variables = urlParser.extractVariables('/6/api/listings/3?');
        });

        it('returns a map with 3 elements', () => {
          expect(_.size(variables)).toBe(3);
        });

        it('returns the correct structure', () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe('listings');
          expect(variables.id).toBe(3);
        });
      });

      describe('with parameters', () => {
        beforeEach(() => {
          let urlParser = new UrlParser('/:version/api/:collection/:id');
          variables = urlParser.extractVariables('/6/api/listings/3?sort=desc&limit=10');
        });

        it('returns a map with 5 elements', () => {
          expect(_.size(variables)).toBe(5);
        });

        it('returns the correct structure', () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe('listings');
          expect(variables.id).toBe(3);
          expect(variables.sort).toBe('desc');
          expect(variables.limit).toBe(10);
        });
      });

      describe('with array parameters', () => {
        beforeEach(() => {
          let urlParser = new UrlParser('/:version/api/:collection/:id');
          variables = urlParser.extractVariables('/6/api/listings/3?userId[]=1&userId[]=2&userId[]=3&sort=desc');
        });

        it('returns a mpa with 5 elements', () => {
          expect(_.size(variables)).toBe(5);
        });

        it('returns the correct structure', () => {
          expect(variables.version).toBe(6);
          expect(variables.collection).toBe('listings');
          expect(variables.id).toBe(3);
          expect(variables.sort).toBe('desc');
          expect(variables.userId).toEqual(jasmine.any(Array));
        });
      });
    });
  });
});
