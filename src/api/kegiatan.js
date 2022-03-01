import axios from './axiosClient'

export function tambahKegiatan(value){
    return axios.post('/kegiatan/add', {
        tanggal: value.tanggal,
        kegiatan: value.kegiatan,
        foto: value.foto,
        keterangan: value.keterangan,
    })
}