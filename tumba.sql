+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| username | varchar(100) | NO   | UNI | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DESC user;


DECLARE @nilai INT = 75;

IF (@nilai >= 80)
    PRINT 'Lulus dengan predikat A';
ELSE IF (@nilai >= 70)
    PRINT 'Lulus dengan predikat B';
ELSE IF (@nilai >= 60)
    PRINT 'Lulus dengan predikat C';
ELSE
    PRINT 'Tidak lulus';


DECLARE @i INT = 1;

WHILE @i <= 5
BEGIN
    PRINT 'Angka: ' + CAST(@i AS VARCHAR(10));
    SET @i = @i + 1;
END;


INSERT INTO Mahasiswa (npm, nama, kelas, jurusan)
VALUES ('12345678', 'Ferdy', 'A1', 'Informatika');

INSERT INTO LogAktivitas (npm, aktivitas, waktu)
VALUES ('12345678', 'Tambah Data Mahasiswa', GETDATE());

DECLARE @status VARCHAR(10);
SET @status = CASE WHEN 'A1' LIKE 'A%' THEN 'Aktif' ELSE 'Nonaktif' END;

UPDATE Mahasiswa
SET status = @status
WHERE npm = '12345678';



CREATE PROCEDURE TambahMahasiswa
    @npm VARCHAR(8),
    @nama VARCHAR(50),
    @kelas VARCHAR(5),
    @jurusan VARCHAR(30)
AS
BEGIN
    INSERT INTO Mahasiswa (npm, nama, kelas, jurusan)
    VALUES (@npm, @nama, @kelas, @jurusan);

    INSERT INTO LogAktivitas (npm, aktivitas, waktu)
    VALUES (@npm, 'Tambah Data Mahasiswa', GETDATE());

    DECLARE @status VARCHAR(10);
    SET @status = CASE WHEN @kelas LIKE 'A%' THEN 'Aktif' ELSE 'Nonaktif' END;

    UPDATE Mahasiswa
    SET status = @status
    WHERE npm = @npm;
END;



EXEC TambahMahasiswa '12345678', 'Ferdy', 'A1', 'Informatika';



+-----+--------------+--------+-------------+
| NPM | Nama         | Kelas  | Jurusan     |
+-----+--------------+--------+-------------+
| 001 | Andi         | A1     | TI          |
| 002 | Nasir        | B1     | SI          |
| 003 | Cika         | A2     | TI          |
| ... | ...          | ...    | ...         |
| 799 | Perdi        | C2     | MI          |
| 800 | Nad          | A3     | SI          | <– data yang dicari
| ... | ...          | ...    | ...         |
| 1500| Zaki         | B3     | SI          |
+-----+--------------+--------+-------------+


SELECT * FROM Mahasiswa WHERE Nama = 'Nad';


Index Nama (terurut):
--------------------------------
A -> baris 1
B -> baris 2
C -> baris 3
...
L --> baris 799
Nad --> baris 800   <– langsung ketemu!
Z -> baris 1500


SELECT * FROM Mahasiswa WHERE Nama = 'Nadhil';



CREATE TABLE Articles (
    Id INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    ImagePath NVARCHAR(255) NOT NULL,
    UserId INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT PK_Articles PRIMARY KEY (Id),
    CONSTRAINT FK_Articles_Users_UserId FOREIGN KEY (UserId) REFERENCES Users(Id)
);
