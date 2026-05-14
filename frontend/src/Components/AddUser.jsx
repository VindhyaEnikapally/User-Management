import { useState } from "react";

export default function AddUser() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    mobileNumber: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await fetch(
      "http://localhost:4000/user-api/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    );

    let data = await res.json();

    alert(data.message);

    setUser({
      username: "",
      email: "",
      dateOfBirth: "",
      mobileNumber: ""
    });
  }

  return (
    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96"
      >

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="dateOfBirth"
          value={user.dateOfBirth}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={user.mobileNumber}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          className="bg-green-500 text-white p-2 rounded"
        >
          Add User
        </button>

      </form>

    </div>
  );
}