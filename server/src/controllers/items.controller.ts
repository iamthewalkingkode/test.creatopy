import * as types from '../types';

const db = require('../../models');
const { ApolloError } = require('apollo-server');
const { GetUser } = require('./auth.controller');


const formatItem = async (item: types.Item): Promise<types.Item> => {
    const user = await GetUser({ id: item.userId });
    item['user'] = user;
    return item;
}

const GetItems = async (ctx: types.Context): Promise<[types.Item]> => {
    if (!ctx.user) throw new ApolloError('User not authorized', types.Errors.USER_NOT_AUTHORIZED);
    let items = await db.Items.findAll({
        order: [['id', 'DESC']],
    }) as [types.Item];
    let itams = [];
    for (var i = 0; i < items.length; i++) {
        itams.push(await formatItem(items[i]));
    }
    return itams as [types.Item];
}

const CreateItem = async (_: unknown, args: types.CreatItem, ctx: types.Context): Promise<types.Item> => {
    if (!ctx.user) throw new ApolloError('User not authorized', types.Errors.USER_NOT_AUTHORIZED);
    // check if user already exist. Only existing user can create a item
    const userExists = await GetUser(args.userId);
    if (!userExists) {
        throw new ApolloError('User not found', types.Errors.USER_NOT_FOUND);
    }
    const item = await db.Items.create(args) as types.Item;
    return await formatItem(item);
}

module.exports = { GetItems, CreateItem };