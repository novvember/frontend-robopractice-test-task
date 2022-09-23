import { Table } from 'antd';
import React from 'react';
import api from '../utils/api';

export default function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const data = await api.getData();
      setData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}
