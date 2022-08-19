import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { GET_ITEMS } from 'grophQL';
import ItemForm from './ItemForm';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Skeleton } from '@mui/material';
import { Button, Modal } from 'antd';
import moment from 'moment';
import { loggUserOut } from 'store/store.slice';

const ListItems = () => {
    const auth = useSelector((state) => state.store.auth.user);
    const dispatch = useDispatch();
    const [data, setData] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [GetItems, items] = useLazyQuery(GET_ITEMS);

    React.useEffect(() => {
        GetItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!items.loading && items.data && items.data.GetItems.length > 0) {
            setData(items.data.GetItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const disconnect = () => {
        Modal.confirm({
            title: `Disconnect!`,
            content: `Sure you want to disconnect?`,
            centered: true,
            okText: `Yes, Disconnect`,
            cancelText: `No, Cancel`,
            onOk: () => {
                dispatch(loggUserOut());
            }
        });
    }

    return (
        <React.Fragment>
            <div id="App" className="px-5">
                <div className="pt-12">
                    <img src="creatopy-logo.svg" alt="Creatopy" style={{ margin: "0 auto" }} />

                    <div className="mt-8 flex justify-between">
                        <div className="flex items-center">
                            <Button icon={<i className="mdi mdi-power-standby" />} type="text" size="small" danger onClick={disconnect} />
                            <div className="ml-1">Hi, <b>{auth.name}</b>!</div>
                        </div>
                        <div className="flex items-center">
                            <Button size="small" type="primary" onClick={() => setShowForm(true)}>+ Add item</Button>
                        </div>
                    </div>
                    <p>&nbsp;</p>

                    {items.loading && (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {[1., 2, 3].map(item => (
                                <ListItem key={item}>
                                    <ListItemAvatar>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </ListItemAvatar>
                                    <Skeleton variant="rounded" width={'100%'} height={40} />
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {!items.loading && data.length === 0 && (
                        <div>You do not have any items.</div>
                    )}

                    {data.length > 0 && (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {data.map(item => (
                                <ListItem key={item.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img src={`https://joeschmoe.io/api/v1/random?v${item.id}`} alt={item.user.name} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.title}
                                        secondary={
                                            <span className="text-xs">
                                                <i className="mdi mdi-account-circle" /> {item.user.name} <br />
                                                <i className="mdi mdi-calendar-range" /> {moment(+item.createdAt).format('LLL')}
                                            </span>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
            </div>

            <ItemForm
                visible={showForm}
                onCancel={() => setShowForm(false)}
                onSuccess={() => items.refetch()}
            />
        </React.Fragment>
    );

}

export default ListItems;