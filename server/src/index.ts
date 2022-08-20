import * as types from './types';

const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers');
const { verifyToken } = require('./controllers/auth.controller');
const { sequelize } = require('../models');

const port = 8080;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: (_: types.Context) => {
        const headers = _.req.headers as any;
        const user = headers.authorization ? verifyToken(headers.authorization) : null;
        return { user };
    },
});

// start database
const startDb = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
startDb();

server.listen(port).then(() => {
    console.log(`🚀  [server]: Server is running at ${port}`);
});