import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const post = {
  subject: "",
  body: "",
};

const CreateChannel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const organization = user?.email?.slice(user.email.indexOf("@"));
  const [isNewChannel, setIsNewChannel] = useState(false);
  const [newPost, setNewPost] = useState(post);
  const [isBtnEnable, setIsBtnEnable] = useState(false);
  const postsRef = collection(db, "posts");
  const responseRef = collection(db, "responses");

  useEffect(() => {
    if (newPost.subject.length && newPost.body.length) setIsBtnEnable(true);
  }, [newPost]);

  const handleNewChannel = () => setIsNewChannel(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObj = { ...newPost, email: user.email };
    await addDoc(postsRef, newObj);
    // await addDoc(responseRef, { email: user.email, response: newPost.body });
    setNewPost(post);
    navigate("/myPost", { state: { post: newPost } });
  };
  return (
    <>
      <Header user={user} />
      <div className="create-channel-main">
        <section className="left-section">
          <h4 className="org-title">{organization}</h4>
          <button className="btn-channel" onClick={handleNewChannel}>
            New Channel
          </button>
          <div className="channel-list">
            <p>{isNewChannel && "#My Channel"} </p>
          </div>
        </section>
        {isNewChannel && (
          <section className="right-section">
            <h2 className="channel-title">My Channel</h2>
            <form className="channel-form" onSubmit={handleSubmit}>
              <div className="form-fields form-fields-subject">
                <h3>Subject :</h3>
                <input
                  className="input-subject"
                  type="text"
                  name="subject"
                  value={newPost.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-fields">
                <h3>Body :</h3>
                <textarea
                  className="input-body"
                  name="body"
                  cols="50"
                  rows="10"
                  value={newPost.body}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <button className="btn-channel" disabled={!isBtnEnable}>
                  Create
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default CreateChannel;
