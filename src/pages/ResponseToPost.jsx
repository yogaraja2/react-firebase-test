import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const ResponseToPost = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { post } = useLocation().state;
  const currentUser = user?.name?.split(" ")[0];
  const currentDomain = user?.email?.slice(user?.email.indexOf("@"));
  const [response, setResponse] = useState("");
  const [responses, setResponses] = useState([]);
  const [isBtnEnable, setIsBtnEnable] = useState(false);
  const [posts, setPosts] = useState([]);
  const postCollectionRef = collection(db, "responses");

  const getAllResponses = async () => {
    const res = await getDocs(postCollectionRef);
    const domainList = res.docs
      .filter((doc) => doc.data().email.includes(currentDomain))
      .map((doc) => ({ ...doc.data(), id: doc.id }));
    setPosts(domainList);
  };

  useEffect(() => {
    getAllResponses();
  }, []);

  useEffect(() => {
    if (response !== "") setIsBtnEnable(true);
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObj = {
      email: user?.email,
      response: response,
    };
    await addDoc(postCollectionRef, newObj);
    getAllResponses();
    setResponses([...responses, newObj]);
    setResponse("");
  };
  return (
    <>
      <Header user={user} />
      <div>
        <h2 className="post-title">{post?.subject}</h2>
        <div className="replies">
          <h3 className="res-user">{currentUser} : </h3>
          <p className="res-msg">{post?.body}</p>
        </div>
        {posts.map((post, i) => {
          let username = post.email.slice(0, post.email.indexOf("@"));
          if (username.includes("."))
            username = username.slice(0, username.indexOf("."));
          return (
            <div key={i} className="replies">
              <h3 className="res-user">{username} : </h3>
              <p className="res-msg">{post.response}</p>
            </div>
          );
        })}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Reply..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <button disabled={!isBtnEnable}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default ResponseToPost;
