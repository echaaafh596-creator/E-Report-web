//menentukan nama tempat data disimpan di localStorage
const KUNCI_STORAGE = 'E-REPORT_DATA'

// variabel global untuk menyimpan data laporan
let daftarLaporan = [];

// function muat data dieksekusi ketika halaman html selesai dimuat
document.addEventListener('DOMContentLoaded', muatData());

// read => mengambil data dari data.js
function muatData() {
    daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
    // console.log(daftarLaporan);
    tampilkanDataTabel();
}

// menampilkan data ke halaman web
function tampilkanDataTabel() {
    const tabelBody = document.getElementById('reports-table-body');

    // memastikan tabel body kosong
    tabelBody.innerHTML = '';

    // menampilkan baris data
    daftarLaporan.forEach((laporan) => {
        tabelBody.appendChild(buatBarisLaporan(laporan));
    })
}

// membuat satu baris <tr> untuk satu laporan
function buatBarisLaporan(laporan) {
    const baris = document.createElement('tr')

    baris.innerHTML = `
    <td class="cell-reporter">
        <span class="reporter-badge">${laporan.pelapor}</span>
    </td>
    <td class="cell-category">
        ${laporan.kategori}
    </td>
    <td class="cell-content">
        ${laporan.deskripsi}
    </td>
    <td><span class="status waiting">${laporan.status}</span></td>
    <td class="actions">
        <button class="done-btn">Selesai</button>
        <button class="delete-btn">Hapus</button>
    </td>
    `
    return baris;
}

// 3. Create => menambahkan data laporan baru

function handelFormSubmit(event) {

    event.preventDefault(); //untuk mencegah halaman ke refresh
    // mengambil isi form
    const form = event.target;
    const nama = form.reporter.value.trim();
    const kategori = form.category.value;
    const deskripsi = form.description.value.trim();

    // pengecekan value (validasi) => mengecek apakah semua input terisi
    if (!nama || !kategori || !deskripsi) {
        return console.log("Mohon lengkapi semua data!");
    }

    // membuat objek laporan baru
    const laporanBaru = {
        id: `rep-${Date.now()}`, //id untuk berdasarkan waktu saat ini
        pelapor: nama,
        kategori: kategori,
        deskripsi: deskripsi,
        status: 'Menunggu',
    }

    //menambahkan laporan baru ke data lama
    daftarLaporan.unshift(laporanBaru);
    //menyimpan ke dalam local storage
    simpanData();
    tampilkanDataTabel();

    // mengosongkan form 
    form.reset()

    // sweet alert
    Swal.fire({
        title: "Laporan sudah terkirim!",
        icon: "success",
        draggable: true
    });

}

// proses menyimpan data ke local storage
function simpanData() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarLaporan));
}
