import React from 'react';
import { useState, useEffect } from 'react';
import Delete from './trash.png';
import Edit from './edit.jpg';
import { BrowserRouter as Router, Link} from 'react-router-dom';


export interface ChirpsProps {

}

export interface Chirp {
    id: string,
    userName: string,
    message: string
}

const Chirps: React.SFC<ChirpsProps> = (props) => {

    const [chirps, setChirps] = useState<Chirp[]>([]);
    const getChirps = async () => {
        console.log("getting chirps now!");
        let res = await fetch("/api");
        let items = await res.json();
        let tempChirps: Chirp[] = [];
        for (var key in items) {
            if (items.hasOwnProperty(key) && key != "nextid") {
                let chirp: Chirp = {
                    id: key,
                    userName: items[key].user,
                    message: items[key].text,
                }
                tempChirps.push(chirp);
            }
        }
        setChirps(tempChirps);
    }


    useEffect(() => {
        getChirps();
    }, []);

    let deleteChirp = (id: string) => {
        fetch(`http://localhost:3000/api/${id}`, {
            method: 'delete',
        });
        getChirps();
    }

    return (
       
            <div>

                {chirps.map(chirp => (
                    <div key={chirp.id} className="card">
                        <div className="card-header">
                            {chirp.userName}
                        </div>
                        <div className="card-body">
                            <p className="card-text">{chirp.message}</p>
                        </div>

                        <div className="card-footer d-flex justify-content-end">
                            <button type="button" id="editButton" className="btn btn-small btn-link">
                                
                                <Link to={`/chirp/edit/${chirp.id}`} >
                                    
                                    
                                    
                                    <img src={Edit} width="22" height="22" className=" img d-inline-block align-top" alt="" /></Link></button>
                            <button onClick={() => deleteChirp(chirp.id)} className="deleteButton btn btn-sm"><img src={Delete} width="22" height="22" className=" img d-inline-block align-top" alt="" /></button>
                        </div>

                            
                    </div>

                ))}


            </div>
 
       
    );
}

export default Chirps;



interface ChirpsState {
    items: object;
}
