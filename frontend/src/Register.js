import api from "./api";

export default function Register() {
  const register = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful. Please login.");
      e.target.reset();
    } catch (err) {
  if (err.response?.data?.errors) {
    alert(err.response.data.errors.join("\n"));
  } else {
    alert(err.response?.data?.message || "Registration failed");
  }
}

  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">Register</h4>

        <form onSubmit={register}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
          />
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
          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
