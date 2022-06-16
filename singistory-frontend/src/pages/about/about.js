import '../../css/about.css'

function About() {
    return (
        <div className='aboutPage'>
            <h1 className='header'>About Us</h1>
            <div className="about-box">
                <div className="first-about">
                    <div className='first-about-header-box'>Singistory</div>
                    <div className='first-about-details-box'>
                        <p>If you want to know about singer this site can help you find everything you need to know. This web site made for people who want to know whatever music you hear from many social network. We have many infomation of a new singer until well-known singer. And we have community for people who want about an singer and group of fan club.</p>
                    </div>
                </div>
                <div className="second-about">
                    <div className='second-about-details-box'>
                        <p>What you can find?</p>
                        <ul>
                            <li>many of singer from the rest of the world</li>
                            <li>all of album you would never know</li>
                            <li>many type of music</li>
                            <li>a community that you can enjoy from the corner of the world</li>
                        </ul>
                    </div>
                    <div className='second-about-header-box'>All Singer You Need</div>
                </div>
            </div>
        </div>
    )
}

export default About;