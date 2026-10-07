import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

export default function SignedOut() {
  const navigate = useNavigate();
  return (
    <div className="card empty">
      <div className="ic">
        <Icon name="check" size={30} />
      </div>
      <h1>Signed out</h1>
      <p>Local plans, drafts and saved activities were cleared. The next user will see no previous work.</p>
      <button type="button" className="p" onClick={() => navigate("/signin")}>
        Sign in as next user
      </button>
    </div>
  );
}
