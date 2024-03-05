import React,{useEffect,useState} from 'react'
import Header from './Header'
import Search from './Search'
import Slider from './Slider'
import Offers from './Offers'
// import Banner from './Banner'
import Bestseller from './Bestseller'
import Features from './Features'
import Footer from './Footer'
// import Review from './Review'
import Fruits from './Fruits'
import Vegitables from './Vegitables'
// import axios from 'axios'
import {useNavigate } from 'react-router-dom'




function Home(props) {
    const navigate=useNavigate()
    const [search, setSearch] = useState("")
    useEffect(() => {
        // console.log(search);
        if (search) {
            navigate('/fruits')
            props.searchFunction && props.searchFunction(search)
        }

    }, [search])


    return (
        <>
            {/* <Header />
            <Search />
            <Slider />

            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <Fruits />
                        <Offers />
                        <Vegitables />

                    </div>
                </div>
            </div>
            <Features />
            <Banner />
            <Bestseller />
            <Review />
            <Footer /> */}


            {/* Navbar start */}

            <Header />
            {/* Navbar End */}



            <div>
                {/* Modal Search Start */}
                <Search />
                {/* Modal Search End */}
                {/* Hero Start */}
                <Slider />
                {/* Hero End */}
                {/* Featurs Section Start */}
                <Features />
                {/* Featurs Section End */}
                {/* Fruits Shop Start*/}
                <Fruits />
                {/* Fruits Shop End*/}
                {/* Featurs Start */}
                <Offers />
                {/* Featurs End */}
                {/* Vesitable Shop Start*/}
                <Vegitables />
                {/* Vesitable Shop End */}
                {/* Banner Section Start*/}
                {/* <Banner /> */}
                {/* Banner Section End */}
                {/* Bestsaler Product Start */}
                <Bestseller />
                {/* Bestsaler Product End */}

                {/* Tastimonial Start */}
                {/* <Review /> */}
                {/* Tastimonial End */}
                {/* Footer Start */}
                <Footer />
                {/* Footer End */}

            </div>


        </>
    )
}

export default Home
