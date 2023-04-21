import { createContext, useContext, useEffect, useState } from "react";
import { app, database, provider, auth } from "../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  linkWithCredential,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  limitToFirst,
  limitToLast,
  startAt,
  endAt,
  child,
  update,
} from "firebase/database";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = () =>
    setColorScheme((scheme) => (scheme === "dark" ? "light" : "dark"));

  const [cart, setCart] = useState([]);
  const [uid, setUid] = useState("");
  const [books, setBooks] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [currId, setCurrId] = useState(0);
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [pfp, setPfp] = useState("");
  const [credential, setCredential] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const [callMore, setCallMore] = useState(false);
  const [endList, setEndList] = useState(false);
  const [search, setSearch] = useState([]);
  const [borrowed, setBorrowed] = useState([]);

  const db = getDatabase(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("onAuthStateChanged");
        setUid(user.uid);
        setName(user.displayName);
        setPfp(user.photoURL);
        setLoggedIn(true);
        getInitials();
        getUserBooks();
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    if (callMore && !endList) getFive();
  }, [callMore]);

  useEffect(() => {
    getData();
  }, []);

  function startLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setCredential(GoogleAuthProvider.credentialFromResult(result));
        const token = credential.accessToken;
        const user = result.user;
        setName(user.displayName);
        setPfp(user.photoURL);
        setUid(user.uid);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCredential(GoogleAuthProvider.credentialFromError(error));
      });
  }

  const borrowBooks = () => {
    const updates = {};
    updates["/users/" + uid] = cart;

    return update(ref(db), updates);
  };
  const logOut = () => {
    signOut(auth).then(() => {
      setLoggedIn(false);
    });
  };
  const getData = () => {
    const query1 = query(
      ref(db, "books/"),
      orderByChild("id"),
      startAt(1),
      endAt(8)
    );

    return onValue(query1, (snapshot) => {
      setBooks(snapshot.val());
      setCurrId(8);
    });
  };

  const getDataSearch = () => {
    const query1 = query(ref(db, "books/"), orderByChild("id"));

    return onValue(query1, (snapshot) => {
      let arr = snapshot.val();
      let arr1 = arr.map((a) => a.title);
      console.log(arr1);
      setSearch(arr1);
    });
  };

  const getUserBooks = () => {
    const getBookBorr = query(ref(db, "users/" + uid));
    return onValue(getBookBorr, (snapshot) => {
      console.log(snapshot.val());
      let obj = snapshot.val();
      if (Array.isArray(obj)) {
        obj = { ...obj };
      }
      obj = Object.values(obj);
      setBorrowed(obj);
    });
  };

  const getLast = () => {
    const getLastId = query(
      ref(db, "books/"),
      orderByChild("id"),
      limitToLast(1)
    );
    return onValue(getLastId, (snapshot) => {
      setLastId(parseInt(Object.keys(snapshot.val())[0]));
    });
  };

  const getInitials = () => {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

    let initial = [...name.matchAll(rgx)] || [];

    initial = (
      (initial.shift()?.[1] || "") + (initial.pop()?.[1] || "")
    ).toUpperCase();
    setInitials(initial);
  };
  const getFive = () => {
    const bookInfiniteScroll = query(
      ref(db, "books/"),
      orderByChild("id"),
      startAt(currId + 1),
      endAt(currId + 3)
    );
    return onValue(bookInfiniteScroll, (snapshot) => {
      let obj = snapshot.val();
      if (obj !== null) {
        if (Array.isArray(obj)) {
          obj = { ...obj };
        }
        obj = Object.values(obj);
        let arr1 = [...books];
        setBooks([...arr1, ...obj]);
        setCurrId(currId + 3);
        setCallMore(false);
      } else {
        setEndList(true);
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        toggleColorScheme,
        uid,
        setUid,
        cart,
        books,
        lastId,
        setBooks,
        setCart,
        startLogin,
        logOut,
        name,
        pfp,
        loggedIn,
        getData,
        getLast,
        getFive,
        callMore,
        setCallMore,
        endList,
        borrowBooks,
        getDataSearch,
        getUserBooks,
        borrowed,
        search,
        getDataSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useLibrary = () => useContext(AppContext);
