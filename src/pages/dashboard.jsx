import axios from "axios";
import React, { useState } from "react";

const DashboardScreen = () => {
  const [profile, setProfile] = useState(null);
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
  return (
    <div>
      <h3>Dashboard</h3>
      <button onClick={handleGetProfile}>Obtener perfil</button>
      {profile && (
        <article>
          <p>{profile.username}</p>
          <p>{profile.email}</p>
        </article>
      )}
    </div>
  );
};

export default DashboardScreen;
