import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps } from "react-router-dom";

export interface EditProps extends RouteComponentProps<{ id: string; }> { }

const EditChirp: React.SFC<EditProps> = ({match: { params: { id } } }) => {
    $(document).ready(function () {
    });

    let addButton = $("#addButton");
    addButton.hide();


    let history = useHistory();

    let putForm = (props:any) => {
        
        let newChirp = {
            user: user,
            text: text
        }
        fetch(`http://localhost:3000/api/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newChirp)
        });
        history.push('/');
        addButton.show();
    }

    const [user, setuser] = useState<string>("");
    const [text, setmessage] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuser(e.target.value);
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setmessage(e.target.value);
    }

    const getMessage = async () => {
        let res = await fetch(`/api/${id}`)
        let chirp = await res.json();
        setuser(chirp.user);
        setmessage(chirp.text);
    }

    useEffect(() => {
        getMessage();
    }, [id]); 

    return (
        <div className="container" id="formContainer">
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input onChange={handleNameChange} value={user} type="name" className="form-control" id="nameField" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Chirp:</label>
                    <input onChange={handleMessageChange} value={text} type="message" className="form-control" id="messageField" placeholder="Enter chirp here!" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={putForm} id="btnSubmit" className="btn btn-primary formSubmit" >Submit</button>
                </div>

            </form>
        </div>

    );



}


export default EditChirp;