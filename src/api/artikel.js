import axios from './axiosClient'

export function tambahArtikel(value){
    return axios.post('/artikel/add', {
        nama_artikel: value.nama_artikel,
        isi_artikel: value.isi_artikel.value
    })
}