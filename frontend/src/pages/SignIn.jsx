import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { validateFacilitatorId } from "../utils/validation";
import Icon from "../components/Icon";

export default function SignIn() {
  const { user, signIn } = useApp();
  const navigate = useNavigate();
  const [facilitatorId, setFacilitatorId] = useState("");
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);

  if (user) return <Navigate to="/home" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = validateFacilitatorId(facilitatorId);
    if (id) {
      setHasError(false);
      signIn(id);
      navigate("/home");
    } else {
      setHasError(true);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <div className="hero">
        <p className="eyebrow">STEMMate Namibia</p>
        <h1>Plan STEM sessions, even offline</h1>
        <p>Find activities, save them, and keep your plans safe on this device.</p>
      </div>
      <div className="card">
        <h2>
          <Icon name="lock" size={18} /> Sign in
        </h2>
        <p className="hint">Use a synthetic ID such as FAC-01.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="uid">Facilitator ID</label>
          <input
            id="uid"
            ref={inputRef}
            autoComplete="off"
            value={facilitatorId}
            onChange={(e) => setFacilitatorId(e.target.value)}
            aria-describedby="ue"
            aria-invalid={hasError ? "true" : undefined}
          />
          <p id="ue" className="err">
            {hasError ? "Not accepted. Use the format FAC-01." : ""}
          </p>
          <button type="submit" className="p block">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
