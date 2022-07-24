
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    
    fetch('http://localhost:5000/users', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const newUsers = [...users , data];
      setUsers(newUsers)
      console.log(newUsers)
    })
  }

  return (
    <div className="App">
      <h2>Total User: {users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='name'/>
        <input type="email" name='email' placeholder='email'/>
        <input type="submit" value="submit"/>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.id}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
