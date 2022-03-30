import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Aside(props) {
    const data = [
        { name: "Laki-Laki", total: 600 },
        { name: "Perempuan", total: 300 },
        { name: "Total", total: 1000 },
    ];

    const api = 'http://127.0.0.1:8000/api'
    const [artikel, setArtikel] = useState();
    const [populer, setPopuler] = useState();
    const [newest, setNewest] = useState();
    const [acak, setAcak] = useState();
    const navigate = useNavigate();
    const getArtikel = async () => {
        try {
            const res = await axios.get(api + `/artikel?perpage=6`,)
            setArtikel(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getPopuler = async () => {
        try {
            const res = await axios.get(api + `/artikel/mostview?perpage=3`,)
            setPopuler(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getNewest = async () => {
        try {
            const res = await axios.get(api + `/artikel/newest?perpage=3`,)
            setNewest(res.data.data.data)
        }
        catch (err) {
        }
    }
    const getAcak = async () => {
        try {
            const res = await axios.get(api + `/artikel/acak?perpage=3`,)
            setAcak(res.data.data.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getArtikel();
        getPopuler();
        getNewest();
        getAcak();
    }, [props])

    return (
        <div>
            <div className="blog_right_sidebar">
                <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title">Lokasi Kantor Kecamatan Jonggol</h4>
                    <div className="">
                        <iframe className='col-sm-12' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.423548888298!2d107.06381541474067!3d-6.467908195320918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69bd6e2b938d7b%3A0x60cb30f2f8b1b8fe!2sKantor%20Kecamatan%20Jonggol!5e0!3m2!1sid!2sid!4v1646206447042!5m2!1sid!2sid"
                            style={{ height: 300, border: 0 }} allowFullScreen loading="lazy" />
                    </div>
                </aside>
                <div className="mb-5">
                    <div className="single-defination">
                        <h4 className="mb-20 ml-5">Statistik Penduduk</h4>
                        <BarChart className='col-sm-12'
                            width={320}
                            height={300}
                            data={data}
                            barSize={30}
                        >
                            <XAxis
                                dataKey="name"
                                scale="point"
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis />   
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="total" fill="grey" background={{ fill: "#eee" }} />
                        </BarChart>
                    </div>
                </div>
                <div className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">Arsip Artikel</h3>
                    <div className="ibox-body">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="#tab-1-1" data-toggle="tab">Populer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#tab-1-2" data-toggle="tab">Terbaru</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#tab-1-3" data-toggle="tab">Acak</a>
                            </li>
                        </ul>
                        <div className="tab-content mt-3">
                                <div className="tab-pane fade show active" id="tab-1-1">
                                {populer?.map((populer, index) => (
                                    <div key={index} className="media post_item">
                                        <img src={"http://localhost:8000/" + populer.image} style={{width:120, height:'auto'}} alt="post" />
                                        <div className="media-body">
                                            <a href={`/detail/${populer.id}`}>
                                                <h3>{populer.nama_artikel}</h3>
                                            </a>
                                            <p>{populer.tanggal}</p>
                                            <p><FontAwesomeIcon icon={faEye} className='mr-2' />{populer.views}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className="tab-pane" id="tab-1-2">
                                {newest?.map((newest, index) => (
                                    <div key={index} className="media post_item">
                                       <img src={"http://localhost:8000/" + newest.image} style={{width:120, height:'auto'}} alt="post" />
                                        <div className="media-body">
                                            <a href={`/detail/${newest.id}`}>
                                                <h3>{newest.nama_artikel}</h3>
                                            </a>
                                            <p>{newest.tanggal}</p>
                                            <p><FontAwesomeIcon icon={faEye} className='mr-2' />{newest.views}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className="tab-pane" id="tab-1-3">
                                {acak?.map((artikel, map) => (
                                    <div key={map} className="media post_item">
                                        <img src={"http://localhost:8000/" + artikel.image} style={{width:120, height:'auto'}} alt="post" />
                                        <div className="media-body">
                                            <a href={`/detail/${artikel.id}`}>
                                                <h3>{artikel.nama_artikel}</h3>
                                            </a>
                                            <p>{artikel.tanggal}</p>
                                            <p><FontAwesomeIcon icon={faEye} className='mr-2' />{artikel.views}</p>
                                        </div>
                                    </div>
                                     ))}
                                </div>
                            </div>
                    </div>
                </div>
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
            </div>
        </div>
    )
}