import React, { useState, useRef } from 'react'
export default function LoginForm(){
  const [username, setUsername] = useState('');
  const passwordRef = useRef();
  function handleSubmit(e){
    e.preventDefault();
    console.log('username:', username);
    console.log('password:', passwordRef.current.value);
    alert('Logged (check console)');
  }
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <div>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" ref={passwordRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}