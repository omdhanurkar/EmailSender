import React, { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import "./Home.css"
import axios from 'axios';
import { toast } from 'react-toastify';



const Home = () => {

    const [user, setUser] = useState({
        name: "",
        number: "",
        email: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser(user => ({
            ...user,
            [name]: value

        }))

    }
    const addDetails = () => {
        const { name, number, email } = user
        if (name && number && email) {
            axios.post("http://localhost:5000/sendmail", user)
                .then(res => console.log(res))
            toast.success("sent Successfully");
        }
        else {
            alert("invalid input")
        };
    }

    //=============================for get===================================

    const [data, setData] = useState([]);
    const loadData = async () => {
        const responce = await axios.get("http://localhost:5000/get");
        setData(responce.data);

    };

    useEffect(() => {
        loadData()
    }, []);



    return (
        <div>
            <h1>
                Prospecting & Client Nurture
            </h1>

            <div className='second'>
                <Stack direction="horizontal" gap={2}>

                    <Button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#import" data-bs-whatever="@mdo">Import Email</Button>

                    <Button variant="success" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Add" data-bs-whatever="@mdo">Send Email</Button>

                    <Button variant="danger" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#send" data-bs-whatever="@mdo">Start</Button>

                    <div className="input-group" >
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary">search</button>

                    </div>
                </Stack>
            </div>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Gmail</th>
                            <th scope="col">Action/Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            console.log(item)
                            return (
                                <tr key={item}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.number}</td>
                                    <td>{item.email}</td>

                                    <td> <Button as="a" variant="primary" >Sent Mail</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* ===================import email======================================= */}
            <div>
                <div className="modal fade" id="import" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Import Mail</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <form>
                                            <label for="recipient-name" className="col-form-label">Select a Category</label>

                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Website client</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label">Choose File</label>
                                        {/* <textarea className="form-control" id="message-text"></textarea> */}
                                        <form>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="customFileLang" lang="es" />
                                                <label class="custom-file-label" for="customFileLang"></label>
                                            </div>
                                        </form>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Add mail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================Add email======================================= */}
            <div>
                <div className="modal fade" id="Add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <form>
                                            <label for="recipient-name" className="col-form-label">Select a Category</label>

                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Website client</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label">Name</label>
                                        <input className="form-control" id="name" type="text" name="name" value={user.name} onChange={handleChange}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label" >Number</label>
                                        <input className="form-control" id="number" name="number" type="number" value={user.number} onChange={handleChange} ></input>
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label" >Email</label>
                                        <input className="form-control" id="email" name="email" type="email" value={user.email} onChange={handleChange}></input>
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">I grant permission</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={addDetails}>Add Mail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ===================send======================================= */}
            <div className="modal" id="send" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="send-mail-text">
                            <p>Are You Sure You want to start?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button type="button" className="btn btn-primary">Start Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>





    )
}


export default Home