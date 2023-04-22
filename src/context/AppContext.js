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
  const [filterParam, setFilterParam] = useState(["title"]);
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
  const [searchtext, setSearchText] = useState("");
  const [allBooks, setAllBooks] = useState([]);

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
    getAllBooks();
    getDataSearch();
    let arr = allBooks;
    console.log(allBooks);
    setBooks(arr);
  }, []);
  useEffect(() => {
    searchtext
      ? setBooks(searchInArray(searchtext, search, filterParam))
      : setBooks(allBooks);
  }, [searchtext]);
  useEffect(() => {
    console.log(allBooks);
    let arr = allBooks;
    setBooks(allBooks);
  }, [allBooks]);

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
  const getAllBooks = () => {
    const query1 = query(
      ref(db, "books/"),
      orderByChild("id"),
      startAt(1),
      endAt(8)
    );

    return onValue(query1, (snapshot) => {
      setAllBooks(snapshot.val());
      setCurrId(8);
    });
  };

  const getDataSearch = () => {
    const query1 = query(ref(db, "books/"), orderByChild("id"));

    return onValue(query1, (snapshot) => {
      let arr = snapshot.val();
      let arr1 = arr.map((a) => a.title);

      setSearch(arr);
    });
  };

  const getUserBooks = () => {
    const getBookBorr = query(ref(db, "users/" + uid));
    return onValue(getBookBorr, (snapshot) => {
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
      console.log("Infinite Scroll Called");
      let obj = snapshot.val();
      if (obj !== null) {
        if (Array.isArray(obj)) {
          obj = { ...obj };
        }
        obj = Object.values(obj);
        let arr1 = [...allBooks];
        setAllBooks([...arr1, ...obj]);
        setCurrId(currId + 3);
        setCallMore(false);
      } else {
        setEndList(true);
      }
    });
  };
  const searchInArray = (searchQuery, array, objectKeys = null) => {
    return objectKeys
      .map((objectKey) => {
        return array.filter((d) => {
          let data = objectKey ? d[objectKey] : d; //Incase If It's Array Of Objects.
          let dataWords =
            typeof data == "string" &&
            data
              ?.split(" ")
              ?.map((b) => b && b.toLowerCase().trim())
              .filter((b) => b);
          let searchWords =
            typeof searchQuery == "string" &&
            searchQuery
              ?.split(" ")
              .map((b) => b && b.toLowerCase().trim())
              .filter((b) => b);

          return searchWords.every((v) =>
            dataWords.some((dataWord) => dataWord.includes(v))
          );
        });
      })
      .flat(1);
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
        getAllBooks,
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
        filterParam,
        setFilterParam,
        searchtext,
        setSearchText,
        searchInArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useLibrary = () => useContext(AppContext);
