import React, { useEffect, useState } from 'react';
import Item from './components/Item';
import { Button, Input, Select } from 'antd';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [statusUser, setStatusUser] = useState("1");
  const [refreshStudent, setRefreshStudent] = useState(false);
  const [refreshTeacher, setRefreshTeacher] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      surname: e.target.surname.value,
    };

    if (statusUser === "1") {
      data.study = e.target.job0rStudy.value;
      fetch("http://localhost:3000/students", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then(() => {
        setRefreshStudent(!refreshStudent);
        e.target.reset(); 
      });
    } else {
      data.job = e.target.job0rStudy.value;
      fetch("http://localhost:3000/teachers", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then(() => {
        setRefreshTeacher(!refreshTeacher);
        e.target.reset(); 
      });
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [refreshStudent]);

  useEffect(() => {
    fetch("http://localhost:3000/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, [refreshTeacher]);

  return (
    <>
      <form onSubmit={handleSubmit} className='w-3/5 p-5 rounded-md bg-gray-400 mx-auto mb-10 mt-5' autoComplete='off'>
        <div className='flex items-center justify-between gap-5'>
          <div className='flex flex-col w-1/2 gap-5'>
            <Select
              allowClear
              value={statusUser}
              size='large'
              onChange={(e) => setStatusUser(e)}
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={[
                { value: '1', label: 'Student' },
                { value: '2', label: 'Teacher' }
              ]}
            />
            <Input name='job0rStudy' className='w-full' size='large' allowClear type='text' placeholder={`Enter ${statusUser === "1" ? "study place" : "job name"}`} />
          </div>
          <div className='flex flex-col w-1/2 gap-5'>
            <Input name='name' className='w-full' size='large' allowClear type='text' placeholder='Enter name' />
            <Input name='surname' className='w-full' size='large' allowClear type='text' placeholder='Enter surname' />
          </div>
        </div>
        <Button htmlType='submit' className='w-full mt-5 bg-green-600' size='large' type='primary'>
          Add {statusUser === "1" ? "Student" : "Teacher"}
        </Button>
      </form>

      <div className='flex justify-center gap-20 p-10'>
        <ul className='bg-gray-400 p-5 rounded-md space-y-4'>
          {students.map((item) => (
            <Item key={item.id} item={item} refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent} refreshTeacher={refreshTeacher} setRefreshTeacher={setRefreshTeacher} />
          ))}
        </ul>
        <ul className='bg-gray-400 p-5 rounded-md space-y-4'>
          {teachers.map((item) => (
            <Item key={item.id} item={item} refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent} refreshTeacher={refreshTeacher} setRefreshTeacher={setRefreshTeacher} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
