import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  const [showSaved, setShowSaved] = useState(false);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  if (showSaved) {
    return <SavedData setShowSaved={setShowSaved} />;
  }

  return <PatientDetails setShowSaved={setShowSaved} setLoggedIn={setLoggedIn} />;
}

function Login({ setLoggedIn }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }
    localStorage.setItem("login", "true");
    setLoggedIn(true);
  };

  return (
    <div className="center">
      <div className="card">
        <h2 className="patient-title">Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn primary full" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

function PatientDetails({ setShowSaved, setLoggedIn }: any) {
  const [form, setForm] = useState({
    name: "",
    uhid: "",
    sex: "",
    age: "",
    height: "",
    weight: "",
    date: "",
    time: "",
    bloodGroup: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveData = () => {
    if (!form.name || !form.uhid || !form.age) {
      alert("Name, UHID and Age are required");
      return;
    }

    const existingData = JSON.parse(
      localStorage.getItem("patientData") || "[]"
    );

    existingData.push({
      ...form,
      id: Date.now()
    });

    localStorage.setItem("patientData", JSON.stringify(existingData));
    alert("Data saved successfully");
  };

  return (
    <div className="center">
      <div className="card big">
        <h3 className="patient-title">Patient Details</h3>

        <label>Patient Name</label>
        <input name="name" onChange={handleChange} />

        <label>Patient UHID</label>
        <input name="uhid" onChange={handleChange} />

        <label>Sex</label>
        <select name="sex" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Age</label>
        <input name="age" onChange={handleChange} />

        <label>Height (cm)</label>
        <input name="height" onChange={handleChange} />

        <label>Weight (kg)</label>
        <input name="weight" onChange={handleChange} />

        <label>Date</label>
        <input type="date" name="date" onChange={handleChange} />

        <label>Time</label>
        <input type="time" name="time" onChange={handleChange} />

        <label>Blood Group</label>
        <select name="bloodGroup" onChange={handleChange}>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <div className="btn-row">
          <button className="btn secondary">Skip</button>
          <button className="btn secondary">Cancel</button>
          <button className="btn primary" onClick={saveData}>
            Save
          </button>
        </div>

        <button className="view-btn" onClick={() => setShowSaved(true)}>
          View Saved Data
        </button>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("login");
            setLoggedIn(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function SavedData({ setShowSaved }: any) {
  const data = JSON.parse(
    localStorage.getItem("patientData") || "[]"
  );

  return (
    <div className="center">
      <div className="card big">
        <h3 className="patient-title">Saved Patient Data</h3>

        {data.length === 0 && <p>No records found</p>}

        {data.map((item: any) => (
          <div key={item.id} style={{ marginBottom: "12px" }}>
            <p><b>Name:</b> {item.name}</p>
            <p><b>UHID:</b> {item.uhid}</p>
            <p><b>Sex:</b> {item.sex}</p>
            <p><b>Age:</b> {item.age}</p>
            <p><b>Height:</b> {item.height}</p>
            <p><b>Weight:</b> {item.weight}</p>
            <p><b>Date:</b> {item.date}</p>
            <p><b>Time:</b> {item.time}</p>
            <p><b>Blood Group:</b> {item.bloodGroup}</p>
            <hr />
          </div>
        ))}

        <button className="btn primary full" onClick={() => setShowSaved(false)}>
          Back
        </button>
      </div>
    </div>
  );
}