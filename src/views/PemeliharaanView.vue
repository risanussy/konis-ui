<template>
  <div class="card p-3 shadow">
    <h5>Pemeliharaan</h5>
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
                    <label class="form-label">Tanggal</label>
                    <input v-model="form.tanggal" type="date" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Uraian</label>
                    <input v-model="form.uraian" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Dari</label>
                    <input v-model="form.dari" type="time" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Sampai</label>
                    <input v-model="form.sampai" type="time" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Durasi</label>
                    <input v-model="form.durasi" type="time" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Keterangan</label>
                    <textarea v-model="form.keterangan" class="form-control" rows="5"></textarea>
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
            <th scope="col">Tanggal</th>
            <th scope="col">Uraian</th>
            <th scope="col">Dari</th>
            <th scope="col">Sampai</th>
            <th scope="col">Durasi</th>
            <th scope="col">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pemeliharaanData" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.tanggal }}</td>
            <td>{{ item.uraian }}</td>
            <td>{{ item.dari }}</td>
            <td>{{ item.sampai }}</td>
            <td>{{ item.durasi }}</td>
            <td>{{ item.keterangan }}</td>
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
  name: "PemeliharaanView",
  data() {
    return {
      form: {
        tanggal: "",
        uraian: "",
        dari: "",
        sampai: "",
        durasi: "",
        keterangan: "",
      },
      pemeliharaanData: [],
    };
  },
  methods: {
    async submitData() {
      try {
        await axios.post("http://localhost:8000/api/pemeliharaan/add", this.form);
        this.fetchData();
        this.resetForm();
        this.$refs.closeModalButton.click(); // Assuming there is a ref on the close button to close the modal
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/pemeliharaan");
        this.pemeliharaanData = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    resetForm() {
      this.form = {
        tanggal: "",
        uraian: "",
        dari: "",
        sampai: "",
        durasi: "",
        keterangan: "",
      };
    },
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.pemeliharaanData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "pemeliharaan Data");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "pemeliharaan-data");
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
