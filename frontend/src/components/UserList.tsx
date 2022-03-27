import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { UserResult } from '../model/IUser'
import { toast } from 'react-toastify';
import RefreshToken from './RefreshToken';
import { userList } from '../Services';

export default function UserList() {
    const [users, setUsers] = useState<UserResult[]>([])
    const url = "http://localhost:8080";

    const MINUTE_MS = 60000;

    useEffect(() => {
        try {
            // const token = control()
            // console.log('tokenf', token)
            // setJwtToken(token)

            // console.log('token', token)
           userList().then(res => {
                setUsers(res.data);
                console.log('res.data', res.data)
            });
            
            const interval = setInterval(() => {
            console.log('Merhaba')
            
            }, MINUTE_MS);

            return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.

        } catch (error) {
            toast.error("Authentication failed") 
        }


    }, [])

    console.log('users', users)
    // return (
    //     <div >
    //         {/* <div className='table-responsive'>
    //             <table className="table table-striped">
    //                 <thead>
    //                     <tr>
    //                         <th scope='col'>#</th>
    //                         <th scope='col'>Username</th>
    //                         <th scope='col'>Name</th>
    //                         <th scope='col'>Roles</th>
    //                     </tr>

    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                     {users.map((item, index) => {
    //                         <tr key={index}>
    //                             <th scope='row'>{index}</th>
    //                             <td>{item.username}</td>
    //                             <td>{item.name}</td>
    //                             <td>{item.roles?.map((roleName) => { <span>{roleName.name}</span> })}</td>
    //                         </tr>
    //                     })}
    //                     </tr>
    //                 </tbody>
    //             </table>
    //         </div> */}
    //         {users.map((item, index) => {
    //             <div key={index}>
    //                 <div>{item.username}</div>
    //                 <div>{item.name}</div>
    //                 <div>{item.roles?.map((roleName) => { <span>{roleName.name}</span> })}</div>
    //             </div>
    //         })}



    //     </div>
    // )
    return (
       
      
        <div  className="container">
            <h3 className="p-3 text-center">React - Display a list of items</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.roles?.map(item => {<span>{item.name}</span>})}</td>
                        
                    </tr>
                    )}
                </tbody>
            </table>
            <div>
                <RefreshToken/>
            </div>
        </div>
    );
}
