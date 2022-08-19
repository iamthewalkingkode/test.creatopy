/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { RESET, RESET_CONFIRM } from 'grophQL';
import PasswordStrength from './PasswordStrength';

const Reset = ({ setView }) => {

    const [form] = Form.useForm();
    const [step, setStep] = React.useState('email');
    const [pwd, setPwd] = React.useState('');
    const [strongPWD, setStrongPWD] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);

    const [Reset] = useMutation(RESET, { errorPolicy: 'all' });
    const [ResetConfirm] = useMutation(RESET_CONFIRM, { errorPolicy: 'all' });

    const submit = (variables) => {
        setSubmitting(true);
        if (step === 'email') {
            Reset({ variables }).then(e => {
                setSubmitting(false);
                if (e.data) {
                    notification.success({ message: e.data.Reset, duration: 5 });
                    setStep('code');
                }
            });
        } else {
            if (strongPWD) {
                ResetConfirm({ variables }).then(e => {
                    setSubmitting(false);
                    if (e.data) {
                        notification.success({ message: e.data.ResetConfirm });
                        setView('login');
                    }
                });
            } else {
                notification.error({ message: 'Your password is not strong enough' });
                setSubmitting(false);
            }
        }
    }

    return (
        <React.Fragment>
            <div className="flex justify-center items-center text-center">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mt-4">Forgot your password?</h1>
                    <p>Enter your email address and we will send you instructions on how to create a new password.</p>
                    <p>&nbsp;</p>
                    <Form layout="vertical" form={form} onFinish={submit}>
                        {step === 'email' && (
                            <Form.Item name="email" rules={[{ required: true, message: "Email is required", },]}>
                                <Input size="large" type="email" autoComplete="off" placeholder="Email" disabled={submitting} />
                            </Form.Item>
                        )}

                        {step === 'code' && (
                            <div>
                                <Form.Item name="code" rules={[{ required: true, message: "Email is required", },]}>
                                    <Input size="large" autoComplete="off" placeholder="• • • • • •" disabled={submitting} />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: "Password is required", },]}>
                                    <Input.Password size="large" autoComplete="off" placeholder="Password" disabled={submitting} onChange={e => setPwd(e.target.value)} />
                                </Form.Item>
                                <PasswordStrength value={pwd} onChange={strongPWD => setStrongPWD(strongPWD)} />
                            </div>
                        )}

                        <p>&nbsp;</p>
                        <Button size="large" block type="primary" htmlType="submit" loading={submitting}>
                            {step === 'email' ? 'Continue' : 'Submit'}
                        </Button>
                        <p>&nbsp;</p>
                        <div>
                            Return to <a className="font-semibold" onClick={() => setView('login')}>log in</a>
                        </div>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );

}

export default Reset;