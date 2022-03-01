import React from 'react'
import './css/main.min.css'

export default function Nav({ tombol, setTombol }) {
    return (
        <div>
            <header className="header">
                <div className="page-brand">
                    <a className="link" href="index.html">
                        <span className="brand">Admin
                            <span className="brand-tip">CAST</span>
                        </span>
                        <span className="brand-mini">AC</span>
                    </a>
                </div>
                <div className="flexbox flex-1">
                    {/* START TOP-LEFT TOOLBAR*/}
                    <ul className="nav navbar-toolbar">
                        <li>
                            <a className="nav-link sidebar-toggler js-sidebar-toggler"><i className="ti-menu" /></a>
                        </li>
                        <li>
                            <form className="navbar-search" action="javascript:;">
                                <div className="rel">
                                    <span className="search-icon"><i className="ti-search" /></span>
                                    <input className="form-control" placeholder="Search here..." />
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </header>
            <nav className="page-sidebar" id="sidebar">
                <div id="sidebar-collapse">
                    <div className="admin-block d-flex">
                        <div>
                            <img src="./assets/img/admin-avatar.png" width="45px" />
                        </div>
                        <div className="admin-info">
                            <div className="font-strong">Muhammad Dimas</div><small>Admin Kota Jonggol</small></div>
                    </div>
                    <ul className="side-menu metismenu">
                        <li>
                            <a className="active" href="/dashboard"><i className="sidebar-item-icon fa fa-th-large" />
                                <span className="nav-label">Dashboard</span>
                            </a>
                        </li>
                        <li className="heading">Data Desa</li>
                        <li>
                            <a href="/artikel"><i className="sidebar-item-icon fa fa-table" />
                                <span className="nav-label">Data Artikel</span></a>
                        </li>
                        <li>
                            <a href="/jumlahpenduduk"><i className="sidebar-item-icon fa fa-table" />
                                <span className="nav-label">Jumlah Penduduk</span></a>
                        </li>
                        <li>
                            <a href="/kegiatan"><i className="sidebar-item-icon fa fa-table" />
                                <span className="nav-label">Data Kegiatan</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}