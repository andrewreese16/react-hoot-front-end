import { Link } from "react-router-dom";

import styles from "./HootList.module.css";

export default function HootList({ hoots }) {
  const hootList = hoots.map((hoot) => {
    return (
      <main key={hoot._id} className={styles.container}>
        <Link to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <h2>{hoot.title}</h2>
              <p>{hoot.author.username}</p>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>
      </main>
    );
  });
  return <main>{hootList}</main>;
}

