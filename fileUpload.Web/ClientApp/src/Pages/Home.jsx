import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {

    const [people, setPeople] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/api/fileupload/getpeople');
            setPeople(data);
        }
        getData();
        setIsLoading(false);
    }, []);

    const onDeleteClick = async () => {
        await axios.post('/api/fileupload/deleteall');
        setPeople([]);
    }
    
    return (
       
        <div className="app-container" style={{ marginTop: "85px" }}>
            {isLoading ? <div className="spinner-border text-success" role="status"></div> : 
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <button onClick={onDeleteClick} className="btn btn-danger btn-lg">Delete All</button>
                    <table className="table table-hover table-striped table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Adress</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p =>
                                <tr key={p.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }} >
                                    <td>{p.firstName}</td>
                                    <td>{p.lastName}</td>
                                    <td>{p.age}</td>
                                    <td>{p.adress}</td>
                                    <td>{p.email}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    {people.length == 0 && <h2 className="">There are no people in this table. Please upload to add...</h2>}
                </div>}
        </div>
    );
};

export default Home;