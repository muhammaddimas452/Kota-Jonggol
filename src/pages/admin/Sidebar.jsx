import React from 'react'
import './css/main.min.css'
import './css/main.css'

const Sidebar = (tombol) => {
    return (
        // <div id="sidebar" className="active">
        //     <div className="sidebar-wrapper active">
        //         <div className="sidebar-header">
        //             <div className="d-flex justify-content-between">
        //                 <div className="logo">
        //                     <a href="/dashboard"><img src="assets/images/logo/logo.png" alt="Logo" srcSet /></a>

        //                 </div>
        //                 <div className="toggler">
        //                     <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle" /></a>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="sidebar-menu">
        //             <ul className="menu">
        //                 <li className="sidebar-title">Menu</li>
        //                 <li className="sidebar-item">
        //                     <a href="/dashboard" className="sidebar-link">
        //                         <i className="bi bi-grid-fill" />
        //                         <span>Dashboard</span>
        //                     </a>
        //                 </li>
        //                 <li className="sidebar-title">Data Desa</li>
        //                 <li className="sidebar-item  ">
        //                     <a href="/artikel" className="sidebar-link">
        //                         <i className="bi bi-file-earmark-medical-fill" />
        //                         <span>Data Artikel</span>
        //                     </a>
        //                 </li>
        //                 <li className="sidebar-item  ">
        //                     <a href="/kegiatan" className="sidebar-link">
        //                         <i className="bi bi-file-earmark-medical-fill" />
        //                         <span>Data Kegiatan</span>
        //                     </a>
        //                 </li>
        //                 <li className="sidebar-item  ">
        //                     <a href="/jumlahpenduduk" className="sidebar-link">
        //                         <i className="bi bi-file-earmark-medical-fill" />
        //                         <span>Data Jumlah Penduduk</span>
        //                     </a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>

        // </div>

        <nav className={tombol === true ? "page-sidebar" : "hidden"} id="sidebar">
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



    )
}

export default Sidebar;