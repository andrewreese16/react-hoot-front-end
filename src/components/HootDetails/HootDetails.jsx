import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./HootDetails.module.css";

import * as hootService from "../../services/hootService";

export default function HootDetails(props) {
  const [hoot, setHoot] = useState(null);

  const { hootId } = useParams();
  console.log(hootId, "HOOT ID");

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

  // check to see if the hoot is loaded
  if (!hoot) return <main>Loading...</main>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
          <p className={styles.p}>{hoot.category.toUpperCase()}</p>
          <h1 className={styles.h1}>{hoot.title}</h1>
          <p className={styles.p}>{hoot.author.username}</p>
      </header>
      <p className={styles.p}>{hoot.text}</p>
      <section className={styles.section}>
        <h2>comments</h2>
        {/* {!hoot.comments.length === 0 ? <p>There are no comments</p> : ()} */}
        {!hoot.comments.length && <p>There are no comments</p>}
        {hoot.comments.map((comment) => {
          return (
            <article key={comment._id} className={styles.article}>
              <header className={styles.header}>
                <p className={styles.p}>{comment.author.username}</p>
              </header>
              <p className={styles.p}>{comment.text}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
