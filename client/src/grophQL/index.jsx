import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        Login(email: $email, password: $password) {
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
            token
        }
    }
`;

const SIGNUP = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
        Signup(name: $name, email: $email, password: $password) {
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
            token
        }
    }
`;

const GET_ITEMS = gql`
    query GetItems {
        GetItems {
            id
            title
            user {
                name
                id
            }
            userId
            createdAt
            updatedAt
        }
    }
`;


const CREATE_ITEM = gql`
    mutation CreateItem($title: String!, $userId: Int!) {
        CreateItem(title: $title, userId: $userId) {
            user {
                id
                name
            }
            title
            id
            createdAt
        }
    }
`;

const RESET = gql`
    mutation Reset($email: String!) {
        Reset(email: $email)
    }
`;

const RESET_CONFIRM = gql`
    mutation Reset($code: String!, $password: String!) {
        ResetConfirm(code: $code, password: $password)
    }
`;


export { LOGIN, SIGNUP, GET_ITEMS, CREATE_ITEM, RESET, RESET_CONFIRM, };