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
  const [period, setPeriod] = React.useState({ year: '0000', month: '00' });

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

  return (
    <Layout>
      <PageHeader
        title="User's Time in Social Web"
        subTitle={`Month: ${period.month}/${period.year}`}
        extra={<Input placeholder="Search user" />}
      />

      <Content>
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={{
            position: ['bottomRight'],
          }}
          scroll={{
            x: 100,
            // y: 1000,
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
