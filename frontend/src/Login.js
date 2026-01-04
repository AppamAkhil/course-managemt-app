import api from "./api";

export default function Login({ setIsLoggedIn }) {
  const login = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={login}>
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
