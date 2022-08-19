import * as types from '../types';
import * as authCtrl from '../controllers/auth.controller';
import * as itemCtrl from '../controllers/items.controller';

const db = require('../../models');

const resolvers = {
    Query: {
        users: async () => {
            return await db.Users.findAll();
        },
        GetItems: async (_: unknown, args: types.CreatItem, ctx: types.Context): Promise<[types.Item]> => await itemCtrl.GetItems(ctx),
    },

    Mutation: {
        // ::: auth methods
        Login: async (_: unknown, args: types.Auth): Promise<types.Authenticate> => await authCtrl.Login(_, args),
        Signup: async (_: unknown, args: types.User): Promise<types.Authenticate> => await authCtrl.Signup(_, args),
        Reset: async (_: unknown, args: types.Reset): Promise<string> => await authCtrl.Reset(_, args),
        ResetConfirm: async (_: unknown, args: types.Reset): Promise<string> => await authCtrl.ResetConfirm(_, args),
        // ::: item methods
        CreateItem: async (_: unknown, args: types.CreatItem, ctx: types.Context): Promise<types.Item> => await itemCtrl.CreateItem(_, args, ctx),
    }
};

module.exports = resolvers;