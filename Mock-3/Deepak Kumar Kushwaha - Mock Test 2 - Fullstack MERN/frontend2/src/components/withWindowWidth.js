import React,{useEffect,useState} from 'react'
export default function withWindowWidth(Wrapped){
  return function(props){
    const [w,setW]=useState(window.innerWidth);
    useEffect(()=>{
      const f=()=>setW(window.innerWidth);
      window.addEventListener('resize',f);
      return()=>window.removeEventListener('resize',f);
    },[]);
    return <Wrapped {...props} windowWidth={w}/>;
  }
}