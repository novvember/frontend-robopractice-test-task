import { Table } from 'antd';
import React from 'react';
import api from '../utils/api';
import formatRawData from '../utils/formatRawData';
import getColumnsForTable from '../utils/getColumnsForTable';
import getNumberOfDays from '../utils/getNumberOfDays';

export default function App() {
  const [columns, setColumns] = React.useState([]);
  const [dataSource, setDataSource] = React.useState([]);
  const [period, setPeriod] = React.useState({ year: '2000', month: '01' });

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    setColumns(getColumnsForTable({ days: getNumberOfDays(period.month) }));
  }, [period]);

  async function getData() {
    try {
      const data = await api.getData();
      const [dataSource, period] = formatRawData(data);
      setDataSource(dataSource);
      setPeriod(period);
    } catch (err) {
      console.error(err);
    }
  }

  return <Table dataSource={dataSource} columns={columns} />;
}
