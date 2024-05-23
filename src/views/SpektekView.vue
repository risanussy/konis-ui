<template>
  <div class="card p-3 shadow">
    <h5>Spektek</h5>
    <br />
    <div class="tombol">
      <button type="button" style="width: 120px" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalmasuk"><i class="fa-solid fa-file-circle-plus me-1"></i>Add Data</button>
      <button @click="exportToExcel" class="btn btn-success mb-3 ms-2">Download Excel</button>
    </div>

    <div class="modal fade" id="modalmasuk" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="submitData">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Data</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Lokasi</label>
                    <input v-model="form.lokasi" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Code Barang</label>
                    <input v-model="form.kode_barang" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Jenis Barang</label>
                    <input v-model="form.jenis_barang" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Merk</label>
                    <input v-model="form.merk" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Spesifikasi</label>
                    <input v-model="form.spesifikasi" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Jumlah</label>
                    <input v-model="form.jumlah" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Satuan</label>
                    <input v-model="form.satuan" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Kondisi</label>
                    <input v-model="form.kondisi" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Tahun</label>
                    <input v-model="form.tahun" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Asal</label>
                    <input v-model="form.asal" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Gambar</label>
                    <input @change="onFileChange" type="file" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Tanggal</label>
                    <input v-model="form.tanggal" type="date" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Dokumen</label>
                    <input v-model="form.dokumen" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Keterangan</label>
                    <textarea v-model="form.keterangan" class="form-control" rows="3"></textarea>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">QR Code</label>
                    <input v-model="form.qr_code" type="text" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Lokasi</th>
            <th scope="col">Code Barang</th>
            <th scope="col">Jenis Barang</th>
            <th scope="col">Merk</th>
            <th scope="col">Spesifikasi</th>
            <th scope="col">Jumlah</th>
            <th scope="col">Satuan</th>
            <th scope="col">Kondisi</th>
            <th scope="col">Tahun</th>
            <th scope="col">Asal</th>
            <th scope="col">Gambar</th>
            <th scope="col">Tanggal</th>
            <th scope="col">Dokumen</th>
            <th scope="col">Keterangan</th>
            <th scope="col">QR Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in spektekData" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.lokasi }}</td>
            <td>{{ item.kode_barang }}</td>
            <td>{{ item.jenis_barang }}</td>
            <td>{{ item.merk }}</td>
            <td>{{ item.spesifikasi }}</td>
            <td>{{ item.jumlah }}</td>
            <td>{{ item.satuan }}</td>
            <td>{{ item.kondisi }}</td>
            <td>{{ item.tahun }}</td>
            <td>{{ item.asal }}</td>
            <td>
              <img v-if="item.gambar" :src="'http://localhost:8000/images/' + item.gambar" alt="gambar" style="max-width: 50px; max-height: 50px" />
              <span v-else>No Image</span>
            </td>
            <td>{{ item.tanggal }}</td>
            <td>{{ item.dokumen }}</td>
            <td>{{ item.keterangan }}</td>
            <td>{{ item.qr_code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  name: "SpektekView",
  data() {
    return {
      form: {
        lokasi: "",
        kode_barang: "",
        jenis_barang: "",
        merk: "",
        spesifikasi: "",
        jumlah: "",
        satuan: "",
        kondisi: "",
        tahun: "",
        asal: "",
        gambar: null,
        tanggal: "",
        dokumen: "",
        keterangan: "",
        qr_code: "",
      },
      spektekData: [],
    };
  },
  methods: {
    async submitData() {
      try {
        const formData = new FormData();
        Object.keys(this.form).forEach((key) => {
          formData.append(key, this.form[key]);
        });
        await axios.post("http://localhost:8000/api/spektek/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.fetchData();
        this.resetForm();
        this.$refs.closeModalButton.click();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/spektek");
        this.spektekData = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    resetForm() {
      this.form = {
        lokasi: "",
        kode_barang: "",
        jenis_barang: "",
        merk: "",
        spesifikasi: "",
        jumlah: "",
        satuan: "",
        kondisi: "",
        tahun: "",
        asal: "",
        gambar: null,
        tanggal: "",
        dokumen: "",
        keterangan: "",
        qr_code: "",
      };
    },
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.spektekData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "spektek Data");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "spektek-data");
    },
    saveAsExcelFile(buffer, filename) {
      const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
      saveAs(data, `${filename}_${new Date().getTime()}.xlsx`);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
