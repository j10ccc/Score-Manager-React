import { useEffect, useState } from "react";

interface SystemStore {
  name: string;
  role: "student" | "coach";
  token: string;
}

const useSystem = () => {
  const [name, setNameInner] = useState<SystemStore["name"]>();
  const [role, setRoleInner] = useState<SystemStore["role"]>();
  const [token, setTokenInner] = useState<SystemStore["token"]>();

  useEffect(() => {
    setRoleInner(
      (window.localStorage.getItem("role") as SystemStore["role"]) || undefined
    );
    setTokenInner(
      (window.localStorage.getItem("token") as SystemStore["token"]) ||
        undefined
    );
  }, []);

  const setName = (name: SystemStore["name"]) => {
    setNameInner(name);
    window.localStorage.setItem("name", name);
  };

  const setRole = (role: SystemStore["role"]) => {
    setRoleInner(role);
    window.localStorage.setItem("role", role);
  };

  const setToken = (token: SystemStore["token"]) => {
    setTokenInner(token);
    window.localStorage.setItem("token", token);
  };

  const clearSystemStore = () => {
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("token");
  };

  return {
    name,
    setName,
    role,
    setRole,
    token,
    setToken,
    clearSystemStore,
  };
};

export default useSystem;
