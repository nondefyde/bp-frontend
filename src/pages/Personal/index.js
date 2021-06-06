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
            <Col span={3} className='control'>
                <Button type="text" onClick={previous}>
                    <LeftOutlined style={{fontSize: '70px'}}/>
                </Button>
            </Col>
            <Col span={18} className='content'>
                <Carousel ref={carousel}>
                    <div>
                        <h3 style={contentStyle}>
                            Hi, There.
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            From the very moment i set my eyes on you,
                            i knew i had met the most beautiful and amazing girl.
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            You light up my world and i can't wait to share my today, tomorrow and forever
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            I LOve you Ebi Wright, Yes you.
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            Be my friend, my lover, my soul mate and my everything. And make me the luckiest guy on earth.
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            ?.
                        </h3>
                    </div>
                </Carousel>
            </Col>
            <Col span={3} className='control'>
                <Button type="text" onClick={next}>
                    <RightOutlined style={{fontSize: '70px'}}/>
                </Button>
            </Col>
        </Row>
    );
};

export default Personal;
