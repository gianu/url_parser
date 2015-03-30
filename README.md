# Url Parser

A simple utility to parse Url

## How it works

Given a format string (eg: '/users/:userId/comments'), this module parse urls and returns a hash with the variables.

In this context a variables is:
* Everything that starts with a colon(:)
* Every value of the query string (everything after ?)

Examples:

```javascript
let urlParser = new UrlParser('/users/:userId/comments');

urlParser.extractVariables('/users/100/comments');
// => { 'userId': 100}

urlParser.extractVariables('/users/100/comments?sort=desc&limit=10');
// => { 'userId': 100, 'sort': 'desc', 'limit': 10}

urlParser.extractVariables('/users/100/comments?relatedCommentId[]=50&relatedCommentId[]=51');
// => { 'userId': 100, 'relatedCommentId': [50, 51]}
```

you can send a boolean as a second argument to extractVariables to override variables in case of collision

```javascript
 let urlParser = new UrlParser('/users/:userId/comments');

 urlParser.extractVariables('/users/100/comments?userId=200');
 // => { 'userId': 100 }

 urlParser.extractVariables('/users/100/comments?userId=200', true);
 // => { 'userId': 200 }
```
