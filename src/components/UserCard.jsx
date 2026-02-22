import axios from 'axios';
import React from 'react'
import { BASEURL } from '../utils/constants';


const UserCard = ({ user }) => {

  const { firstName, lastName, age, gender, about, _id } = user || {}


  const handleSendRequest = async (status, id) => {

    try {
      const request = await axios.post(BASEURL + '/api/connectionRequest/send', {
        status: status,
        receiverId: id
      }, { withCredentials: true });

    } catch (error) {
      console.log(`Error sending connection request: ${error}`);
    }

  }


  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + (lastName || "")}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard
