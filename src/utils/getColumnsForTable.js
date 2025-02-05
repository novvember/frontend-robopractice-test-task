import formatTime from './formatTime';

export default function getColumnsForTable({ days }) {
  const userColumn = {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    sorter: (a, b) => a.user.localeCompare(b.user),
    defaultSortOrder: 'descend',
    fixed: 'left',
    width: 150,
  };

  const daysColumns = new Array(days).fill({}).map((day, pos) => {
    const dayNum = pos + 1;
    return {
      title: dayNum.toString(),
      dataIndex: `day${dayNum}`,
      key: `day${dayNum}`,
      render: formatTime,
      sorter: (a, b) => a[`day${dayNum}`] - b[`day${dayNum}`],
      width: 60,
      align: 'right',
    };
  });

  const totalColumn = {
    title: 'Monthly total',
    dataIndex: 'total',
    key: 'total',
    render: formatTime,
    sorter: (a, b) => a.total - b.total,
    fixed: 'right',
    width: 80,
    align: 'right',
  };

  return [userColumn, ...daysColumns, totalColumn];
}
