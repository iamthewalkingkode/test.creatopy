import React from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM } from 'grophQL';

const ItemForm = ({ visible, onCancel, onSuccess }) => {
    const auth = useSelector((state) => state.store.auth.user);
    const [form] = Form.useForm();
    const [CreateItem, { loading, }] = useMutation(CREATE_ITEM, { errorPolicy: 'all' });

    const submit = (variables) => {
        variables['userId'] = auth.id;
        CreateItem({ variables }).then(e => {
            if (e.data) {
                onSuccess && onSuccess(e.data.CreateItem);
                // dispatch(loggUserIn(e.data.Login));
                notification.success({ message: 'Item added' });
                close();
            }
        });
    }

    const close = () => {
        onCancel && onCancel();
        form.resetFields();
    }

    return (
        <React.Fragment>
            <Modal visible={visible} title="Add item" centered width={300} footer={null} onCancel={close}>
                {visible && (
                    <div className="w-full">
                        <Form layout="vertical" form={form} onFinish={submit}>
                            <Form.Item name="title" rules={[{ required: true, message: "Title is required", },]}>
                                <Input size="large" type="title" autoComplete="off" autoFocus placeholder="Title" disabled={loading} />
                            </Form.Item>

                            <div className="text-right">
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    &nbsp; &nbsp; Save &nbsp; &nbsp;
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Modal>
        </React.Fragment>
    );

}

export default ItemForm;