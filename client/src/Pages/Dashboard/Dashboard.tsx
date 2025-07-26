import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export type TUser = {
  id: string;
  email: string;
  name: string;
  exp: number;
};

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<TUser | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("accessToken", tokenFromUrl);
      const decodedUser = jwtDecode<TUser>(tokenFromUrl);
      setUserInfo(decodedUser);
    } else {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedUser = jwtDecode<TUser>(token);
        setUserInfo(decodedUser);
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome {userInfo?.name}</h1>
      <p>{userInfo?.email}</p>
    </div>
  );
};

export default Dashboard;
