import React from 'react'
import Nav from './Nav'

function Home({username}) {
    return (
        <div>
            <Nav username={username}/>
        </div>
    )
}

export default Home
