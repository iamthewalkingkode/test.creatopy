/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { SIGNUP } from 'grophQL';
import { useDispatch } from 'react-redux';
import { loggUserIn } from 'store/store.slice';
import PasswordStrength from './PasswordStrength';

const Signup = ({ setView }) => {

    const [form] = Form.useForm();

    const [Signup, { loading }] = useMutation(SIGNUP, { errorPolicy: 'all' });
    const [pwd, setPwd] = React.useState('');
    const [strongPWD, setStrongPWD] = React.useState(false);
    const dispatch = useDispatch();

    const submit = (variables) => {
        Signup({ variables }).then(e => {
            if (e.data) {
                dispatch(loggUserIn(e.data.Signup));
                notification.success({ message: 'User authenticated' });
            }
        });;
    }

    return (
        <React.Fragment>
            <div className="flex justify-center items-center text-center">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mt-4 text-center">Sign in to your account</h1>
                    <p>&nbsp;</p>
                    <Form layout="vertical" form={form} onFinish={submit}>
                        <Form.Item name="name" rules={[{ required: true, message: "Name is required", },]}>
                            <Input size="large" type="name" autoComplete="off" placeholder="Your full name" disabled={loading} />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: "Email is required", },]}>
                            <Input size="large" type="email" autoComplete="off" placeholder="Email" disabled={loading} />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: "Password is required", },]}>
                            <Input.Password size="large" type="password" autoComplete="off" placeholder="Password" disabled={loading} onChange={e => setPwd(e.target.value)} />
                        </Form.Item>
                        <PasswordStrength value={pwd} onChange={strongPWD => setStrongPWD(strongPWD)} />

                        <p>&nbsp;</p>
                        <Button size="large" block type="primary" htmlType="submit" disabled={!strongPWD} loading={loading}>
                            Sign up
                        </Button>
                        <p>&nbsp;</p>
                        <div>
                            Already have an account?
                            <div><a className="font-semibold" onClick={() => setView('login')}>Sign in here!</a></div>
                        </div>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );

}

export default Signup;