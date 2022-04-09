import React, { useEffect, useState } from 'react'
import '../css/main.min.css'
import axios from '../../../api/axiosClient';
import Nav from '../Nav'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarMinus } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"




export default function Dashboard(props) {

    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const [totalArtikel, setTotalArtikel] = useState([]);
    const [totalKegiatanDone, setTotalKegiatanDone] = useState([]);
    const [totalKegiatanNot, setTotalKegiatanNot] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({});

    const getJumlahPenduduk = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/jumlah-penduduk`)
            setLoading(false)
            setJumlahPenduduk(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    const getTotalArtikel = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/totalArtikel`)
            setLoading(false)
            setTotalArtikel(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    const getTotalKegiatanDone = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/totalKegiatanDone`)
            setLoading(false)

            setTotalKegiatanDone(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    const getTotalKegiatanNot = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/totalKegiatanNot`)
            setLoading(false)
            setTotalKegiatanNot(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getJumlahPenduduk();
        getTotalArtikel();
        getTotalKegiatanDone();
        getTotalKegiatanNot();
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
            <div className="page-wrapper">
                <Nav />
                <div className="content-wrapper">
                    <div className="page-content fade-in-up">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-success color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{jumlahPendudukInput}</h2>
                                        <div className="m-b-5 font-weight-bold">Jumlah Penduduk</div><FontAwesomeIcon icon={faPeopleGroup} className='widget-stat-icon little pl-2 pr-2' />
                                        <div><i className="fa fa-level-up m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-info color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{totalArtikel}</h2>
                                        <div className="m-b-5 font-weight-bold">Jumlah Artikel</div><FontAwesomeIcon icon={faBook} className='widget-stat-icon pl-2 pr-2' />
                                        <div><i className="fa fa-level-up m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-warning color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{totalKegiatanNot}</h2>
                                        <div className="m-b-5 font-weight-bold">Kegiatan Mendatang</div><FontAwesomeIcon icon={faCalendarMinus} className='widget-stat-icon pl-2 pr-2' />
                                        <div><i className="fa fa-level-up m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-danger color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{totalKegiatanDone}</h2>
                                        <div className="m-b-5 font-weight-bold">Kegiatan Selesai</div><FontAwesomeIcon icon={faCalendarCheck} className='widget-stat-icon pl-2 pr-2' />
                                        <div><i className="fa fa-level-down m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="ibox">
                                    <div className="ibox-body col-sm-12">
                                        <div className="mb-4">
                                            <div>
                                                <h3 className="m-0">Grafik</h3>
                                                <div></div>
                                            </div>
                                        </div>
                                        <div className='col-lg-12' >
                                            <AreaChart
                                                width={700}
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
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">Peta Jonggol</div>
                                    </div>
                                    <div className="ibox-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div>
                                                    <iframe className='col-lg-12 col-sm-12' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63429.309783856195!2d107.00892233512408!3d-6.4795862499880315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69bc0d7468736b%3A0x401576d14fed560!2sJonggol%2C%20Kec.%20Jonggol%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1646205215963!5m2!1sid!2sid"
                                                        style={{ height: 283, border: 0 }} allowFullScreen loading="lazy" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <style dangerouslySetInnerHTML={{ __html: "\n                    .visitors-table tbody tr td:last-child {\n                        display: flex;\n                        align-items: center;\n                    }\n\n                    .visitors-table .progress {\n                        flex: 1;\n                    }\n\n                    .visitors-table .progress-parcent {\ntext-align: right;\nmargin-left: 10px;\n}\n" }} />
                    </div>
                    {/* END PAGE CONTENT*/}
                    <footer className="page-footer">
                        <div className="font-13">2018 © <b>AdminCAST</b> - All rights reserved.</div>
                        <div className="to-top mr-5"><FontAwesomeIcon icon={faArrowUp} className="text-dark" /></div>
                    </footer>
                </div>
            </div>
        </div>
    )
}