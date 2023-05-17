import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DashboardScreen = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  const handleGetProfile = async (e) => {
    try {
      // Recuperar solo el email y username adjuntos al JWT
      const {
        data: { email, username },
      } = await axios.get("/api/profile");
      setProfile({
        email,
        username,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleLogout = async (e) => {
    try {
      const response = await axios.get("/api/auth/logout");
      toast.success(response.data.message)
      router.push("/login");
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.message)
    }
  };
  return (
    <div className="container py-3">
      <h3 className="mb-3">Dashboard</h3>
      <button onClick={handleGetProfile} className="btn btn-primary me-3">
        Obtener perfil
      </button>
      <button onClick={handleLogout} className="btn btn-danger">
        Cerrar sesión
      </button>
      {profile && (
        <article className="card mt-5 p-5">
          <p>Username: <strong>{profile.username}</strong></p>
          <p className="mb-0">Email: <strong>{profile.email}</strong></p>
        </article>
      )}
    </div>
  );
};

export default DashboardScreen;
