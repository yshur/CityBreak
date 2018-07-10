import React, {Component} from 'react'
import MdSave from 'react-icons/lib/md/save'
import MdAdd from 'react-icons/lib/md/add'
import Background from './bk.jpg';



var bk = {
    width:"100%",
    height:"100%px",
    backgroundImage: `url(${Background})`
}
class Admin extends Component{
    render() {
        return (
            <div className="admin" style = {bk}>
                <h1> Admin Interface </h1>
                    <h5> Manage your events </h5>
                    <button className= "add"><MdAdd/></button>
                    <div className="adminOp1">
                        <button><MdSave/></button><p>Create event</p>
                    </div>
                    <div className="adminOp2">
                        <button><MdSave/></button><p>Get all events</p>
                    </div>
                    <div className="adminOp3">
                        <button><MdSave/></button><p>Get all users</p>
                    </div>
            </div>
            )
    }          
}

export default Admin