import { Modal, Tag, Table, Row, Col, Button } from 'antd';
const subsetTwoColumns = [
  {
    title: 'Home',
    dataIndex: 'home',
    key: 'home',
  },
  {
    title: 'Away',
    dataIndex: 'away',
    key: 'away',
  },
  {
    title: 'Option',
    key: 'option',
    dataIndex: 'option',
    render: (tag) => (
      <Tag color={'blue'} key={tag}>
        {(tag || '').toUpperCase()}
      </Tag>
    ),
  },
];

const SubSetTwo = (props) => {
  const {
    subsetTwoVisibility,
    onSubsetTwoModalVisibilityChange,
    onRegenerate,
    onRegenerateResultOptions,
    data,
  } = props;
  const dataSource = Object.keys(data ?? {}).map((key) => {
    return {
      ...data[key],
      key,
      id: key,
    };
  });
  return (
    <Modal
      title="Subset Two"
      visible={subsetTwoVisibility}
      height={'80vh'}
      width={'70vw'}
      centered
      onCancel={() => onSubsetTwoModalVisibilityChange(false)}
      footer={[
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col span={12}>
            <Row gutter={[10, 10]} justify={'start'}>
              <Button type={'default'} onClick={onRegenerateResultOptions}>
                Regenerate Options
              </Button>
            </Row>
          </Col>

          <Col span={12}>
            <Row gutter={[10, 10]} justify={'end'}>
              <Col>
                <Button onClick={() => onSubsetTwoModalVisibilityChange(false)}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type={'primary'} onClick={onRegenerate}>
                  Regenerate Result
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>,
      ]}
    >
      <Table columns={subsetTwoColumns} dataSource={dataSource} />
    </Modal>
  );
};

export default SubSetTwo;
