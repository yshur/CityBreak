import React, {Component} from 'react'
import MdSave from 'react-icons/lib/md/save'



class Admin extends Component{
    render() {
        return (
            <div className="admin">
                <h1> Admin Interface </h1>
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