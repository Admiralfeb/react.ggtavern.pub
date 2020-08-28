import { useState, useEffect } from 'react';
import { auth } from 'firebase/app';

export const useAuth = () => {
  const [user, setUser] = useState<firebase.User>();
  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      const unregisterAuthObserver = auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          auth().signInAnonymously();
        }
      });
      return () => unregisterAuthObserver();
    }
  });

  return user;
};
