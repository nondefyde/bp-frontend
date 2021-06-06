import React, {useRef} from 'react';
import {Button, Carousel, Col, Row} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import './overrides.scss';

const Personal = () => {
    
    const contentStyle = {
        height: '100vh',
        color: '#fff',
        lineHeight: '160px',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#364d79'
    };
    
    const carousel = useRef(null);
    
    const next = () => {
        console.log('carousel ::: ', carousel);
        carousel.current.next();
    };
    const previous = () => {
        carousel.current.prev();
    };
    
    return (
        <Row class='main'>
            <Col span={2} className='control'>
                <Button type="text" onClick={previous}>
                    <LeftOutlined style={{fontSize: '100px'}}/>
                </Button>
            </Col>
            <Col span={20} className='content'>
                <Carousel ref={carousel}>
                    <div>
                        <h3 style={contentStyle}>
                            1
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Col>
            <Col span={2} className='control'>
                <Button type="text" onClick={next}>
                    <RightOutlined style={{fontSize: '100px'}}/>
                </Button>
            </Col>
        </Row>
    );
};

export default Personal;
