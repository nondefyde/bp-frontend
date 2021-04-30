import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  Divider,
  Empty,
  Typography,
} from 'antd';
import './styles.scss';
import './ant-theme.css';
import './overrides.scss';
import { v4 as uuidv4 } from 'uuid';
import { MinusCircleOutlined } from '@ant-design/icons';
import { sample, sampleSize } from 'lodash';
import SubSetOne from './lib/SubsetOne';
import SubSetTwo from './lib/SubsetTwo';

const { Title } = Typography;
const defaultOptions = {
  generatedCountIDArray: [],
  subsetOne: 0,
  subsetTwo: 0,
  dataCount: 0,
};

const Main = () => {
  const [dataForm] = Form.useForm();
  const [generateDataOptions, setGenerateDataOptions] = useState(
    defaultOptions,
  );
  const [subsetOne, setSubsetOne] = useState({});
  const [showSubsetOneModal, setShowSubsetOneModal] = useState(false);

  const [subsetTwo, setSubsetTwo] = useState({
    sampled: {},
    original: {},
  });
  const [showSubsetTwoModal, setShowSubsetTwoModal] = useState(false);

  const onGenerateOptions = (values) => {
    const cloned = Object.assign({}, values);
    cloned.generatedCountIDArray = Array(parseInt(values.dataCount ?? '0', 10))
      .fill()
      .map(() => ({ id: uuidv4() }));
    setGenerateDataOptions(cloned);
  };

  const onResetOptions = () => {
    setGenerateDataOptions(defaultOptions);
  };

  const onGenerateSubset = (values, sub_set) => {
    const cloned = Object.assign({}, values);
    let keys = Object.keys(cloned);

    const generatedKeys = sampleSize(keys, sub_set);

    const generated = generatedKeys.reduce((acc, current) => {
      return Object.assign({}, acc, { [current]: cloned[current] });
    }, {});

    return { generated, generatedKeys };
  };

  const onGenerateSubSet1 = (values) => {
    setSubsetOne(
      onGenerateSubset(values, generateDataOptions.subsetOne).generated,
    );
    setShowSubsetOneModal(true);
  };

  const onRegenerateSubsetOne = () => {
    const values = dataForm.getFieldsValue();
    console.log(values);
    setSubsetOne(
      onGenerateSubset(values, generateDataOptions.subsetOne).generated,
    );
  };

  /**
   * Picks a random option for sub-set-2 when given a list of options
   * @param {Object} subsetValues
   * @param {Array} subsetValueKeys
   * @returns {Object}
   */
  const onGenerateSubsetTwoOptions = (subsetValues, subsetValueKeys) => {
    const sampled = subsetValueKeys.reduce((acc, current) => {
      const data = subsetValues[current];
      const options = data.options;
      return Object.assign({}, acc, {
        [current]: {
          ...data,
          ...sample(options),
        },
      });
    }, {});

    return sampled;
  };

  /**
   * Generates subset two data [randomizing the options and storing the unrandomized version]
   * @param {Object} values
   */
  const onGenerateSubSet2 = (values) => {
    const generatedSubsetData = onGenerateSubset(
      values,
      generateDataOptions.subsetTwo,
    );
    const generatedSubsetDataKeys = generatedSubsetData.generatedKeys;

    const sampled = onGenerateSubsetTwoOptions(values, generatedSubsetDataKeys);
    setSubsetTwo((prev) => ({
      ...prev,
      sampled,
      original: generatedSubsetData.generated,
    }));
  };

  /**
   * Regenerates the options of the result [subset 2] using the store original data
   */
  const onRegenerateResultOptions = () => {
    const keys = Object.keys(subsetTwo.original);
    const sampled = onGenerateSubsetTwoOptions(subsetTwo.original, keys);
    console.log('%cSAMPLED', 'color: pink; font-size: 20px;', sampled);
    setSubsetTwo((prev) => ({ ...prev, sampled }));
  };

  const onRegenerateResult = () => {
    onGenerateSubSet2(subsetOne);
  };

  return (
    <>
      <SubSetOne
        subsetOneVisibility={showSubsetOneModal}
        onSubsetOneModalVisibilityChange={setShowSubsetOneModal}
        data={subsetOne}
        onSubsetTwoModalVisibilityChange={setShowSubsetTwoModal}
        onGenerateSubSetTwo={onGenerateSubSet2}
        onRegenerateSubsetOne={onRegenerateSubsetOne}
      />
      <SubSetTwo
        subsetTwoVisibility={showSubsetTwoModal}
        onSubsetTwoModalVisibilityChange={setShowSubsetTwoModal}
        data={subsetTwo.sampled}
        onRegenerate={onRegenerateResult}
        onRegenerateResultOptions={onRegenerateResultOptions}
      />
      <div className="Algorithm">
        <Title level={2} style={{ textAlign: 'center' }}>
          Data Algorithm
        </Title>
        <Row gutter={[16, 40]}>
          <Col span={24}>
            <Form layout="vertical" onFinish={onGenerateOptions}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="dataCount"
                    label="Number of elements"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter number of elements',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="Enter number of elements"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="subsetOne"
                    label="Subset 1"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter number of sub 1',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="Enter number of sub 1"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="subsetTwo"
                    label="Subset 2"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter number of sub 2',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="Enter number of sub 2"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label=" ">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button htmlType="submit" type="primary" block>
                          Generate
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          onClick={onResetOptions}
                          htmlType="reset"
                          type="default"
                          block
                        >
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <div className="generated-section">
          {generateDataOptions.dataCount ? (
            <>
              <Divider dashed />

              <Form
                layout="vertical"
                form={dataForm}
                onFinish={onGenerateSubSet1}
              >
                {generateDataOptions.generatedCountIDArray.map(
                  ({ id }, index) => {
                    return (
                      <Row gutter={[16, 16]} key={index + 'generated'}>
                        <Col span={1}>
                          <Form.Item label=" ">
                            <span>{index + 1}</span>
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            label={'Home'}
                            name={[id, 'home']}
                            rules={[
                              {
                                required: true,
                                message: 'Please input the home value',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={3}>
                          <Form.Item label=" ">
                            <span className="flex-center">VS.</span>
                          </Form.Item>
                        </Col>

                        <Col span={10}>
                          <Form.Item
                            label={'Away'}
                            name={[id, 'away']}
                            rules={[
                              {
                                required: true,
                                message: 'Please input the away value',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Divider dashed />
                        <Col span={1} />
                        <Col span={23}>
                          <Row gutter={[10, 16]}>
                            <Form.List name={[id, 'options']}>
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map(
                                    (
                                      { key, name, fieldKey, ...restField },
                                      idx,
                                    ) => (
                                      <Col key={key} span={6}>
                                        <Row gutter={[10, 10]}>
                                          <Col span={22}>
                                            <Form.Item
                                              {...restField}
                                              name={[name, 'option']}
                                              fieldKey={[fieldKey, 'option']}
                                              label={'Option ' + (idx + 1)}
                                              rules={[
                                                {
                                                  required: true,
                                                  message: 'Missing option',
                                                },
                                              ]}
                                            >
                                              <Input
                                                style={{ width: '100%' }}
                                                placeholder={
                                                  'Option ' + (idx + 1)
                                                }
                                              />
                                            </Form.Item>{' '}
                                          </Col>
                                          <Col span={2}>
                                            <Form.Item label={' '}>
                                              <MinusCircleOutlined
                                                onClick={() => remove(name)}
                                              />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      </Col>
                                    ),
                                  )}
                                  <Form.Item label={' '}>
                                    <Button
                                      type="dashed"
                                      onClick={() => add()}
                                      block
                                    >
                                      Add Option
                                    </Button>
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                          </Row>
                        </Col>
                        <Divider dashed />
                      </Row>
                    );
                  },
                )}
                <Button htmlType="submit" type="primary" block>
                  Generate Subset
                </Button>
              </Form>
            </>
          ) : (
            <Empty
              description={
                'Nothing to show. Please fill in the options to begin'
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
