import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const Item = ({item, refreshStudent, setrefreshStudent, refreshTeacher, setrefreshTeacher}) => {
    function handleDeleteUser(user){
        if(user.job){
            fetch(`http://localhost:3000/teachers/${user.id}`, {method:"DELETE"})
            .then(res => {
                setrefreshTeacher(!refreshTeacher)
            })
        }
        else{
            fetch(`http://localhost:3000/students/${user.id}`, {method:"DELETE"})
            .then(res => {
                setrefreshStudent(!refreshStudent)
            })
        }
    }
    return (
        <Card
        style={{
          width: 300,
        }}
       /*  cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        } */
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined onClick={() => handleDeleteUser(item)} className='hover:!text-red-500'/>
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={`${item.name} - ${item.surname}`}
          description={item?.study ? item.study : item.job}
        />
      </Card>
    )
};
export default Item;