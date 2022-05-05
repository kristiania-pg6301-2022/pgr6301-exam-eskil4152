import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [newUser, setNewUser] = useState({ username, password, fullName });
  const [error, setError] = useState("");

  useEffect(() => {
    setNewUser({ username, password, fullName });
  }, [username, password, fullName]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/api/login/new", {
      method: "post",
      body: JSON.stringify({ username, password, fullName }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      navigate("..");
    } else {
      setError("Error: " + error.toString());
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username:{" "}
        <input
          value={username}
          name={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Full name:{" "}
        <input
          value={fullName}
          name={"fullName"}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          value={password}
          type={"password"}
          name={""}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Register</button>
      </div>
    </form>
  );
}

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      navigate("..");
    } else {
      setError("Username or password is wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please log in</h1>
      <div>
        Username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>{error}</div>
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
}
