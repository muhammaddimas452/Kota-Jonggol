import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer>
                {/* Footer Start*/}
                <div className="footer-main footer-bg">
                    <div className="footer-area footer-padding">
                        <div className="container">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                                    <div className="single-footer-caption mb-50">
                                        <div className="single-footer-caption mb-30">
                                            <div className="footer-tittle">
                                                <div className="footer-pera">
                                                    <p className="info1">Kec. Jonggol
                                                        Kabupaten Bogor
                                                        Jawa Barat</p>
                                                    <p className="info2">Email: ????</p>
                                                    <p className="info2">Phone: +95 (0) 123 456 789 Cell: +95 (0) 123 456 789</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Popular post</h4>
                                        </div>
                                        {/* Popular post */}
                                        <div className="whats-right-single mb-20">
                                            <div className="whats-right-img">
                                                <img src="assets/img/gallery/footer_post1.png" alt />
                                            </div>
                                            <div className="whats-right-cap">
                                                <h4><a href="latest_news.html">Scarlett’s disappointment at latest accolade</a></h4>
                                                <p>Jhon  |  2 hours ago</p>
                                            </div>
                                        </div>
                                        {/* Popular post */}
                                        <div className="whats-right-single mb-20">
                                            <div className="whats-right-img">
                                                <img src="assets/img/gallery/footer_post2.png" alt />
                                            </div>
                                            <div className="whats-right-cap">
                                                <h4><a href="latest_news.html">Scarlett’s disappointment at latest accolade</a></h4>
                                                <p>Jhon  |  2 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-3">
                                    <div className="single-footer-caption mb-50">
                                        <div className="banner text-center">
                                            <img src="assets/img/logo/jonggol.png" style={{ width: 200, height: 'auto' }} alt />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-area footer-bg">
                        <div className="container">
                            <div className="footer-border">
                                <div className="row d-flex align-items-center">
                                    <div className="col-xl-12 ">
                                        <div className="footer-copy-right text-center">
                                            <p> Copyright © All rights reserved</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}