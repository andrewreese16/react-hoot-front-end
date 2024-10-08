import { Link } from 'react-router-dom'



export default function HootList({hoots}){
   const hootList = hoots.map((hoot) => {
    return (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
            <article>
                <header>
                    <h2>{hoot.title}</h2>
                    <p>
                        {hoot.author.username}
                    </p>
                </header>
                <p>{hoot.text}</p>
            </article>
        </Link>
    )
   })
    return ( 
    <main>{hootList}</main>
    )
} 