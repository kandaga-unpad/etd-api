import { Hono } from "hono";

const api = new Hono();

api.get("/", (c) => {
  return c.json({
    // swagger: "2.0",
    // title: "ETD Unpad Harvesting API",
    // host: "localhost:4233",
    // basePath: "/api",
    // schemes: ["http", "https"],
    openapi: "3.1.0",
    info: {
      title: "ETD Unpad Harvesting API",
      version: "0.0.1",
    },
    servers: [
      {
        url: "http://localhost:4233/api",
        description: "Development Mode",
      },
      {
        url: "https://kandaga.unpad.ac.id:4233/api",
        description: "Production Mode",
      },
    ],
    paths: {
      "/etd/individu/{npm}": {
        get: {
          tags: ["Metadata ETD Unpad"],
          summary: "Endpoint of Individual ETD",
          description:
            "Get Data of Individual ETD based on NPM of each students",
          parameters: [
            {
              name: "npm",
              description: "unique number (NPM) of each students",
              in: "path",
              required: true,
              type: "string",
              example: "210210160084",
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Get the Listed Data of Individual ETD",
            },
          },
        },
      },
      "/etd/fakultas/{kode_fakultas}": {
        get: {
          tags: ["Metadata ETD Unpad"],
          summary: "Mendapatkan Data ETD Fakultas",
          description:
            "Data ETD per Fakultas yang menggunakan parameter nilai singkatan dari setiap fakultas. Contoh: feb, fh, fk, fikom dst.",
          parameters: [
            {
              name: "kode_fakultas",
              description: "singkatan unik dari setiap fakultas",
              in: "path",
              required: true,
              type: "string",
              example: "fikom",
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Mendapatkan Data ETD Per Fakultas",
            },
          },
        },
      },
      "/etd/prodi/{kode_prodi}": {
        get: {
          tags: ["Metadata ETD Unpad"],
          summary: "Mendapatkan Data ETD per Program Studi",
          description:
            "Data ETD per Program Studi yang menggunakan parameter nilai kode dari program studi. Contoh: 110110 untuk S1 Hukum, 120110 untuk S2 Akuntansi dst.",
          parameters: [
            {
              name: "kode_prodi",
              description: "kode unik prodi yang biasanya tercantum dalam NPM",
              in: "path",
              required: true,
              type: "string",
              example: "210210",
            },
            {
              name: "limit",
              description: "batas data dari program",
              in: "query",
              required: false,
              type: "integer",
              example: 5,
            },
            {
              name: "page",
              description:
                "halaman dari limit yang sudah ditentukan mulai dari 0",
              in: "query",
              required: false,
              type: "integer",
              example: 0,
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description:
                "Mendapatkan Data ETD Per Program Studi (default 5 item)",
            },
            404: {
              description: "Data tidak ditemukan",
            },
          },
        },
      },
      "/unggah-mandiri/login": {
        get: {
          tags: ["Credential DSpace"],
          summary: "Melakukan prosedur login",
          description:
            "API untuk login agar bisa mendapatkan JWT Token dan Cookie",
          produces: ["application/json"],
          responses: {
            200: {
              description:
                "Merlakukan prosedur Login ke DSpace, JWT Token akan didapatkan ketika mengakses halaman /api/unggah-mandiri/status",
            },
          },
        },
      },
      "/unggah-mandiri/status": {
        get: {
          tags: ["Credential DSpace"],
          summary: "Mendapatkan JWT Token dan Cookie",
          description:
            "API untuk mendapatkan cookie dan JWT sebagai credential untuk melakukan operasi post ETD melalui POST Request ke /api/unggah-mandiri",
          produces: ["application/json"],
          responses: {
            200: {
              description:
                "Merlakukan prosedur Login ke DSpace, JWT Token akan didapatkan ketika mengakses halaman /api/unggah-mandiri/status",
            },
            403: {
              description: "Gagal Autentikasi karena expired atau belum login",
            },
          },
        },
      },
      "/unggah-mandiri": {
        post: {
          tags: ["Upload to Dspace"],
          summary: "Mengunggah koleksi yang sudah ada di SIAT ke DSpace",
          description:
            "API permintaan POST untuk mengunggah koleksi yang sudah diapprove oleh pihak terkait ke Repository Kandaga",
          requestBody: {
            description:
              "Daftar Request Body yg diperlukan oleh API ini untuk diunggah ke DSpace",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Etd",
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Etd: {
          type: "object",
          properties: {
            result: {
              type: "object",
              properties: {
                metadata: {
                  type: "object",
                  properties: {
                    idControl: {
                      type: "integer",
                      example: 47401,
                    },
                    fakultas: {
                      type: "string",
                      example: "Ilmu Komunikasi",
                    },
                    kodeProdi: {
                      type: "string",
                      example: "210810",
                    },
                    programStudi: {
                      type: "string",
                      example: "Perpustakaan dan Sains Informasi",
                    },
                    jenjang: {
                      type: "string",
                      example: "Sarjana",
                    },
                    jenis: {
                      type: "string",
                      example: "Skripsi",
                    },
                    npm: {
                      type: "string",
                      example: "210210160084",
                    },
                    author: {
                      type: "string",
                      example: "CHRISNA ADHI PRANOTO",
                    },
                    tglUpload: {
                      type: "string",
                      example: "2021-03-08 21:51:04",
                    },
                    tahun: {
                      type: "integer",
                      example: 2021,
                    },
                    stPublikasi: {
                      type: "integer",
                      example: 1,
                    },
                    idRepoLama: {
                      type: "integer",
                      example: 43124,
                    },
                    status: {
                      type: "string",
                      example: "Lulus",
                    },
                    linkPath: {
                      type: "string",
                      example:
                        "https://repository.unpad.ac.id/thesis/210210/2016/",
                    },
                    fileCover: {
                      type: "string",
                      example: "210210160084_c_5413.pdf",
                    },
                    fileAbstrak: {
                      type: "string",
                      example: "210210160084_a_2592.pdf",
                    },
                    fileDaftarIsi: {
                      type: "string",
                      example: "210210160084_d_5831.pdf",
                    },
                    fileBab1: {
                      type: "string",
                      example: "210210160084_1_8741.pdf",
                    },
                    fileBab2: {
                      type: "string",
                      example: "210210160084_2_4731.pdf",
                    },
                    fileBab3: {
                      type: "string",
                      example: "210210160084_3_4632.pdf",
                    },
                    fileBab4: {
                      type: "string",
                      example: "210210160084_4_2878.pdf",
                    },
                    fileBab5: {
                      type: "string",
                      example: "210210160084_5_1961.pdf",
                    },
                    fileBab6: {
                      type: "string",
                      example: "",
                    },
                    fileLampiran: {
                      type: "string",
                      example: "210210160084_l_3377.pdf",
                    },
                    filePustaka: {
                      type: "string",
                      example: "210210160084_k_2588.pdf",
                    },
                    fileSurat: {
                      type: "string",
                      example: "210210160084_s_4206.pdf",
                    },
                    fileSuratIsi: {
                      type: "string",
                      example: "210210160084_i_8771.pdf",
                    },
                    filePengesahan: {
                      type: "string",
                      example: "210210160084_s_5513.pdf",
                    },
                    judul: {
                      type: "string",
                      example:
                        "RANCANG BANGUN MEDIA INFORMASI UNTUK PERPUSTAKAAN PUSAT UNIVERSITAS PADJADJARAN:Studi Kaji Tindak (Action Research) Rancang Bangun Media Sosial & Website di Perpustakaan Pusat Universitas Padjadjaran",
                    },
                    abstrak: {
                      type: "string",
                      example:
                        "Perpustakaan merupakan sebuah lembaga yang menjadi pusat dari sumber bahan pustaka ilmiah dan informasi, sehingga sudah menjadi hal yang sangat penting bagi Perpustakaan untuk memiliki media informasi yang sangat adaptif dan efektif untuk digunakan dalam proses diseminasi dan publikasi informasi. Perpustakaan Pusat UNPAD memiliki beberapa saluran media informasi namun belum dimanfaatkan secara maksimal. Maka dari itu penulis menyusun penelitian ini dengan metode kaji tindak, yang dimana penulis langsung berpartisipasi secara aktif merancang dan membangun media informasi yang diperlukan serta dapat dimanfaatkan oleh Perpustakaan Pusat UNPAD untuk menunjang kegiatan layanan perpustakaan. Proses perancangan yang dilakukan memanfaatkan beberapa teori media informasi yang menitiberatkan pada konsep pemilihan media populer yang paling banyak digunakan oleh masyarakat dan alur kerja yang dinamis serta integratif untuk pengelola agar dapat memenuhi kegiatan operasional layanan perpustakaan. Media yang dipilih dan digunakan adalah Media Sosial (LINE, Intagram dan Twitter) serta Situs Web berbasis Wordpress dan LiveChat. Membangun Media Informasi yang komprehensif dan dapat digunakan dalam jangka waktu yang panjang membutuhkan waktu serta proses kebijakan yang ketat dalam hal pengoperasiannya, sehingga diperlukan kerjasama dari berbagai pihak agar proses publikasi dan diseminasi informasi dapat dilakukan dengan baik dan tepat sasaran.",
                    },
                    title: {
                      type: "string",
                      example:
                        "RANCANG BANGUN MEDIA INFORMASI UNTUK PERPUSTAKAAN PUSAT UNIVERSITAS PADJADJARAN:Studi Kaji Tindak (Action Research) Rancang Bangun Media Sosial & Website di Perpustakaan Pusat Universitas Padjadjaran",
                    },
                    abstract: {
                      type: "string",
                      example:
                        "Perpustakaan merupakan sebuah lembaga yang menjadi pusat dari sumber bahan pustaka ilmiah dan informasi, sehingga sudah menjadi hal yang sangat penting bagi Perpustakaan untuk memiliki media informasi yang sangat adaptif dan efektif untuk digunakan dalam proses diseminasi dan publikasi informasi. Perpustakaan Pusat UNPAD memiliki beberapa saluran media informasi namun belum dimanfaatkan secara maksimal. Maka dari itu penulis menyusun penelitian ini dengan metode kaji tindak, yang dimana penulis langsung berpartisipasi secara aktif merancang dan membangun media informasi yang diperlukan serta dapat dimanfaatkan oleh Perpustakaan Pusat UNPAD untuk menunjang kegiatan layanan perpustakaan. Proses perancangan yang dilakukan memanfaatkan beberapa teori media informasi yang menitiberatkan pada konsep pemilihan media populer yang paling banyak digunakan oleh masyarakat dan alur kerja yang dinamis serta integratif untuk pengelola agar dapat memenuhi kegiatan operasional layanan perpustakaan. Media yang dipilih dan digunakan adalah Media Sosial (LINE, Intagram dan Twitter) serta Situs Web berbasis Wordpress dan LiveChat. Membangun Media Informasi yang komprehensif dan dapat digunakan dalam jangka waktu yang panjang membutuhkan waktu serta proses kebijakan yang ketat dalam hal pengoperasiannya, sehingga diperlukan kerjasama dari berbagai pihak agar proses publikasi dan diseminasi informasi dapat dilakukan dengan baik dan tepat sasaran.",
                    },
                    keywords: {
                      type: "string",
                      example:
                        "Media Informasi, Pengembangan Media, Layanan Perpustakaan Digital",
                    },
                  },
                },
                pembimbing: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      npm: {
                        type: "string",
                        example: "210210160084",
                      },
                      namaMahasiswa: {
                        type: "string",
                        example: "CHRISNA ADHI PRANOTO",
                      },
                      kodeDosenPembimbing: {
                        type: "string",
                        example: "K03A10019",
                      },
                      namaDosen: {
                        type: "string",
                        example: "Edwin Rizal",
                      },
                      nidnDosen: {
                        type: "string",
                        example: "0008016801",
                      },
                      pembimbingKetua: {
                        type: "integer",
                        example: 1,
                      },
                    },
                  },
                },
                penguji: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      npm: {
                        type: "string",
                        example: "210210160084",
                      },
                      namaMahasiswa: {
                        type: "string",
                        example: "CHRISNA ADHI PRANOTO",
                      },
                      kodeDosenPembimbing: {
                        type: "string",
                        example: "K03A10019",
                      },
                      namaDosen: {
                        type: "string",
                        example: "Edwin Rizal",
                      },
                      nidnDosen: {
                        type: "string",
                        example: "0008016801",
                      },
                      pembimbingKetua: {
                        type: "integer",
                        example: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    developer: "Chrisna Adhi Pranoto",
    purposes: "Migrate Local Repository File to DSpace",
  });
});

export default api;
