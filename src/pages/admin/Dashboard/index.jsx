import React, { useEffect, useState } from 'react'
import '../css/main.min.css'
import axios from '../../../api/axiosClient';
import Nav from '../Nav'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";



export default function Dashboard(props) {

    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const [totalArtikel, setTotalArtikel] = useState([]);
    const [totalKegiatanDone, setTotalKegiatanDone] = useState([]);
    const [totalKegiatanNot, setTotalKegiatanNot] = useState([]);
    const [loading, setLoading] = useState(false);

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
            // console.log(res)
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
    }, [props])



    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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
                                        <div className="m-b-5 font-weight-bold">Jumlah Penduduk</div><i className="fa fa-users widget-stat-icon" />
                                        <div><i className="fa fa-level-up m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-info color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{totalArtikel}</h2>
                                        <div className="m-b-5 font-weight-bold">Jumlah Artikel</div><i className="fa fa-book widget-stat-icon" />
                                        <div><i className="fa fa-level-up m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-warning color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{totalKegiatanNot}</h2>
                                        <div className="m-b-5 font-weight-bold">Kegiatan Mendatang</div><i className="far fa-calendar-minus widget-stat-icon" />
                                        <div><i className="fa fa-level-up m-r-5" /><small></small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="ibox bg-danger color-white widget-stat">
                                    <div className="ibox-body">
                                        <h2 className="m-b-5 font-strong text-white">{totalKegiatanDone}</h2>
                                        <div className="m-b-5 font-weight-bold">Kegiatan Selesai</div><i className="far fa-calendar-check widget-stat-icon" />
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
                                                <h3 className="m-0">Statistics</h3>
                                                <div>Your shop sales analytics</div>
                                            </div>
                                        </div>
                                        <div className='col-lg-12'>
                                            <AreaChart
                                                width={600}
                                                height={270}
                                                data={data}
                                                margin={{
                                                    top: 10,
                                                    right: 30,
                                                    left: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
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
                        <div className="to-top"><i className="fa fa-angle-double-up" /></div>
                    </footer>
                </div>
            </div>
        </div>
    )
}