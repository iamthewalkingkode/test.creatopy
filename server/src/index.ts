import { verifyToken } from './controllers/auth.controller';
import * as types from './types';

const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const { sequelize } = require('../models');
const GQL_typeDefs = require('./gql/typeDefs');
const GQL_resolvers = require('./gql/resolvers');

const port = 8080;

const server = new ApolloServer({
    typeDefs: GQL_typeDefs,
    resolvers: GQL_resolvers,
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