USE master;

DROP DATABASE pert6_coba;

ALTER DATABASE pert6_coba 
SET SINGLE_USER 
WITH ROLLBACK IMMEDIATE; 

-- 2. Baru di-drop
DROP DATABASE pert6_coba;
CREATE DATABASE pert6_coba

USE pert6_coba;

--1
DECLARE @sisi FLOAT; 
DECLARE @luasPersegi FLOAT; 

SET @sisi = 8.5;
SET @luasPersegi = @sisi * @sisi;
PRINT 'Luas persegi dengan sisi ' + CAST(@sisi AS VARCHAR) + ' adalah ' + CAST(@luasPersegi AS VARCHAR);

DROP PROCEDURE TambahData;
DROP TABLE Mahasiswa;

--2
--a
CREATE PROCEDURE TambahData
    @npm VARCHAR(8),
    @nama VARCHAR(50),
    @kelas VARCHAR(5),
    @jurusan VARCHAR(30)
AS
BEGIN
    -- Insert data ke tabel Mahasiswa
    INSERT INTO Mahasiswa (npm, nama, kelas, jurusan)
    VALUES (@npm, @nama, @kelas, @jurusan);
    
    -- Konfirmasi data berhasil dimasukkan
    PRINT 'Data Mahasiswa berhasil ditambahkan!';
END;

--b
CREATE TABLE Mahasiswa (
    npm VARCHAR(8) PRIMARY KEY,
    nama VARCHAR(50),
    kelas VARCHAR(5),
    jurusan VARCHAR(30)
);

--c
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

--d
SELECT * FROM Mahasiswa;


--3
CREATE CLUSTERED INDEX IDX_Mahasiswa_Nama
ON Mahasiswa (Nama);
EXEC sp_helpindex 'Mahasiswa';

--pasti bakal error karena udah ada PK di tabel Mahasiswa
--kita cek constraint PK di tabel mahasiswa apakah benar udah ada clustered index-nya?
SELECT
	constraint_name,
	constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'Mahasiswa';

--hapus constraint PK table mahasiswa
ALTER TABLE mahasiswa
DROP CONSTRAINT PK__Mahasisw__DF90E5C9396865DF;

--kita buat lagi clustered index nya
CREATE CLUSTERED INDEX IDX_Mahasiswa_Nama
ON Mahasiswa (Nama);
--terus kita cek lagi udah ada atau engga si index nya
EXEC sp_helpindex 'Mahasiswa';


--4
CREATE NONCLUSTERED INDEX IDX_Mahasiswa_Jurusan
ON Mahasiswa (JURUSAN);
EXEC sp_helpindex 'Mahasiswa';



--Query Tambahan (FYI)
CREATE TABLE Mahasiswa (
    NPM VARCHAR(8) PRIMARY KEY,
	-- Membuat Clustered index pada kolom Nama (SQL Server 2022 ke atas)
    Nama VARCHAR(50) INDEX IDX_Mahasiswa_Nama CLUSTERED,
    Kelas VARCHAR(5) NOT NULL,
	-- Membuat Non-Clustered index pada kolom Jurusan (SQL Server 2022 ke atas)
    Jurusan VARCHAR(30) INDEX IDX_Mahasiswa_Jurusan NONCLUSTERED
);
EXEC sp_helpindex 'Mahasiswa';