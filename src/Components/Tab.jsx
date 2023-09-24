import React from 'react';
import { Row,Col,Card,Button} from 'react-bootstrap';
import {PiCircleDashedThin} from 'react-icons/pi';
import {FaCircle} from 'react-icons/fa';
import {BsThreeDots} from 'react-icons/bs';
import './Tab.css'


function Tab({allProps}){
    const { tick, group, pri_icon, stat_icon, ava_icon} = allProps;
    console.log(group)
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return `${text.substring(0, maxLength)}...`;
    }
  return (
    <Card>
      <Card.Header style={{ borderBottom: 'none',backgroundColor:'white' }}>
        <Row className="justify-content-between">
        <Col md="auto" style={{color:'darkgray',marginleft:"4px"}}>{tick.id}</Col>
        <Col md="auto">{group !== 2 && ava_icon}</Col>
        </Row>
      </Card.Header>
      <Card.Body>
      <Row>
      <Row style={{ alignItems: 'top' }}>
        <div style={{ flex: '0 0 0.5px'}}>
            {group !== 1 && stat_icon}
        </div>
        <Col>
            <Card.Text style={{ fontSize: "14px", fontWeight: "bold" }}>
                {truncateText(tick.title, 60)}
            </Card.Text>
        </Col>
    </Row>
      </Row>
      </Card.Body>
      <Card.Footer style={{ borderTop: 'none',backgroundColor:'white' }}>
        {group !== 3 && <Button variant='light' style={{fontSize:'12px'}}>{pri_icon}</Button>}
        {tick.tag && <Button variant="light" style={{fontSize:'12px'}} ><FaCircle style={{color:'darkgray'}}/>  {tick.tag}</Button>}
      </Card.Footer>
    </Card>
  )
}

export default Tab