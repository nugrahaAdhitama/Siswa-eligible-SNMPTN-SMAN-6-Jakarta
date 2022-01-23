// bikin function untuk menampilkan daftar siswa
function allStudents() {
    $.getJSON('data/siswa-eligible.json', function(data){
        let students = data.eligible
        $.each(students, function(i, data) {
            // tampilkan data siswa IPA
            $('#daftar-siswa').append(`
            <tbody id="badan-tabel">
                <tr>
                    <th scope="row">`+ data.peringkat +`</th>
                    <td>`+ data.nama +`</td>
                    <td>`+ data.kelas +`</td>
                    <td>`+ data.rata2 +`</td>
                </tr>
            </tbody>
            `);
        });
    });
}

// memanggil fungsi supaya saat halaman di klik semua daftar siswa eligible muncul
allStudents();

// atur navbar supaya class active pindah ke link yang di-klik
$('.nav-link').on('click', function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    // ganti judul
    let jurusan = $(this).html();
    $(`h1`).html(`Daftar siswa `+ jurusan +` eligible SNMPTN`);

    // cek apakah nav-link yang di-klik itu semua siswa
    if( jurusan == 'Seluruh Siswa' ) {
        $(`#daftar-siswa`).html(`
            <thead>
                <tr>
                    <th scope="col">Peringkat</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">Rata - Rata</th>
                </tr>
            </thead>
        `);
        allStudents();
        return;
    }

    // ganti tampilan kalo yang diklik jurusan IPA atau IPS
    $.getJSON('data/siswa-eligible.json', function(data){
        let students = data.eligible;
        let content = '';

        $.each(students, function(i,data){
            if( data.jurusan == jurusan ){
                content += `
                <tbody id="badan-tabel">
                    <tr>
                        <th scope="row">`+ data.peringkat +`</th>
                        <td>`+ data.nama +`</td>
                        <td>`+ data.kelas +`</td>
                        <td>`+ data.rata2 +`</td>
                    </tr>
                </tbody>
                `;
            }
        });
        $(`#daftar-siswa`).html(`
            <thead>
                <tr>
                    <th scope="col">Peringkat</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">Rata - Rata</th>
                </tr>
            </thead>

            `+ content +`
        `);
    })
});