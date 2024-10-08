import { Link } from 'react-router-dom'

import styles from './HootList.module.css'


export default function HootList({hoots}){
   const hootList = hoots.map((hoot) => {
    return (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h2 className={styles.h2}>{hoot.title}</h2>
                    <p className={styles.p}>
                        {hoot.author.username}
                    </p>
                </header>
                <p className={styles.p}>{hoot.text}</p>
            </article>
        </Link>
    )
   })
    return ( 
    <main className={styles.container}>{hootList}</main>
    )
} 