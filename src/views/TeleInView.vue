<template>
  <div class="card p-3 shadow">
    <h5>Telegram Masuk</h5>
    <br>
    <button type="button" style="width: 120px;" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalmasuk">
      <i class="fa-solid fa-file-circle-plus me-1"></i>Add Data
    </button>

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
                    <label class="form-label">Dari</label>
                    <input v-model="form.dari" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Tembusan</label>
                    <input v-model="form.tembusan" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Tanggal Masuk</label>
                    <input v-model="form.tanggal_masuk" type="date" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Jenis Telegram</label>
                    <select v-model="form.jenis_telegram" class="form-select">
                      <option value="Terbuka">Terbuka</option>
                      <option value="Tertutup">Tertutup</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Isi</label>
                    <textarea v-model="form.isi" class="form-control" rows="3"></textarea>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Kepada</label>
                    <input v-model="form.kepada" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Klasifikasi</label>
                    <input v-model="form.klasifikasi" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Nomor</label>
                    <input v-model="form.no" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Waktu Penunjukan</label>
                    <input v-model="form.tanggal_waktu_penunjukan" type="date" class="form-control">
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
            <th scope="col">Dari</th>
            <th scope="col">Kepada</th>
            <th scope="col">Tembusan</th>
            <th scope="col">Klasifikasi</th>
            <th scope="col">Jenis Telegram</th>
            <th scope="col">Nomor</th>
            <th scope="col">Waktu Penunjukan</th>
            <th scope="col">Tanggal Masuk</th>
            <th scope="col">Isi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in telegramMasukData" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.dari }}</td>
            <td>{{ item.kepada }}</td>
            <td>{{ item.tembusan }}</td>
            <td>{{ item.klasifikasi }}</td>
            <td>{{ item.jenis_telegram }}</td>
            <td>{{ item.no }}</td>
            <td>{{ item.tanggal_waktu_penunjukan }}</td>
            <td>{{ item.tanggal_masuk }}</td>
            <td>{{ item.isi }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeleInView',
  data() {
    return {
      form: {
        dari: '',
        kepada: '',
        tembusan: '',
        klasifikasi: '',
        jenis_telegram: '',
        no: '',
        tanggal_waktu_penunjukan: '',
        tanggal_masuk: '',
        isi: ''
      },
      telegramMasukData: []
    };
  },
  methods: {
    async submitData() {
      try {
        await axios.post('http://localhost:8000/api/suratMasuk/add', this.form);
        this.fetchData();
        this.resetForm();
        this.$refs.closeModalButton.click(); // Assuming there is a ref on the close button to close the modal
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/suratMasuk');
        this.telegramMasukData = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    resetForm() {
      this.form = {
        dari: '',
        kepada: '',
        tembusan: '',
        klasifikasi: '',
        jenis_telegram: '',
        no: '',
        tanggal_waktu_penunjukan: '',
        tanggal_masuk: '',
        isi: ''
      };
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
