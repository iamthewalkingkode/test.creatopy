import * as types from '../types';

const db = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ApolloError } = require('apollo-server');

// better to be an .env
const SECRET = ')Y?}PnbYMfMj#%!fJdVaSY?U}NBH9un?#L9ELUpgmCZ%DFhBZ%kH6Vung%Yu=cWa';

const randNumbers = (length: number = 6): string => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const verifyToken = (token: string): types.User => {
    const user = jwt.verify(token, SECRET) as types.User;
    return user;
}

export const GetUser = async (where: any): Promise<types.User> => {
    const user = await db.Users.findAll({ where }) as [types.User];
    return user[0];
}

export const Login = async (_: unknown, args: types.Auth): Promise<types.Authenticate> => {
    args['email'] = args.email.trim().toLowerCase();
    const user = await GetUser({ email: args.email });
    if (!user || !bcrypt.compareSync(args.password, (user || { password: '' }).password)) {
        throw new ApolloError('Invalid credentials', types.Errors.USER_NOT_FOUND);
    }
    const token = jwt.sign(JSON.parse(JSON.stringify(user)), SECRET);
    return { user, token };
}

export const Signup = async (_: unknown, args: types.Auth): Promise<types.Authenticate> => {
    // check if user already exist
    const userExists = await GetUser({ email: args.email });
    if (userExists) {
        throw new ApolloError('User already exists', types.Errors.USER_EXISTS);
    }
    args['email'] = args.email.trim().toLowerCase();
    args['password'] = await bcrypt.hashSync(args.password, 10);
    const user = await db.Users.create(args) as types.User;
    const token = jwt.sign(JSON.parse(JSON.stringify(user)), SECRET);
    return { user, token };
}

export const Reset = async (_: unknown, args: types.Reset): Promise<string> => {
    // check if user exist
    const userExists = await GetUser({ email: args.email });
    if (userExists) {
        const code = randNumbers();
        await db.Codes.create({ email: args.email, code });
        // should send code to email with a nice template in real world
        return `Reset code has been sent to ${args.email}: ${code}`;
    } else {
        throw new ApolloError(`No user with ${args.email} was found.`, types.Errors.USER_NOT_FOUND);
    }
}

export const ResetConfirm = async (_: unknown, args: types.Reset): Promise<string> => {
    // validate code
    const code = await db.Codes.findAll({ where: { code: args.code } }) as [types.Code];
    if (code.length > 0) {
        const password = await bcrypt.hashSync(args.password, 10);
        // update user's password
        await db.Users.update({ password }, {
            where: {
                email: code[0].email
            }
        });
        // delete code to prevent re-use
        await db.Codes.destroy({
            where: {
                code: code[0].code
            }
        });
        return `User password changed. You can now login!`;
    } else {
        return `Invalid code`;
    }
}