import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";

import * as hootService from "../../services/hootService";

import CommentForm from "../CommentForm/CommentForm";

export default function HootDetails(props) {
  const [hoot, setHoot] = useState(null);

  const loggedInUser = useContext(AuthedUserContext);

  const { hootId } = useParams();
  console.log(hootId, "<-- HOOT ID");

  useEffect(() => {
    async function getHoot() {
      // hootId comes from the params, and thats what are show
      // request needs in order to make the http request to express
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    }
    getHoot();
  }, [hootId]); // run our useEffect everytime  the id in the url changes
  // so we get the hoot that represents that id from the server

  async function handleAddComment(commentFormData) {
    const hootDoc = await hootService.createComment(hootId, commentFormData);
    setHoot(hootDoc);
  }

  // check to see if the hoot is loaded
  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>{hoot.author.username}</p>

        {hoot.author._id === loggedInUser._id ? (
          <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
        ) : (
          ""
        )}
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {/* {!hoot.comments.length === 0 ? <p>There are no comments</p> : ()} */}
        {!hoot.comments.length && <p>There are no comments</p>}
        {hoot.comments.map((comment) => {
          return (
            <article key={comment._id}>
              <header>
                <p>{comment.author.username}</p>
              </header>
              <p>{comment.text}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
