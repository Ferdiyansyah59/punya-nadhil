-- praktikan(nomorbaris)
-- lepkomnewnormal

CREATE DATABASE pert6_npm
USE pert6_npm


--- 1
DECLARE @sisi FLOAT;
DECLARE @luasPersegi FLOAT;

-- ssdsd
SET @sisi = 5.8 ;
SET @luasPersegi = @sisi * @sisi;

PRINT 'Luas persegi = ' + CAST(@luasPersegi AS VARCHAR);


--- 2
-- Deklarasi variable (gausah diketik)
CREATE PROCEDURE TambahData
    @npm VARCHAR(8),
    @nama VARCHAR(100),
    @kelas VARCHAR(5),
    @jurusan VARCHAR(100)
AS
BEGIN
    -- query insert data (gausah diketik)
    INSERT INTO Mahasiswa (npm, nama, kelas, jurusan)
    VALUES(@npm, @nama, @kelas, @jurusan);

    PRINT 'Data berhasil ditambah maseee....';
END;


--- 2B
CREATE TABLE Mahasiswa (
    npm VARCHAR(8) PRIMARY KEY,
    nama VARCHAR(100),
    kelas VARCHAR(5),
    jurusan VARCHAR(100)
)


-- 2C
EXEC TambahData @npm = '10121480', @nama = 'Ferdiyansyah',
@kelas = '4KA01', @jurusan = 'Sistem Informasi';

EXEC TambahData @npm = '11122036', @nama = 'NAD PU AN',
@kelas = '4KA15', @jurusan = 'Sistem Informasi';


SELECT * FROM Mahasiswa;


EXEC TambahData @npm = '10121873', @nama = 'Muhammad Nasir', @kelas = '4KA15', @jurusan = 'Sistem Informasi';
EXEC TambahData @npm = '10122448', @nama = 'Fahar Ahnaf Aziz', @kelas = '3KA11', @jurusan = 'Sistem Informasi';
EXEC TambahData @npm = '10120677', @nama = 'Muhamad Risqi Khasani', @kelas = '4KA10', @jurusan = 'Sistem Informasi';
EXEC TambahData @npm = '51421116', @nama = 'Najya Anara Parinsi', @kelas = '4IA12', @jurusan = 'Teknik Informatika';
EXEC TambahData @npm = '50420230', @nama = 'Ariq Syahzidan', @kelas = '4IA09', @jurusan = 'Teknik Informatika';
EXEC TambahData @npm = '31122077', @nama = 'Netania Indria Wihastuti', @kelas = '3DB01', @jurusan = 'Manajemen Informatika';
EXEC TambahData @npm = '51422424', @nama = 'Reza Bayu Putra Manik', @kelas = '3IA20', @jurusan = 'Teknik Informatika';
EXEC TambahData @npm = '11122008', @nama = 'Muhammad Varrel Nuwi Zulyanno', @kelas = '3KA04', @jurusan = 'Sistem Informasi';
EXEC TambahData @npm = '10121295', @nama = 'Daffa Alfahryan Syuja Syaehu', @kelas = '4KA15', @jurusan = 'Sistem Informasi';
EXEC TambahData @npm = '10120372', @nama = 'Fadillah Achmad Siregar', @kelas = '4KA02', @jurusan = 'Sistem Informasi';


SELECT * FROM Mahasiswa;

CREATE CLUSTERED INDEX IDX_Mahasiswa_Nama
ON Mahasiswa(Nama);

EXEC sp_helpindex 'Mahasiswa'

SELECT 
    constraint_name,
    constraint_type
FROM information_schema.TABLE_CONSTRAINTS
WHERE table_name = 'Mahasiswa';





ALTER TABLE Mahasiswa
DROP CONSTRAINT IDX_Mahasiswa_Nama;


--- 3A
-- Awalnya siih saya error yaa kak, tapi kata kakak yang ganteng itu
-- error karena udah ada index dari primary key, terus pas di anuin lagi
-- akhirnya berhasil deh

-- 3B
-- Jadi karena udah ada jadi kita apus dulu tuh yang udah ada tadi
-- nah kalo udah di apus sekarang kan kosong indexnya, 
-- nah baru deh kita eksekusi lagi yang bikin index
-- dan tara.. BERHASIL


CREATE NONCLUSTERED INDEX IDX_Mahasiswa_Jurusan
ON Mahasiswa (JURUSAN);
EXEC sp_helpindex 'Mahasiswa';




