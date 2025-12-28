// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Decode user info if needed OR fetch /me API
    auth.signinWithToken(token);

    navigate("/", { replace: true });
  }, []);

  return <p>Signing you in...</p>;
}
