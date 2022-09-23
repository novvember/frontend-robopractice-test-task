import { Table } from 'antd';
import React from 'react';
import api from '../utils/api';

export default function App() {
  const [data, setData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const data = await api.getData();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    createColumns();
  }, []);

  function createColumns() {
    const userColumn = {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    };
    const totalColumn = {
      title: 'Monthly total',
      dataIndex: 'total',
      key: 'total',
    };
    const daysColumns = new Array(31).fill({}).map((day, pos) => {
      const dayNum = pos + 1;
      return {
        title: dayNum.toString(),
        dataIndex: `day${dayNum}`,
        key: `day${dayNum}`,
      };
    });
    setColumns([userColumn, ...daysColumns, totalColumn]);
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

  return <Table dataSource={dataSource} columns={columns} />;
}
