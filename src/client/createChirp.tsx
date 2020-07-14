import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export interface Chirp {
    id?: number,
    name: string,
    content: string
}


const CreateChirp = () => {
    $(document).ready(function () {
    });

    let addButton = $("#addButton");
    addButton.hide();


    let history = useHistory();

    let postForm = () => {
        let newChirp = {
            name: name,
            content: content
        }
        fetch('http://localhost:3000/api/chirps', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newChirp)
        });
        history.push('/');
        addButton.show();
    }

    const [name, setuser] = useState<string>("");
    const [content, setmessage] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuser(e.target.value);
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setmessage(e.target.value);
    }

    return (
        <div className="container" id="formContainer">
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input onChange={handleNameChange} value={name} type="name" className="form-control" id="nameField" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Chirp:</label>
                    <input onChange={handleMessageChange} value={content} type="message" className="form-control" id="messageField" placeholder="Enter chirp here!" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={postForm} id="btnSubmit" className="btn btn-primary formSubmit" >Submit</button>
                </div>

            </form>
        </div>

    );



}


export default CreateChirp;