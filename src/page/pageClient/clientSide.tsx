import React from 'react'
import "./client.css"

import Header from "../../partials/client/header"
import Footer from "../../partials/client/footer"
interface clientSideProp {

}
const clientSide: React.FC<clientSideProp> = (props) => {
    return (
        <div>
            <Header />
            <main className="main_page" style={{ maxWidth: 1170, margin: "70px auto" }}>
                {props.children}
            </main>
            <Footer />

        </div>
    )
}

export default clientSide
