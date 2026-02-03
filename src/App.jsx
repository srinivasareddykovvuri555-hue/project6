import React, { Component } from 'react';
import './App.css';
import { callApi } from './lib.js';

const APIURL = "https://jsonplaceholder.typicode.com/users";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showpopup: false,
      selectedUser: null
    };
  }

  componentDidMount() {
    callApi("GET", APIURL, "", this.getData);
  }

  getData = (res) => {
    this.setState({ data: res });
  };

  showUserInfo = (user) => {
    this.setState({ showpopup: true, selectedUser: user });
  };

  closeUserInfo = () => {
    this.setState({ showpopup: false, selectedUser: null });
  };

  render() {
    const { data, showpopup, selectedUser } = this.state;

    return (
      <div className="app">
        <div className="header">
          Example for APIs, Fetch function, Conditional Rendering
        </div>

        <div className="section">
          <h1>WELCOME</h1>

          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {data.map(user => (
                <tr key={user.id} onClick={() => this.showUserInfo(user)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer">
          © CopyRight@2026 Course Catalog. All rights reserved - M Sai Dhanush
        </div>

        {showpopup && selectedUser && (
          <div className="overlay">
            <div className="popup">
              <div className="popupHeader">
                <button onClick={this.closeUserInfo}>X</button>
              </div>

              <div className="popupSection">
                <p><b>ID:</b> {selectedUser.id}</p>
                <p><b>Name:</b> {selectedUser.name}</p>
                <p><b>Username:</b> {selectedUser.username}</p>
                <p><b>Email:</b> {selectedUser.email}</p>
                <p>
                  <b>Address:</b> {selectedUser.address.street},
                  {selectedUser.address.city} - {selectedUser.address.zipcode}
                </p>
                <p><b>Phone:</b> {selectedUser.phone}</p>
                <p><b>Website:</b> {selectedUser.website}</p>
                <p>
                  <b>Company:</b> {selectedUser.company.name}<br />
                  {selectedUser.company.bs}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}