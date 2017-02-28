# GraphQL
First time GraphQL from http://graphql.org/graphql-js/

## Installation
`brew install npm`

`npm init --yes`

`npm install graphql --save`

## Run server
`node server.js`
and check the port in server.js

## GraphQL client
http://graphql.org/graphql-js/graphql-clients/

In terminal
```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql
```

In Developer Console
```
var dice = 3;
var sides = 6;
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
  console.log('data returned:', xhr.response);
}
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: { dice: dice, sides: sides },
}));
```

