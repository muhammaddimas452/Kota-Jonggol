import React, { PureComponent, useEffect, useState } from 'react'
import '../css/main.min.css'
import axios from 'axios';
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";



export default function Dashboard(props) {
    const api = 'http://127.0.0.1:8000/api';

    const [jumlahPendudukInput, setJumlahPenduduk] = useState();
    const [totalArtikel, setTotalArtikel] = useState([]);
    const [totalKegiatanDone, setTotalKegiatanDone] = useState([]);
    const [totalKegiatanNot, setTotalKegiatanNot] = useState([]);
    const [loading, setLoading] = useState(false);

    const getJumlahPenduduk = async () => {
        try {
            setLoading(true)
            const res = await axios.get(api + `/jumlah-penduduk`)
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
            const res = await axios.get(api + `/totalArtikel`)
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
            const res = await axios.get(api + `/totalKegiatanDone`)
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
            const res = await axios.get(api + `/totalKegiatanNot`)
            setLoading(false)
            // console.log(res)
            setTotalKegiatanNot(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    const [tombol, setTombol] = useState(true)
    useEffect(() => {
        getJumlahPenduduk();
        getTotalArtikel();
        getTotalKegiatanDone();
        getTotalKegiatanNot();
    }, [props])



    const data = [
        { name: "Jumlah Penduduk", users: 2000000000 },
        { name: "Total Artikel", users: 1500000000 },
        { name: "Kegiatan Selesai", users: 1000000000 },
        { name: "Kegiatan", users: 500000000 },
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
                                    <div className="ibox-body">
                                        <div className="mb-4">
                                            <div>
                                                <h3 className="m-0">Statistics</h3>
                                                <div>Your shop sales analytics</div>
                                            </div>
                                        </div>
                                        <div>
                                            <BarChart className='ibox col-lg-12'
                                                width={500}
                                                height={270}
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
                                                <Bar dataKey="users" fill="grey" background={{ fill: "#eee" }} />
                                            </BarChart>
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
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">Visitors Statistics</div>
                                    </div>
                                    <div className="ibox-body">
                                        <div id="world-map" style={{ height: 300 }} />
                                        <table className="table table-striped m-t-20 visitors-table">
                                            <thead>
                                                <tr>
                                                    <th>Country</th>
                                                    <th>Visits</th>
                                                    <th>Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/us.png" />USA</td>
                                                    <td>755</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-success" role="progressbar" style={{ width: '52%', height: 5 }} aria-valuenow={52} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">52%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/Canada.png" />Canada</td>
                                                    <td>700</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-warning" role="progressbar" style={{ width: '48%', height: 5 }} aria-valuenow={48} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">48%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/India.png" />India</td>
                                                    <td>410</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-danger" role="progressbar" style={{ width: '37%', height: 5 }} aria-valuenow={37} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">37%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/Australia.png" />Australia</td>
                                                    <td>304</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-info" role="progressbar" style={{ width: '36%', height: 5 }} aria-valuenow={36} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">36%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/Singapore.png" />Singapore</td>
                                                    <td>203</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar" role="progressbar" style={{ width: '35%', height: 5 }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">35%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/uk.png" />UK</td>
                                                    <td>202</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-info" role="progressbar" style={{ width: '35%', height: 5 }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">35%</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img className="m-r-10" src="./assets/img/flags/UAE.png" />UAE</td>
                                                    <td>180</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-warning" role="progressbar" style={{ width: '30%', height: 5 }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                        <span className="progress-parcent">30%</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">Tasks</div>
                                        <div>
                                            <a className="btn btn-info btn-sm" href="javascript:;">New Task</a>
                                        </div>
                                    </div>
                                    <div className="ibox-body">
                                        <ul className="list-group list-group-divider list-group-full tasks-list">
                                            <li className="list-group-item task-item">
                                                <div>
                                                    <label className="ui-checkbox ui-checkbox-gray ui-checkbox-success">
                                                        <input type="checkbox" />
                                                        <span className="input-span" />
                                                        <span className="task-title">Meeting with Eliza</span>
                                                    </label>
                                                </div>
                                                <div className="task-data"><small className="text-muted">10 July 2018</small></div>
                                                <div className="task-actions">
                                                    <a href="javascript:;"><i className="fa fa-edit text-muted m-r-10" /></a>
                                                    <a href="javascript:;"><i className="fa fa-trash text-muted" /></a>
                                                </div>
                                            </li>
                                            <li className="list-group-item task-item">
                                                <div>
                                                    <label className="ui-checkbox ui-checkbox-gray ui-checkbox-success">
                                                        <input type="checkbox" defaultChecked />
                                                        <span className="input-span" />
                                                        <span className="task-title">Check your inbox</span>
                                                    </label>
                                                </div>
                                                <div className="task-data"><small className="text-muted">22 May 2018</small></div>
                                                <div className="task-actions">
                                                    <a href="javascript:;"><i className="fa fa-edit text-muted m-r-10" /></a>
                                                    <a href="javascript:;"><i className="fa fa-trash text-muted" /></a>
                                                </div>
                                            </li>
                                            <li className="list-group-item task-item">
                                                <div>
                                                    <label className="ui-checkbox ui-checkbox-gray ui-checkbox-success">
                                                        <input type="checkbox" />
                                                        <span className="input-span" />
                                                        <span className="task-title">Create Financial Report</span>
                                                    </label>
                                                    <span className="badge badge-danger m-l-5"><i className="ti-alarm-clock" /> 1 hrs</span>
                                                </div>
                                                <div className="task-data"><small className="text-muted">No due date</small></div>
                                                <div className="task-actions">
                                                    <a href="javascript:;"><i className="fa fa-edit text-muted m-r-10" /></a>
                                                    <a href="javascript:;"><i className="fa fa-trash text-muted" /></a>
                                                </div>
                                            </li>
                                            <li className="list-group-item task-item">
                                                <div>
                                                    <label className="ui-checkbox ui-checkbox-gray ui-checkbox-success">
                                                        <input type="checkbox" defaultChecked />
                                                        <span className="input-span" />
                                                        <span className="task-title">Send message to Mick</span>
                                                    </label>
                                                </div>
                                                <div className="task-data"><small className="text-muted">04 Apr 2018</small></div>
                                                <div className="task-actions">
                                                    <a href="javascript:;"><i className="fa fa-edit text-muted m-r-10" /></a>
                                                    <a href="javascript:;"><i className="fa fa-trash text-muted" /></a>
                                                </div>
                                            </li>
                                            <li className="list-group-item task-item">
                                                <div>
                                                    <label className="ui-checkbox ui-checkbox-gray ui-checkbox-success">
                                                        <input type="checkbox" />
                                                        <span className="input-span" />
                                                        <span className="task-title">Create new page</span>
                                                    </label>
                                                    <span className="badge badge-success m-l-5">2 Days</span>
                                                </div>
                                                <div className="task-data"><small className="text-muted">07 Dec 2018</small></div>
                                                <div className="task-actions">
                                                    <a href="javascript:;"><i className="fa fa-edit text-muted m-r-10" /></a>
                                                    <a href="javascript:;"><i className="fa fa-trash text-muted" /></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">Messages</div>
                                    </div>
                                    <div className="ibox-body">
                                        <ul className="media-list media-list-divider m-0">
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img className="img-circle" src="./assets/img/users/u1.jpg" width={40} />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">Jeanne Gonzalez <small className="float-right text-muted">12:05</small></div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                                                </div>
                                            </li>
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img className="img-circle" src="./assets/img/users/u2.jpg" width={40} />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">Becky Brooks <small className="float-right text-muted">1 hrs ago</small></div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                                                </div>
                                            </li>
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img className="img-circle" src="./assets/img/users/u3.jpg" width={40} />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">Frank Cruz <small className="float-right text-muted">3 hrs ago</small></div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                                                </div>
                                            </li>
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img className="img-circle" src="./assets/img/users/u6.jpg" width={40} />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">Connor Perez <small className="float-right text-muted">Today</small></div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">Latest Orders</div>
                                        <div className="ibox-tools">
                                            <a className="ibox-collapse"><i className="fa fa-minus" /></a>
                                            <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item">option 1</a>
                                                <a className="dropdown-item">option 2</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ibox-body">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th width="91px">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <a href="invoice.html">AT2584</a>
                                                    </td>
                                                    <td>@Jack</td>
                                                    <td>$564.00</td>
                                                    <td>
                                                        <span className="badge badge-success">Shipped</span>
                                                    </td>
                                                    <td>10/07/2017</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="invoice.html">AT2575</a>
                                                    </td>
                                                    <td>@Amalia</td>
                                                    <td>$220.60</td>
                                                    <td>
                                                        <span className="badge badge-success">Shipped</span>
                                                    </td>
                                                    <td>10/07/2017</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="invoice.html">AT1204</a>
                                                    </td>
                                                    <td>@Emma</td>
                                                    <td>$760.00</td>
                                                    <td>
                                                        <span className="badge badge-default">Pending</span>
                                                    </td>
                                                    <td>10/07/2017</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="invoice.html">AT7578</a>
                                                    </td>
                                                    <td>@James</td>
                                                    <td>$87.60</td>
                                                    <td>
                                                        <span className="badge badge-warning">Expired</span>
                                                    </td>
                                                    <td>10/07/2017</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="invoice.html">AT0158</a>
                                                    </td>
                                                    <td>@Ava</td>
                                                    <td>$430.50</td>
                                                    <td>
                                                        <span className="badge badge-default">Pending</span>
                                                    </td>
                                                    <td>10/07/2017</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="invoice.html">AT0127</a>
                                                    </td>
                                                    <td>@Noah</td>
                                                    <td>$64.00</td>
                                                    <td>
                                                        <span className="badge badge-success">Shipped</span>
                                                    </td>
                                                    <td>10/07/2017</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">Best Sellers</div>
                                    </div>
                                    <div className="ibox-body">
                                        <ul className="media-list media-list-divider m-0">
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img src="./assets/img/image.jpg" width="50px;" />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">
                                                        <a href="javascript:;">Samsung</a>
                                                        <span className="font-16 float-right">1200</span>
                                                    </div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text.</div>
                                                </div>
                                            </li>
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img src="./assets/img/image.jpg" width="50px;" />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">
                                                        <a href="javascript:;">iPhone</a>
                                                        <span className="font-16 float-right">1150</span>
                                                    </div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text.</div>
                                                </div>
                                            </li>
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img src="./assets/img/image.jpg" width="50px;" />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">
                                                        <a href="javascript:;">iMac</a>
                                                        <span className="font-16 float-right">800</span>
                                                    </div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text.</div>
                                                </div>
                                            </li>
                                            <li className="media">
                                                <a className="media-img" href="javascript:;">
                                                    <img src="./assets/img/image.jpg" width="50px;" />
                                                </a>
                                                <div className="media-body">
                                                    <div className="media-heading">
                                                        <a href="javascript:;">apple Watch</a>
                                                        <span className="font-16 float-right">705</span>
                                                    </div>
                                                    <div className="font-13">Lorem Ipsum is simply dummy text.</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="ibox-footer text-center">
                                        <a href="javascript:;">View All Products</a>
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