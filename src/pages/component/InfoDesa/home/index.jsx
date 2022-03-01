import React from 'react'
import "../../css/bootstrap.min.css";
import "../../css/owl.carousel.min.css";
import "../../css/ticker-style.css";
import "../../css/flaticon.css"
import "../../css/slicknav.css"
import "../../css/animate.min.css"
import "../../css/magnific-popup.css"
import "../../css/fontawesome-all.min.css"
import "../../css/themify-icons.css"
import "../../css/slick.css"
import "../../css/nice-select.css"
import "../../css/style.css"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer'

export default function Home() {
    return (
        <div>
            <Header />
            <main>
                {/*================Blog Area =================*/}
                <section className="blog_area single-post-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="trending-area fix">
                                    <div className="container">
                                        <div className="trending-main">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <Carousel fade={true} pause={false} controls={false} indicators={false}>
                                                        <Carousel.Item interval={5000}>
                                                            <div className="single-slider">
                                                                <div className="trending-top mb-30">
                                                                    <div className="trend-top-img">
                                                                        <img src="assets/img/trending/trending_top2.jpg" alt />
                                                                        <div className="trend-top-cap pt-5">
                                                                            <span className="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span>
                                                                            <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">Anna Lora Stuns In White At Her Australian Premiere</a></h2>
                                                                            <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">by Alice cloe   -   Jun 19, 2020</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        {/* Single */}
                                                        <Carousel.Item interval={5000}>
                                                            <div className="single-slider">
                                                                <div className="trending-top mb-30">
                                                                    <div className="trend-top-img">
                                                                        <img src="assets/img/trending/trending_top02.jpg" alt />
                                                                        <div className="trend-top-cap">
                                                                            <span className="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span>
                                                                            <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">Anna Lora Stuns In White At Her Australian Premiere</a></h2>
                                                                            <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">by Alice cloe   -   Jun 19, 2020</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        {/* Single */}
                                                        <Carousel.Item interval={5000}>
                                                            <div className="single-slider">
                                                                <div className="trending-top mb-30">
                                                                    <div className="trend-top-img">
                                                                        <img src="assets/img/trending/trending_top03.jpg" alt />
                                                                        <div className="trend-top-cap">
                                                                            <span className="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span>
                                                                            <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">Anna Lora Stuns In White At Her Australian Premiere</a></h2>
                                                                            <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">by Alice cloe   -   Jun 19, 2020</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                    </Carousel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="whats-news-area">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="whats-news-wrapper">
                                                    {/* Heading & Nav Button */}
                                                    <div className="row justify-content-between align-items-end mb-15">
                                                        <div className="col-xl-4">
                                                            <div className="section-tittle mb-30">
                                                                <h2>Artikel</h2>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-8 col-md-9">
                                                            <div className="properties__button">
                                                                {/*Nav Button  */}
                                                                <nav>
                                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Lifestyle</a>
                                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Travel</a>
                                                                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Fashion</a>
                                                                        <a className="nav-item nav-link" id="nav-last-tab" data-toggle="tab" href="#nav-last" role="tab" aria-controls="nav-contact" aria-selected="false">Sports</a>
                                                                        <a className="nav-item nav-link" id="nav-Sports" data-toggle="tab" href="#nav-nav-Sport" role="tab" aria-controls="nav-contact" aria-selected="false">Technology</a>
                                                                    </div>
                                                                </nav>
                                                                {/*End Nav Button  */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Tab content */}
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {/* Nav Card */}
                                                            <div className="tab-content" id="nav-tabContent">
                                                                {/* card one */}
                                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="whats-news-single mb-40 mb-40">
                                                                                <div className="whates-img">
                                                                                    <img src="assets/img/gallery/whats_news_details1.png" alt />
                                                                                </div>
                                                                                <div className="whates-caption whates-caption2">
                                                                                    <h4><a href="#">Secretart for Economic Air
                                                                                        plane that looks like</a></h4>
                                                                                    <span>by Alice cloe   -   Jun 19, 2020</span>
                                                                                    <p>Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="whats-news-single mb-40 mb-40">
                                                                                <div className="whates-img">
                                                                                    <img src="assets/img/gallery/whats_news_details2.png" alt />
                                                                                </div>
                                                                                <div className="whates-caption whates-caption2">
                                                                                    <h4><a href="#">Secretart for Economic Air
                                                                                        plane that looks like</a></h4>
                                                                                    <span>by Alice cloe   -   Jun 19, 2020</span>
                                                                                    <p>Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <nav className="blog-pagination justify-content-center d-flex">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <a href="#" className="page-link" aria-label="Previous">
                                                        <i className="ti-angle-left" />
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#" className="page-link">1</a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#" className="page-link">2</a>
                                                </li>
                                                <li className="page-item">
                                                    <a href="#" className="page-link" aria-label="Next">
                                                        <i className="ti-angle-right" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog_right_sidebar">
                                    <aside className="single_sidebar_widget post_category_widget">
                                        <h4 className="widget_title">Lokasi Kantor Kecamatan Jonggol</h4>
                                        <ul className="list cat-list">
                                            <li>
                                                <a href="#" className="d-flex">
                                                    <p>Map</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </aside>
                                    <aside className="single_sidebar_widget post_category_widget">
                                        <h4 className="widget_title">Statistik Penduduk</h4>
                                        <ul className="list cat-list">
                                            <li>
                                                <a href="#" className="d-flex">
                                                    <p>Chart</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </aside>
                                    <aside className="single_sidebar_widget popular_post_widget">
                                        <h3 className="widget_title">Arsip Artikel</h3>
                                        <nav>
                                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Terbaru</a>
                                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Populer</a>
                                                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Acak</a>
                                            </div>
                                        </nav>
                                        <div className="media post_item mt-3">
                                            <img src="assets/img/post/post_1.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>From life was you fish...</h3>
                                                </a>
                                                <p>January 12, 2019</p>
                                            </div>
                                        </div>
                                        <div className="media post_item">
                                            <img src="assets/img/post/post_2.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>The Amazing Hubble</h3>
                                                </a>
                                                <p>02 Hours ago</p>
                                            </div>
                                        </div>
                                        <div className="media post_item">
                                            <img src="assets/img/post/post_3.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>Astronomy Or Astrology</h3>
                                                </a>
                                                <p>03 Hours ago</p>
                                            </div>
                                        </div>
                                        <div className="media post_item">
                                            <img src="assets/img/post/post_4.png" alt="post" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3>Asteroids telescope</h3>
                                                </a>
                                                <p>01 Hours ago</p>
                                            </div>
                                        </div>
                                    </aside>
                                    <aside className="single_sidebar_widget instagram_feeds">
                                        <h4 className="widget_title">Galeri Foto</h4>
                                        <div className="col-lg-12">
                                            <Carousel fade={true} pause={false} controls={false} indicators={false}>
                                                <Carousel.Item interval={5000}>
                                                    <div className="single-slider">
                                                        <div className="trending-top mb-30">
                                                            <div className="trend-top-img">
                                                                <img src="assets/img/trending/trending_top2.jpg" alt />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                                {/* Single */}
                                                <Carousel.Item interval={5000}>
                                                    <div className="single-slider">
                                                        <div className="trending-top mb-30">
                                                            <div className="trend-top-img">
                                                                <img src="assets/img/trending/trending_top02.jpg" alt />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                                {/* Single */}
                                                <Carousel.Item interval={5000}>
                                                    <div className="single-slider">
                                                        <div className="trending-top mb-30">
                                                            <div className="trend-top-img">
                                                                <img src="assets/img/trending/trending_top03.jpg" alt />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                    </aside>
                                    <aside className="single_sidebar_widget tag_cloud_widget">
                                        <h4 className="widget_title">Tag Clouds</h4>
                                        <ul className="list">
                                            <li>
                                                <a href="#">project</a>
                                            </li>
                                            <li>
                                                <a href="#">love</a>
                                            </li>
                                            <li>
                                                <a href="#">technology</a>
                                            </li>
                                            <li>
                                                <a href="#">travel</a>
                                            </li>
                                            <li>
                                                <a href="#">restaurant</a>
                                            </li>
                                            <li>
                                                <a href="#">life style</a>
                                            </li>
                                            <li>
                                                <a href="#">design</a>
                                            </li>
                                            <li>
                                                <a href="#">illustration</a>
                                            </li>
                                        </ul>
                                    </aside>
                                    <aside className="single_sidebar_widget newsletter_widget">
                                        <h4 className="widget_title">Newsletter</h4>
                                        <form action="#">
                                            <div className="form-group">
                                                <input type="email" className="form-control" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email'" placeholder="Enter email" required />
                                            </div>
                                            <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">Subscribe</button>
                                        </form>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*================ Blog Area end =================*/}
            </main>
            <Footer />
        </div>
    )
}