import React from 'react';

import api from '../utils/api';
import formatRawData from '../utils/formatRawData';
import getColumnsForTable from '../utils/getColumnsForTable';
import getNumberOfDays from '../utils/getNumberOfDays';

import { Input, Layout, PageHeader, Table } from 'antd';
import 'antd/dist/antd.css';
import { Content, Footer } from 'antd/lib/layout/layout';

export default function App() {
  const [columns, setColumns] = React.useState([]);
  const [dataSource, setDataSource] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [period, setPeriod] = React.useState({ year: '----', month: '01' });
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    setColumns(getColumnsForTable({ days: getNumberOfDays(period.month) }));
  }, [period]);

  React.useEffect(() => {
    const filteredData = dataSource.filter((obj) =>
      obj.user.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredData(filteredData);
  }, [dataSource, inputValue]);

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

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <Layout>
      <PageHeader
        title="User's Time in Social Web"
        subTitle={`Month: ${period.month}/${period.year}`}
        extra={
          <Input
            placeholder="Search user"
            value={inputValue}
            onChange={handleInputChange}
          />
        }
      />

      <Content>
        <Table
          dataSource={filteredData}
          columns={columns}
          size="small"
          pagination={{
            position: ['bottomRight'],
          }}
          scroll={{
            x: 1000,
          }}
        />
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        <p>Test task for red_mad_robot</p>
        <p>Created by novvember in 09/2022</p>
      </Footer>
    </Layout>
  );
}
