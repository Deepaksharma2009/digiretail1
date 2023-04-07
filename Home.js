import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Home = () => {
const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
  });

  useEffect(() => {
    getuser()
  }, [])

  const getuser = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSearch = (event) => {
    const value = event.target.value
   setSearch(value);
  };
  const handleAddUser = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(value)
    setNewUser({ ...search, [name]: value });
  };
  const AddUser = async () => {
    try {
      console.log(newUser)
      const res = await axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteUser = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const Searchfun = () => {
    console.log(search)
    const serarch = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setUsers(serarch)
  }
  return (
    <div>
      <input type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
      <button onClick={Searchfun}>Search</button>
      {users && users.map((user) => {
        return (
          <ul key={user.id}>
            <li >
              {user.id} {user.name} ({user.username}) <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          </ul>)
      })}
      <input type="text" name='name' className="form-control" placeholder="Username" value={newUser.name} onChange={handleAddUser} />
      <button className="btn btn-outline-secondary" type="submit" onClick={AddUser}>Add User</button>
    </div>
  );
};
export default Home;