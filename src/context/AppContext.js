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
  getStorage,
  getDownloadURL,
  ref as sRef,
  uploadBytes,
} from "firebase/storage";

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
  const [endList, setEndList] = useState(false);
  const [search, setSearch] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [booksBorrowed, setBooksBorrowed] = useState([]);
  const [searchtext, setSearchText] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState([]);
  const [searchValue, onSearchChange] = useState("");
  const [file, setFile] = useState(null);
  const db = getDatabase(app);

  const storage = getStorage(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("onAuthStateChanged");
        setUid(user.uid);
        setName(user.displayName);
        setPfp(user.photoURL);
        setLoggedIn(true);
        getInitials();
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    getAllBooks();
    getDataSearch();
    let arr = allBooks;
    setBooks(arr);
    getLast();
  }, []);

  useEffect(() => {
    searchtext
      ? setBooks(searchInArray(searchtext, search, filterParam))
      : setBooks(allBooks);
  }, [searchtext, filterParam]);

  useEffect(() => {
    let arr = allBooks;
    setBooks(allBooks);
  }, [allBooks]);

  useEffect(() => {
    let arr = [];
    borrowed.forEach((id) => {
      const getBookBorrowed = query(ref(db, "books/" + id));
      return onValue(getBookBorrowed, (snapshot) => {
        let obj = snapshot.val();

        arr.push(obj);
      });
    });

    setBooksBorrowed(arr);
  }, [borrowed]);
  useEffect(() => {
    getUserBooks();
  }, [uid]);

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

  const getInitials = () => {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

    let initial = [...name.matchAll(rgx)] || [];

    initial = (
      (initial.shift()?.[1] || "") + (initial.pop()?.[1] || "")
    ).toUpperCase();
    setInitials(initial);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setLoggedIn(false);
    });
  };

  const borrowBooks = async () => {
    const updates = {};
    const ids = [];
    cart.forEach((book) => {
      updates["/users/" + uid + "/" + book.id] = true;
      ids.push(book.id);
    });
    allBooks.forEach((book) => {
      if (ids.includes(book.id)) book.inCart = 0;
    });
    books.forEach((book) => {
      if (ids.includes(book.id)) book.inCart = 0;
    });
    setCart([]);
    return update(ref(db), updates).then(() => {
      getUserBooks();
    });
  };
  const returnBooks = async (id) => {
    const updates = {};
    updates["/users/" + uid + "/" + id] = false;
    return update(ref(db), updates).then(() => {
      getUserBooks();
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

  const getAllBooks = () => {
    const query1 = query(
      ref(db, "books/"),
      orderByChild("id"),
      startAt(0),
      endAt(7)
    );

    return onValue(query1, (snapshot) => {
      setAllBooks(snapshot.val());
      setCurrId(7);
    });
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
        let arr1 = [...allBooks];
        setAllBooks([...arr1, ...obj]);
        setCurrId(currId + 3);
      } else {
        setEndList(true);
      }
    });
  };

  const getLast = () => {
    const getLastId = query(
      ref(db, "books/"),
      orderByChild("id"),
      limitToLast(1)
    );
    return onValue(getLastId, (snapshot) => {
      setLastId(parseInt(Object.keys(snapshot.val())[0]) + 1);
    });
  };

  const getUserBooks = () => {
    if (uid) {
      const getBookId = query(ref(db, "users/" + uid));
      return onValue(getBookId, (snapshot) => {
        let obj = snapshot.val();
        if (obj !== null) {
          if (Array.isArray(obj)) {
            obj = { ...obj };
          }

          let keys = Object.keys(obj);
          let filtered = keys.filter(function (key) {
            return obj[key];
          });

          setBorrowed(filtered);
        }
      });
    }
  };

  const searchInArray = (searchQuery, array, objectKeys = null) => {
    let arr = objectKeys
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

    return arr.filter((obj, index) => {
      return index === arr.findIndex((o) => obj.id === o.id);
    });
  };

  async function uploadImg(result, name, file) {
    const storageRef = sRef(storage, name);
    let imgUrl;
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(storageRef)
      .then((url) => {
        imgUrl = url.split("&token")[0];
      })
      .catch((error) => {
        // Handle any errors
      });

    result.imageUrl = imgUrl;
    result.id = lastId;
    const updates = {};
    updates["/books/" + lastId] = result;
    return update(ref(db), updates).then(() => {
      getLast();
      setTitle("");
      setAuthor("");
      setType("");
      setDescription("");
      setRating("");
      setGenre("");
      setFile(null);
    });
  }

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
        booksBorrowed,
        returnBooks,
        uploadImg,
        title,
        setTitle,
        author,
        setAuthor,
        description,
        setDescription,
        type,
        setType,
        rating,
        setRating,
        genre,
        setGenre,
        file,
        setFile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useLibrary = () => useContext(AppContext);
