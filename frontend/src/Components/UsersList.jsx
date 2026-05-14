import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  //Go to user page
  function gotoUser(userObj) {

    navigate('/user', {
      state: { user: userObj }
    });
  }

  //Fetch users
  useEffect(() => {

    async function getUsers() {

      try {

        let res = await fetch(
          'http://localhost:4000/user-api/users'
        );

        let data = await res.json();

        if(res.status === 200) {

          setUsers(data.payload);
        }

      }
      catch(err) {

        console.log(err);
      }
    }

    getUsers();

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Users List
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {
          users.map(user => (

            <div
              key={user._id}
              className="border rounded p-5 shadow"
            >

              <h2 className="text-xl font-bold">
                {user.username}
              </h2>

              <p>{user.email}</p>

              <p>
                {new Date(
                  user.dateOfBirth
                ).toLocaleDateString()}
              </p>

              <p>{user.mobileNumber}</p>

              <button
                onClick={() => gotoUser(user)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                View
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
}