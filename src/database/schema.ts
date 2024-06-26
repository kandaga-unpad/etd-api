import {
  mysqlTable,
  int,
  tinytext,
  datetime,
  tinyint,
  longtext,
} from "drizzle-orm/mysql-core";

export const aEtdMetadata = mysqlTable("A_ETD_Metadata", {
  idControl: int("IDControl"),
  fakultas: tinytext("Fakultas"),
  kodeProdi: tinytext("KodeProdi"),
  programStudi: tinytext("ProgramStudi"),
  jenjang: tinytext("Jenjang"),
  jenis: tinytext("Jenis"),
  npm: tinytext("NPM"),
  author: tinytext("Author"),
  tglUpload: datetime("TglUpload", { mode: "string" }),
  tahun: int("Tahun"),
  stPublikasi: tinyint("stPublikasi"),
  idRepoLama: int("IDRepoLama"),
  status: tinytext("Status"),
  linkPath: tinytext("LinkPath"),
  fileCover: tinytext("FileCover"),
  fileAbstrak: tinytext("FileAbstrak"),
  fileDaftarIsi: tinytext("FileDaftarIsi"),
  fileBab1: tinytext("FileBab1"),
  fileBab2: tinytext("FileBab2"),
  fileBab3: tinytext("FileBab3"),
  fileBab4: tinytext("FileBab4"),
  fileBab5: tinytext("FileBab5"),
  fileBab6: tinytext("FileBab6"),
  fileLampiran: tinytext("FileLampiran"),
  filePustaka: tinytext("FilePustaka"),
  fileSurat: tinytext("FileSurat"),
  fileSuratIsi: tinytext("FileSuratIsi"),
  filePengesahan: tinytext("FilePengesahan"),
  judul: longtext("Judul"),
  abstrak: longtext("Abstrak"),
  title: longtext("Title"),
  abstract: longtext("Abstract"),
  keywords: tinytext("Keywords"),
});

export const aEtdPembimbing = mysqlTable("A_ETD_Pembimbing", {
  npm: tinytext("NPM"),
  namaMahasiswa: tinytext("NamaMahasiswa"),
  kodeDosenPembimbing: tinytext("KodeDosenPembimbing"),
  namaDosen: tinytext("NamaDosen"),
  nidnDosen: tinytext("NIDNDosen"),
  pembimbingKetua: tinyint("PembimbingKetua"),
});

export const aEtdPenguji = mysqlTable("A_ETD_Penguji", {
  npm: tinytext("NPM"),
  namaMahasiswa: tinytext("NamaMahasiswa"),
  kodeDosenPenguji: tinytext("KodeDosenPenguji"),
  namaDosenPenguji: tinytext("NamaDosenPenguji"),
  dosenNidn: tinytext("DosenNIDN"),
  pengujiKetua: tinyint("PengujiKetua"),
});
