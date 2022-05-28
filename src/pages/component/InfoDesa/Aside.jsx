import React, { useState, useEffect } from 'react'
import axios from '../../../api/axiosClient'
import { Carousel } from 'react-bootstrap';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";


export default function Aside(props) {
    const moment = require('moment');

    const [populer, setPopuler] = useState();
    const [newest, setNewest] = useState();
    const [acak, setAcak] = useState();
    const [ikegiatan, setIKegiatan] = useState();
    const [kegiatan, setKegiatan] = useState();
    const [chartData, setChartData] = useState({});

    // const getArtikel = async () => {
    //     try {
    //         const res = await axios.get(`/artikel?perpage=6`,)
    //         setArtikel(res.data.data.data)
    //     }
    //     catch (err) {
    //     }
    // }

    const getIKegiatan = async () => {
        try {
            const res = await axios.get(`/kegiatan`)
            setIKegiatan(res.data)
        }
        catch (err) {
        }
    }
    const getKegiatan = async () => {
        try {
            const res = await axios.get(`/kegiatan/paginate?perpage=3`)
            setKegiatan(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getPopuler = async () => {
        try {
            const res = await axios.get(`/artikel/mostview?perpage=3`,)
            setPopuler(res.data.data.data)
        }
        catch (err) {
        }
    }

    const getNewest = async () => {
        try {
            const res = await axios.get(`/artikel/newest?perpage=3`,)
            setNewest(res.data.data.data)
        }
        catch (err) {
        }
    }
    const getAcak = async () => {
        try {
            const res = await axios.get(`/artikel`,)
            setAcak(res.data)
        }
        catch (err) {
        }
    }

    useEffect(() => {
        getPopuler();
        getNewest();
        getAcak();
        getIKegiatan();
        getKegiatan();
        chart();
    }, [props])


    const chart = async () => {
        try {
            const res = await axios.get(`/artikel`)
            setChartData(res.data)
        }
        catch (err) {
        }
    }

    return (
        <div>
            <div className="blog_right_sidebar">
                <div className="single_sidebar_widget post_category_widget">
                    <div className='bg-success rounded-3'>
                    <h4 className="widget_title text-white text-center pt-2 font-weight-bold">Lokasi Kantor Kecamatan Jonggol</h4>
                    </div>
                    <div className="">
                        <iframe className='col-sm-12 col-lg-12 col-12' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.423548888298!2d107.06381541474067!3d-6.467908195320918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69bd6e2b938d7b%3A0x60cb30f2f8b1b8fe!2sKantor%20Kecamatan%20Jonggol!5e0!3m2!1sid!2sid!4v1646206447042!5m2!1sid!2sid"
                            style={{ height: 300, width:500 , border: 0 }} allowFullScreen loading="lazy" />
                    </div>
                </div>
                <div className="mb-5">
                    <div className="single-defination">
                        <h4 className="mb-20 ml-5 ">Statistik Views Artikel</h4>
                        <AreaChart
                            width={350}
                            height={300}
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="4 4" />
                            <XAxis dataKey="nama_artikel" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </div>
                </div>
                <div className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title bg-success pt-2 text-white text-center font-weight-bold">Arsip Artikel dan Kegiatan</h3>
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
                            <li className="nav-item">
                                <a className="nav-link" href="#tab-1-4" data-toggle="tab">Kegiatan Terbaru</a>
                            </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="tab-1-1">
                                {populer?.map((populer, index) => (
                                    <div key={index} className="media post_item">
                                        <img src={populer.image} style={{ width: 120, height: 'auto' }} alt="post" />
                                        <div className="media-body">
                                            <a href={`/detail/${populer.id}`}>
                                                <h3>{populer.nama_artikel}</h3>
                                            </a>
                                            <p>{moment(populer.created_at).fromNow()}</p>
                                            <p><FontAwesomeIcon icon={faEye} className='mr-2' />{populer.views}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="tab-pane" id="tab-1-2">
                                {newest?.map((newest, index) => (
                                    <div key={index} className="media post_item">
                                        <img src={newest.image} style={{ width: 120, height: 'auto' }} alt="post" />
                                        <div className="media-body">
                                            <a href={`/detail/${newest.id}`}>
                                                <h3>{newest.nama_artikel}</h3>
                                            </a>
                                            <p>{moment(newest.created_at).fromNow()}</p>
                                            <p><FontAwesomeIcon icon={faEye} className='mr-2' />{newest.views}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="tab-pane" id="tab-1-3">
                                <div className="scroller" data-height="260">
                                    {acak?.map((artikel, map) => (
                                        <div key={map} className="media post_item">
                                            <img src={artikel.image} style={{ width: 120, height: 'auto' }} alt="post" />
                                            <div className="media-body">
                                                <a href={`/detail/${artikel.id}`}>
                                                    <h3>{artikel.nama_artikel}</h3>
                                                </a>
                                                <p>{moment(acak.created_at).fromNow()}</p>
                                                <p><FontAwesomeIcon icon={faEye} className='mr-2' />{artikel.views}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="tab-pane" id="tab-1-4">
                                {kegiatan?.map((kegiatan, map) => (
                                    <div key={map} className="media post_item">
                                        <img src={kegiatan.image} style={{ width: 120, height: 'auto' }} alt="post" />
                                        <div className="media-body">
                                            <a href={`/detail/${kegiatan.id}`}>
                                                <h3>{kegiatan.nama_kegiatan}</h3>
                                            </a>
                                            <p>{moment(kegiatan.created_at).fromNow()}</p>
                                            <p><FontAwesomeIcon icon={faPen} className='mr-2' />{kegiatan.status == 0 ? "Belum Dilaksanakan" : "Sudah Dilaksakan"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <aside className="single_sidebar_widget instagram_feeds">
                    <h4 className="widget_title bg-success pt-2 text-white text-center font-weight-bold">Galeri Foto</h4>
                    <div className="col-lg-12">
                        <Carousel fade={true} pause={false} controls={false} indicators={false}>
                            {ikegiatan?.map((kegiatan, index) => (
                                <Carousel.Item interval={5000} key={index.id}>
                                    <div className="single-slider">
                                        <div className="trending-top mb-30">
                                            <div className="trend-top-img">
                                                <img src={kegiatan.image} alt />
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </aside>
            </div>
        </div>
    )
}