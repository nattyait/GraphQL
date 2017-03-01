var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type RandomDie {
  	numSidesf: Int!
  	rollOnce: Int!
    roll(numRolls: Int!): [Int]
  },
  type Query {
   getDie(numSides: Int): RandomDie
   getMessage(id: ID!): Message
   ip: String
  },
  type Mutation {
  	createMessage(input: MessageInput): Message
  	updateMessage(id: ID!, input: MessageInput): Message
  }
  input MessageInput {
  	content: String
  	author: String
  }
  type Message {
  	id: ID!
  	content: String
  	author: String
  }
`);

class RandomDie {
    constructor(numSides){
        this.numSides = numSides;
    }
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }
    roll({numRolls}) {
    	var output = [];
    	for(var i = 0; i < numRolls; i++){
    		output.push(this.rollOnce());
    	}
    	return output;
    }
}

class Message {
	constructor(id, {content, author}) {
		this.id = id;
		this.content = content;
		this.author = author;
	}
}

var fakeDatabase = {};

function loggingMiddleware(req, res, next) {
	console.log('ip: ', req.ip)
	next();
}

var root = {
  getDie: function({numSides}) {
    return new RandomDie(numSides || 6);
  },
  getMessage: function({id}) {
  	return fakeDatabase.message;
  },
  createMessage: function({input}) {
  	var id = require('crypto').randomBytes(10).toString('hex');
  	fakeDatabase[id] = input;
  	return new Message(id, input)
  },
  updateMessage: function({id, input}) {
  	if(!fakeDatabase[id]) {
  		throw new Error('no message exists with id' + id);
  	}
  	fakeDatabase[id] = input;
  	return new Message(id, input);
  },
  ip: function(args, request) {
  	return request.ip;
  }

};

var app = express();
app.use(loggingMiddleware)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
