import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import Aside from '../Aside';

export default function Sejarah() {
    return (
        <div>
            <Header />
            <main>
                <div class="blog_area single-post-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="single-post">
                                    <div className="feature-img">
                                        <img className="img-fluid" src="assets/img/blog/single_blog_1.png" alt />
                                    </div>
                                    <div className="blog_details">
                                        <h2>Sejarah Desa
                                        </h2>
                                        <ul className="blog-info-link mt-3 mb-4">
                                            <li><a href="#"><i className="fa fa-user" /> Travel, Lifestyle</a></li>
                                            <li><a href="#"><i className="fa fa-comments" /> 03 Comments</a></li>
                                        </ul>
                                        <p className="excert">
                                            MCSE boot camps have its supporters and its detractors. Some people do not understand why you
                                            should have to spend money on boot camp when you can get the MCSE study materials yourself at a
                                            fraction of the camp price. However, who has the willpower
                                        </p>
                                        <p>
                                            MCSE boot camps have its supporters and its detractors. Some people do not understand why you
                                            should have to spend money on boot camp when you can get the MCSE study materials yourself at a
                                            fraction of the camp price. However, who has the willpower to actually sit through a
                                            self-imposed MCSE training. who has the willpower to actually
                                        </p>
                                        <div className="quote-wrapper">
                                            <div className="quotes">
                                                MCSE boot camps have its supporters and its detractors. Some people do not understand why you
                                                should have to spend money on boot camp when you can get the MCSE study materials yourself at
                                                a fraction of the camp price. However, who has the willpower to actually sit through a
                                                self-imposed MCSE training.
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <Aside />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}