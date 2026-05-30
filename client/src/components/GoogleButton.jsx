import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function GoogleButton({ label = "Continue with Google" }) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e.message || "Google sign-in failed");
    }
  };

  return (
    <button type="button" onClick={handle} className="btn-outline w-full">
      <FcGoogle size={20} /> {label}
    </button>
  );
}
