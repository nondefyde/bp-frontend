import {Modal, Tag, Table, Row, Col, Button} from 'antd';


const subsetOneColumns = [
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
    title: 'Options',
    key: '_options',
    dataIndex: '_options',
    render: (tags) => (
      <>
        {(tags ?? []).map((tag) => {
          return (
            <Tag color={'volcano'} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const SubSetOne = (props) => {
  const {
    subsetOneVisibility,
    onSubsetOneModalVisibilityChange,
    onSubsetTwoModalVisibilityChange,
    data,
    onGenerateSubSetTwo,
    onRegenerateSubsetOne,
  } = props;
  const dataSource = Object.keys(data ?? {}).map((key) => {
    return {
      ...data[key],
      key,
      _options: data?.[key]?.options?.map?.((value) => value?.option),
      id: key,
    };
  });
  const generate = () => {
    onGenerateSubSetTwo(data);
    onSubsetTwoModalVisibilityChange(true);
  };
  return (
    <Modal
      title="Subset One"
      visible={subsetOneVisibility}
      onCancel={() => onSubsetOneModalVisibilityChange(false)}
      height={'80vh'}
      width={'70vw'}
      centered
      footer={[
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col span={12}>
            <Row gutter={[10, 10]} justify={'start'}>
              <Button type={'default'} onClick={onRegenerateSubsetOne}>
                Regenerate Subset
              </Button>
            </Row>
          </Col>

          <Col span={12}>
            <Row gutter={[10, 10]} justify={'end'}>
              <Col>
                <Button onClick={() => onSubsetOneModalVisibilityChange(false)}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type={'primary'} onClick={generate}>
                Generate Result
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>,
      ]}
    >
      <Table columns={subsetOneColumns} dataSource={dataSource} />
    </Modal>
  );
};

export default SubSetOne;
