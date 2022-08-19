/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'grophQL';
import { useDispatch } from 'react-redux';
import { loggUserIn } from 'store/store.slice';

const Login = ({ setView }) => {

    const [form] = Form.useForm();
    const [Login, { loading, }] = useMutation(LOGIN, { errorPolicy: 'all' });
    const dispatch = useDispatch();

    const submit = (variables) => {
        Login({ variables }).then(e => {
            if (e.data) {
                dispatch(loggUserIn(e.data.Login));
                notification.success({ message: 'User authenticated' });
            }
        });
    }

    return (
        <React.Fragment>
            <div className="flex justify-center items-center text-center">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mt-4">Sign in to your account</h1>
                    <p>&nbsp;</p>
                    <Form layout="vertical" form={form} onFinish={submit}>
                        <Form.Item name="email" rules={[{ required: true, message: "Email is required", },]}>
                            <Input size="large" type="email" autoComplete="off" placeholder="Email" disabled={loading} />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: "Password is required", },]}>
                            <Input.Password size="large" type="password" autoComplete="off" placeholder="Password" disabled={loading} />
                        </Form.Item>

                        <p>&nbsp;</p>
                        <Button size="large" block type="primary" htmlType="submit" loading={loading}>
                            Sign in
                        </Button>
                        <p>&nbsp;</p>
                        <div>
                            Don't have an account?
                            <div><a className="font-semibold" onClick={() => setView('signup')}>Sign up for free!</a></div>
                        </div>

                        <div className="mt-8"><a className="font-semibold" onClick={() => setView('reset')}>Forgot password?</a></div>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );

}

export default Login;