export default function getColumnsForTable({ days }) {
  const userColumn = {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  };

  const daysColumns = new Array(days).fill({}).map((day, pos) => {
    const dayNum = pos + 1;
    return {
      title: dayNum.toString(),
      dataIndex: `day${dayNum}`,
      key: `day${dayNum}`,
    };
  });

  const totalColumn = {
    title: 'Monthly total',
    dataIndex: 'total',
    key: 'total',
  };

  return [userColumn, ...daysColumns, totalColumn];
}
