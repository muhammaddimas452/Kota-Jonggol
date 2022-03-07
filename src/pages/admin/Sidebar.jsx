import React from 'react'
import './css/main.min.css'
import './css/main.css'

const Sidebar = (tombol) => {
    return (
        <nav className="page-sidebar" id="sidebar">
            <div id="sidebar-collapse">
                <div className="admin-block d-flex">
                    <div>
                        <img src="./assets/img/logo/jonggol.png" width="45px" />
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



    )
}

export default Sidebar;