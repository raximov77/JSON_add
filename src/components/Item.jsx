import React from 'react';
import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const Item = ({ item, refreshStudent, setRefreshStudent, refreshTeacher, setRefreshTeacher }) => {
  function handleDeleteUser(user) {
    if (user.job) {
      fetch(`http://localhost:3000/teachers/${user.id}`, { method: "DELETE" })
        .then(() => setRefreshTeacher((prev) => !prev))
        .catch((error) => console.error("Error deleting teacher:", error));
    } else {
      fetch(`http://localhost:3000/students/${user.id}`, { method: "DELETE" })
        .then(() => setRefreshStudent((prev) => !prev))
        .catch((error) => console.error("Error deleting student:", error));
    }
  }

  return (
    <Card
      className='w-72 transform transition duration-300 hover:scale-105 hover:shadow-lg'
      hoverable
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined onClick={() => handleDeleteUser(item)} className='hover:text-red-500' />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title={`${item.name} - ${item.surname}`}
        description={item?.study ? item.study : item.job}
      />
    </Card>
  );
};

export default Item;





/* problem with deleting*/

/* export default App,,,   import React from 'react';
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
export default Item;  */