import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../config";

const auth = getAuth(app);

export const createUser = async (name, email, photoUrl) => {
  const res = await fetch(`/api/sessionSetup/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, photoUrl: photoUrl }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

export const classifyUser = async (email) => {
  const res = await fetch(`/api/sessionSetup/classifyUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

export const updateFirstTimeLogin = async (email) => {
  const res = await fetch(`/api/sessionSetup/updateFirstTimeLogin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

export const logoutUser = () => {
  localStorage.clear();
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getLoggedInUserDetails = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        resolve(currentUser);
      } else {
        resolve(null);
      }
    });
  });
};
