import React from 'react';
import { useState, useEffect } from 'react';
import Delete from './trash.png';
import Edit from './edit.jpg';
import Mentions from './Mentions.png';
import { BrowserRouter as Router, Link } from 'react-router-dom';


export interface ChirpsProps {

}

export interface Chirp {
    id: string,
    userid: number,
    name: string,
    content: string
}

export interface Mentions {
    id: number,
    content: string,
    _created: string
}

const Chirps: React.SFC<ChirpsProps> = (props) => {
    const [chirps, setChirps] = useState<Chirp[]>([]);
    const getChirps = async () => {
        console.log("getting chirps now!");
        let res = await fetch("/api/chirps");
        let items = await res.json();
        setChirps(items);
        console.log(items);
    }

    const [modalName, setModalName] = useState<String>("");

    const [mentions, setMentions] = useState<Mentions[]>([]);
    const getMentions = async (id: number) => {
        console.log("getting mentions now!");
        let res = await fetch(`/api/mentions/${id}`)
        let allMentions = await res.json();
        console.log(allMentions);
        setMentions(allMentions);
        console.log("these are the mentions!");
        console.log(allMentions);
        
    }

    useEffect(() => {
        getChirps();
    }, []);

    let deleteChirp = (id: string) => {
        fetch(`http://localhost:3000/api/chirps/${id}`, {
            method: 'delete',
        });
        getChirps();
    }

    let updateModal = (name: string, id: number) => {
        setModalName(name);
        getMentions(id);
    }

    return (

        <div>

            {chirps.map(chirp => (
                <div>
                    <div key={chirp.id} className="card">
                        <div className="card-header">
                            {chirp.name}
                        </div>
                        <div className="card-body">
                            <p className="card-text">{chirp.content}</p>
                        </div>

                        <div className="card-footer d-flex justify-content-end">
                            {/* <!-- Button trigger modal --> */}
                            <button onClick={() => updateModal(chirp.name,chirp.userid)} type="button" id="modalBtn" className="btn" data-toggle="modal" data-target="#exampleModalCenter">
                                <img src={Mentions} width="22" height="22" className=" img d-inline-block align-top" alt="" />
                            </button>
                            <button type="button" id="editButton" className="btn btn-small btn-link">
                                <Link to={`/chirp/edit/${chirp.id}`} >
                                    <img src={Edit} width="22" height="22" className=" img d-inline-block align-top" alt="" />
                                </Link>
                            </button>
                            <button onClick={() => deleteChirp(chirp.id)} className="deleteButton btn btn-sm"><img src={Delete} width="22" height="22" className=" img d-inline-block align-top" alt="" /></button>
                        </div>
                    </div>
                </div>
            ))}
            {/* <!-- Modal --> */}

            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Chirps {modalName} was mentioned in:</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {mentions.map(mention => (
                            <div key={mention.id} className="modal-body">
                                <p >{mention.content}</p>
                            </div>
                        ))}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default Chirps;

interface ChirpsState {
    items: object;
}
