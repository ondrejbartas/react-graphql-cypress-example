const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const defaultPosts = [
  { author: "John Doe", body: "Hello world" },
  { author: "Jane Doe", body: "Hi, planet!" },
]

const complexPosts = [
  { author: "Jeff", body: "Find more layers" },
  { author: "Elon", body: "Hello SpaceX" },
  { author: "John Doe", body: "Hello world" },
  { author: "Jane Doe", body: "Hi, planet!" },
]

let POSTS = JSON.parse(JSON.stringify(defaultPosts));

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID
    author: String
    body: String
  }

  type Mutation {
    submitPost(input: PostInput!): Post
  }

  input PostInput {
    id: ID
    author: String!
    body: String!
  }
`);

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  submitPost: ({ input: { id, author, body } }) => {
    const post = { author, body };
    let index = POSTS.length;

    if (id != null && id >= 0 && id < POSTS.length) {
      if (POSTS[id].author !== author) return null;

      POSTS.splice(id, 1, post);
      index = id;
    } else {
      POSTS.push(post);
    }

    return mapPost(post, index);
  },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/seed', (req, res) => {
  if (req.query.data_type === 'complex') {
    POSTS = JSON.parse(JSON.stringify(complexPosts))
  } else {
    POSTS = JSON.parse(JSON.stringify(defaultPosts))
  }
  res.send('Seeded!')
})

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
