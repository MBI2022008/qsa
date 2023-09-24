import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form,Row,Col,Dropdown,Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Display.css';

function Display({group,setGroup,sort,setSort}){
    const handleGroupChange = (e) => {
      setGroup(Number(e.target.value));
      localStorage.setItem("kanGroup",e.target.value);
    };
    const handleSortChange = (e)=>{
      setSort(Number(e.target.value));
      localStorage.setItem("kanSort",e.target.value);
    };
    return (
         <>
          <Dropdown>
            <Dropdown.Toggle 
              id="display-dropdown-button" 
              variant="secondary" 
              className="mr-10"
            >
              Display
            </Dropdown.Toggle>
  
            <Dropdown.Menu className='dropdown_size'>
              <Row>
                <Col>
                  Grouping:
                </Col>
                <Col>
                <Dropdown.ItemText>
                
                <Form.Control 
                  as='select' 
                  value={group}
                  onChange={handleGroupChange}
                >
                  <option key='1' value={1}>
                    Status
                  </option>
                  <option key='2' value={2}>
                    User
                  </option>
                  <option key='3' value={3}>
                    Priority
                  </option>
                </Form.Control>
              </Dropdown.ItemText>
                </Col>
              </Row>
              <Row>
                <Col>
                    Sorting: 
                </Col>
              <Col>
              <Dropdown.ItemText>
                <Form.Control 
                  as='select' 
                  value={sort}
                  onChange={handleSortChange}
                >
                  <option key='1' value={1}>
                    Priority
                  </option>
                  <option key='2' value={2}>
                    Title
                  </option>
                </Form.Control>
              </Dropdown.ItemText>
              </Col>
              </Row>
            </Dropdown.Menu>
          </Dropdown>
        </>
    );
  }



export default Display