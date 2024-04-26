import fs from "fs";

const dummyObject = {
  result: {
    metadata: {
      idControl: 47401,
      fakultas: "Ilmu Komunikasi",
      kodeProdi: "210810",
      programStudi: "Perpustakaan dan Sains Informasi",
      jenjang: "Sarjana",
      jenis: "Skripsi",
      npm: "210210160084",
      author: "CHRISNA ADHI PRANOTO",
      tglUpload: "2021-03-08 21:51:04",
      tahun: 2021,
      stPublikasi: 1,
      idRepoLama: 43124,
      status: "Lulus",
      linkPath: "https://repository.unpad.ac.id/thesis/210210/2016/",
      fileCover: "210210160084_c_5413.pdf",
      fileAbstrak: "210210160084_a_2592.pdf",
      fileDaftarIsi: "210210160084_d_5831.pdf",
      fileBab1: "210210160084_1_8741.pdf",
      fileBab2: "210210160084_2_4731.pdf",
      fileBab3: "210210160084_3_4632.pdf",
      fileBab4: "210210160084_4_2878.pdf",
      fileBab5: "210210160084_5_1961.pdf",
      fileBab6: null,
      fileLampiran: "210210160084_l_3377.pdf",
      filePustaka: "210210160084_k_2588.pdf",
      fileSurat: "210210160084_s_4206.pdf",
      fileSuratIsi: "210210160084_i_8771.pdf",
      filePengesahan: null,
      judul:
        "RANCANG BANGUN MEDIA INFORMASI UNTUK PERPUSTAKAAN PUSAT UNIVERSITAS PADJADJARAN:Studi Kaji Tindak (Action Research) Rancang Bangun Media Sosial & Website di Perpustakaan Pusat Universitas Padjadjaran",
      abstrak:
        "Perpustakaan merupakan sebuah lembaga yang menjadi pusat dari sumber bahan pustaka ilmiah dan informasi, sehingga sudah menjadi hal yang sangat penting bagi Perpustakaan untuk memiliki media informasi yang sangat adaptif dan efektif untuk digunakan dalam proses diseminasi dan publikasi informasi. Perpustakaan Pusat UNPAD memiliki beberapa saluran media informasi namun belum dimanfaatkan secara maksimal. Maka dari itu penulis menyusun penelitian ini dengan metode kaji tindak, yang dimana penulis langsung berpartisipasi secara aktif merancang dan membangun media informasi yang diperlukan serta dapat dimanfaatkan oleh Perpustakaan Pusat UNPAD untuk menunjang kegiatan layanan perpustakaan. Proses perancangan yang dilakukan memanfaatkan beberapa teori media informasi yang menitiberatkan pada konsep pemilihan media populer yang paling banyak digunakan oleh masyarakat dan alur kerja yang dinamis serta integratif untuk pengelola agar dapat memenuhi kegiatan operasional layanan perpustakaan. Media yang dipilih dan digunakan adalah Media Sosial (LINE, Intagram dan Twitter) serta Situs Web berbasis Wordpress dan LiveChat. Membangun Media Informasi yang komprehensif dan dapat digunakan dalam jangka waktu yang panjang membutuhkan waktu serta proses kebijakan yang ketat dalam hal pengoperasiannya, sehingga diperlukan kerjasama dari berbagai pihak agar proses publikasi dan diseminasi informasi dapat dilakukan dengan baik dan tepat sasaran.",
      title:
        "RANCANG BANGUN MEDIA INFORMASI UNTUK PERPUSTAKAAN PUSAT UNIVERSITAS PADJADJARAN:Studi Kaji Tindak (Action Research) Rancang Bangun Media Sosial & Website di Perpustakaan Pusat Universitas Padjadjaran",
      abstract:
        "Perpustakaan merupakan sebuah lembaga yang menjadi pusat dari sumber bahan pustaka ilmiah dan informasi, sehingga sudah menjadi hal yang sangat penting bagi Perpustakaan untuk memiliki media informasi yang sangat adaptif dan efektif untuk digunakan dalam proses diseminasi dan publikasi informasi. Perpustakaan Pusat UNPAD memiliki beberapa saluran media informasi namun belum dimanfaatkan secara maksimal. Maka dari itu penulis menyusun penelitian ini dengan metode kaji tindak, yang dimana penulis langsung berpartisipasi secara aktif merancang dan membangun media informasi yang diperlukan serta dapat dimanfaatkan oleh Perpustakaan Pusat UNPAD untuk menunjang kegiatan layanan perpustakaan. Proses perancangan yang dilakukan memanfaatkan beberapa teori media informasi yang menitiberatkan pada konsep pemilihan media populer yang paling banyak digunakan oleh masyarakat dan alur kerja yang dinamis serta integratif untuk pengelola agar dapat memenuhi kegiatan operasional layanan perpustakaan. Media yang dipilih dan digunakan adalah Media Sosial (LINE, Intagram dan Twitter) serta Situs Web berbasis Wordpress dan LiveChat. Membangun Media Informasi yang komprehensif dan dapat digunakan dalam jangka waktu yang panjang membutuhkan waktu serta proses kebijakan yang ketat dalam hal pengoperasiannya, sehingga diperlukan kerjasama dari berbagai pihak agar proses publikasi dan diseminasi informasi dapat dilakukan dengan baik dan tepat sasaran.",
      keywords:
        "Media Informasi, Pengembangan Media, Layanan Perpustakaan Digital",
    },
    pembimbing: [
      {
        npm: "210210160084",
        namaMahasiswa: "CHRISNA ADHI PRANOTO",
        kodeDosenPembimbing: "K03A10019",
        namaDosen: "Edwin Rizal ",
        nidnDosen: "0008016801",
        pembimbingKetua: 1,
      },
      {
        npm: "210210160084",
        namaMahasiswa: "CHRISNA ADHI PRANOTO",
        kodeDosenPembimbing: "K03A10037",
        namaDosen: "Rully Khairul Anwar ",
        nidnDosen: "0024027504",
        pembimbingKetua: 0,
      },
    ],
    penguji: [
      {
        npm: "210210160084",
        namaMahasiswa: "CHRISNA ADHI PRANOTO",
        kodeDosenPenguji: "K03A10019",
        namaDosenPenguji: "Edwin Rizal ",
        dosenNidn: "0008016801",
        pengujiKetua: 1,
      },
    ],
  },
};

async function downloadFile(
  file: string,
  objName: string,
  path: string,
  metadata: any
) {
  const fileName = `${
    metadata.jenjang === "Sarjana"
      ? "S1"
      : metadata.jenjang === "Magister"
      ? "S2"
      : metadata.jenjang === "Doktor"
      ? "S3"
      : metadata.jenjang === "Spesialis-1"
      ? "SPESIALIS"
      : metadata.jenjang === "Subspesialis"
      ? "SUBSPESIALIS"
      : metadata.jenjang === "Diploma III"
      ? "DIPLOMA"
      : metadata.jenjang === "Diploma IV"
      ? "DIPLOMA"
      : "Unpad"
  }-${metadata.tahun}-${metadata.npm}-${objName.replace("file", "")}.pdf`;

  const buildUrl = metadata.linkPath + file;
  const getFile = await fetch(buildUrl);

  if (getFile.ok && getFile.body) {
    console.log("Writing to file: ", fileName);
    const downloadWriteStream = fs.createWriteStream(path + fileName);
    const stream = new WritableStream({
      write(chunk) {
        downloadWriteStream.write(chunk);
      },
    });
    const body = getFile.body;
    await body.pipeTo(stream);
    console.log(`File ${fileName} downloaded to ${path}`);
  }

  return fileName;
}

async function createWorkspaceItems(
  cookie: { token: string; dspace: string },
  collection: number | undefined
) {
  const getCollection = await fetch(
    "https://repository.unpad.ac.id/server/api/submission/workspaceitems?owningCollection=" +
      String(collection),
    {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        Accept: "*/*",
        Authorization: "Bearer " + cookie.token,
        "X-XSRF-TOKEN": cookie.dspace,
        "Content-Type": "application/json",
      }),
    }
  );
  const response = await getCollection.json();
  return response?._data?.id;
}

async function postMetadata(cookie: string, object: Record<string, any>) {
  console.log(cookie);
  const individualData = object.result.metadata;
  const addingMetadata = {
    author: individualData.author,
  };

  let fileList: string[] = [];

  for (const listData in individualData) {
    if (listData.includes("file")) {
      if (individualData[listData] !== null) {
        const fileName = await downloadFile(
          individualData[listData],
          listData,
          `./tmp/`,
          individualData
        );
        fileList.push(fileName);
      }
    }
  }

  for (const file of fileList) {
    console.log(fs.existsSync("./tmp/" + file) ? "Exists" : "Doesn't Exists");
    if (fs.existsSync("./tmp/" + file)) {
      const formData = new FormData();
      formData.append("file", "./tmp/" + file);

      await fetch(
        "https://repository.unpad.ac.id/server/api/submission/workspaceitems/"
      );
    }
  }
}

export { postMetadata, createWorkspaceItems, dummyObject };
