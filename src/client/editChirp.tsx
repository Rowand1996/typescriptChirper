import React, { useState, useEffect } from 'react';
import { useParams, useHistory, RouteComponentProps } from "react-router-dom";

export interface EditProps extends RouteComponentProps<{ id: string; }> { }

const EditChirp: React.SFC<EditProps> = () => {
 

    let addButton = $("#addButton");
    addButton.hide();

    let { id } = useParams();
    let history = useHistory();

   let putForm = () => {

        let newChirp = {
            name: name,
            content: content
        };
        fetch(`/api/chirps/${id}`, {
            method: 'put',
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

    const getMessage = async () => {
        let res = await fetch(`/api/chirps/${id}`)
        let chirp = await res.json();
        setuser(chirp[0].name);
        setmessage(chirp[0].content);
    }

    useEffect(() => {
        getMessage();
    }, [id]);

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
                    <button type="button" onClick={putForm} id="btnSubmit" className="btn btn-primary formSubmit" >Submit</button>
                </div>

            </form>
        </div>

    );



}


export default EditChirp;