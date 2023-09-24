import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form,Row,Col,Dropdown,Button} from 'react-bootstrap';
import Display from './Components/Display';
import Tab from './Components/Tab';
import Avatar from './Components/Avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsThreeDots,BsExclamationSquareFill} from 'react-icons/bs';
import {BiSolidCircleHalf} from 'react-icons/bi';
import {TbCircleDotted} from 'react-icons/tb';
import {AiFillCheckCircle,AiOutlineDash} from 'react-icons/ai';
import {FaRegCircle} from 'react-icons/fa';
import {MdOutlineSignalCellularAlt1Bar,MdOutlineSignalCellularAlt2Bar,MdOutlineSignalCellularAlt,MdCancel} from 'react-icons/md';



function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [group,setGroup] = useState(parseInt(localStorage.getItem("kanGroup"))||2);
  const [sort,setSort] = useState(parseInt(localStorage.getItem("kanSort"))||1);
  let priority = {0:{'name':'No Priority'},1:{'name':'Low'},2:{'name':'Medium'},3:{'name':'High'},4:{'name':'Urgent'}};
  let priority_icons = [<AiOutlineDash style={{color:'darkgray'}}/>,<MdOutlineSignalCellularAlt1Bar style={{color:'darkgray'}}/>,<MdOutlineSignalCellularAlt2Bar style={{color:'darkgray'}} />,<MdOutlineSignalCellularAlt  style={{color:'darkgray'}}/>,<BsExclamationSquareFill  style={{color:'orange'}}/>]
  const inprog = <div className='inProgress'><BiSolidCircleHalf size={15} color='orange'/></div>;
  let statu = {0:{'name':'Backlog'},1:{'name':'Todo'},2:{'name':'In progress'},3:{'name':'Done'},4:{'name':'Canceled'}};
  let status_icons = {2:inprog,1:<TbCircleDotted style={{color:'darkgray'}}/>,3:<AiFillCheckCircle style={{color:'blue'}}/>,4:<MdCancel style={{color:'darkgray'}}/>,0:<FaRegCircle style={{color:'darkgray'}}/>}

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  let sortedByPriority = [];
  let sortedByTitle =[]
  if(data.tickets)
  {
    sortedByPriority = [...data.tickets].sort((a, b) => b.priority - a.priority);
    sortedByTitle = [...data.tickets].sort((a, b) => a.title.localeCompare(b.title));
  }

  let users = {}
  let avatarIcons = {}
  if(data.users)
  {
    users = data.users.reduce((acc, obj) => {
      const { id, ...rest } = obj;
      acc[id] = rest;
      return acc;
    }, {});
    
  }
  if(users)
  {
    for (let userId in users) {
      avatarIcons[userId] = <Avatar key={userId} user={users[userId]} />;
    }
  }
  let userByPriority = {}
  if(sortedByPriority)
  {
    const groupedByUserId = sortedByPriority.reduce((acc, obj) => {
      const { userId, ...rest } = obj;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(rest);
      return acc;
    }, {});
    userByPriority = Object.keys(groupedByUserId)
    .sort()
    .reduce((sortedObj, key) => {
      sortedObj[key] = groupedByUserId[key];
      return sortedObj;
    }, {});
  }
  let userByTitle = {}
  if(sortedByTitle)
  {
    const groupedByUserId = sortedByTitle.reduce((acc, obj) => {
      const { userId, ...rest } = obj;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(rest);
      return acc;
    }, {});
    userByTitle = Object.keys(groupedByUserId)
    .sort()
    .reduce((sortedObj, key) => {
      sortedObj[key] = groupedByUserId[key];
      return sortedObj;
    }, {});
  }
  let priorityByTitle = {};
  if (sortedByTitle) {
    const groupedByPriority = sortedByTitle.reduce((acc, obj) => {
        const { priority, ...rest } = obj;
        if (!acc[priority]) {
            acc[priority] = [];
        }
        acc[priority].push(rest);
        return acc;
    }, {});

    priorityByTitle = Object.keys(groupedByPriority)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Assuming priority is a number
        .reduce((sortedObj, key) => {
            sortedObj[key] = groupedByPriority[key];
            return sortedObj;
        }, {});
  }
  let statusByPriority = {};
  let stat = {'Backlog':0,'Todo':1,'In progress':2,'Done':3,'Canceled':4};
  if (sortedByPriority) {
    let groupedBystatus = sortedByPriority.reduce((acc, obj) => {
        const statusValue = stat[obj.status];
        if(!acc[statusValue])
        {
          acc[statusValue] = [];
        }
        acc[statusValue].push(obj);
        return acc;
    }, {});
    Object.keys(statu).forEach(key => {
      if(!groupedBystatus[key])
      {
        groupedBystatus[key] = [];
      }
    });
    statusByPriority = Object.keys(groupedBystatus)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Assuming priority is a number
        .reduce((sortedObj, key) => {
            sortedObj[key] = groupedBystatus[key];
            return sortedObj;
        }, {});
  }
  let statusByTitle = {};
  if (sortedByTitle) {
    let groupedBystatus = sortedByTitle.reduce((acc, obj) => {
        const statusValue = stat[obj.status];
        if(!acc[statusValue])
        {
          acc[statusValue] = [];
        }
        acc[statusValue].push(obj);
        return acc;
    }, {});
    Object.keys(statu).forEach(key => {
      if(!groupedBystatus[key])
      {
        groupedBystatus[key] = [];
      }
    });
    statusByTitle = Object.keys(groupedBystatus)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Assuming priority is a number
        .reduce((sortedObj, key) => {
            sortedObj[key] = groupedBystatus[key];
            return sortedObj;
        }, {});
  }
  let displayGroup = {};
  let icons;
  let category;
  if(group === 1)
  {
    icons = status_icons;
    category = statu;
    if(sort === 1)
    {
      displayGroup = statusByPriority
    }
    else
    {
      displayGroup = statusByTitle;
    }
  }
  else if(group === 2)
  {
    icons = avatarIcons;
    category = users;
    if(sort === 1)
    {
      displayGroup = userByPriority;
    }
    else
    {
      displayGroup = userByTitle;
    }
  }
  else if(group === 3)
  {
    displayGroup = priorityByTitle;
    icons = priority_icons;
    category = priority;
  }
return (
  <>
    <header style={{margin:"10px", borderBottom:"10px"}}>
      <Display group={group} setGroup={setGroup} sort={sort} setSort={setSort}/>
    </header>
    <div style={{margin:"10px"}}>
    <Row>
  {displayGroup && Object.entries(displayGroup).map(([Id, userTickets]) => (
      <Col key={Id}>
        <h4>
        <span style={{ display: 'inline-block', marginRight: '10px' }}>
            {icons[Id]}
          </span>
          <span style={{ display: 'inline-block', marginRight:'10px' }}>
            {category[Id].name}
          </span>
          <span style={{ display: 'inline-block' }}>
            {displayGroup[Id] ? displayGroup[Id].length : 0}
          </span>
        </h4>
        {userTickets.map((ticket) => {
          const tabProps = {
            tick: ticket,
            group: group,
            pri_icon: priority_icons[ticket.priority],
            stat_icon: status_icons[stat[ticket.status]],
            ava_icon: avatarIcons[ticket.userId]
          };

          return (
            <div key={ticket.id}>
              <Tab allProps={tabProps} />
              <hr style={{ borderColor: 'transparent', height: '0px' }} />
            </div>
          );
        })}
      </Col>
    ))
  }
</Row>
    </div>
  </>
);

}

export default App;
