<template>
  <div class="card p-3 shadow">
    <h5>Peminjaman</h5>
    <br />
    <button type="button" style="width: 120px" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalmasuk">
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
                    <label class="form-label">Nama Pinjaman</label>
                    <input v-model="form.nama_peminjaman" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Tanggal Pinjaman</label>
                    <input v-model="form.tanggal_peminjaman" type="date" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Tanggal Pengembalian</label>
                    <input v-model="form.tanggal_pengembalian" type="date" class="form-control" />
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
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Jumlah</label>
                    <input v-model="form.jumlah" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Nama Pinjaman</label>
                    <input v-model="form.nama_pinjaman" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Bagian</label>
                    <input v-model="form.bagian" type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Dokumen</label>
                    <input v-model="form.dokumen" type="text" class="form-control" />
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
            <th scope="col">Tgl peminjaman</th>
            <th scope="col">Tgl Pengembalian</th>
            <th scope="col">Code Barang</th>
            <th scope="col">Jenis Barang</th>
            <th scope="col">Merk</th>
            <th scope="col">Jumlah</th>
            <th scope="col">Nama peminjaman</th>
            <th scope="col">Bagian</th>
            <th scope="col">Dokumen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in peminjamanData" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.tanggal_peminjaman }}</td>
            <td>{{ item.tanggal_pengembalian }}</td>
            <td>{{ item.kode_barang }}</td>
            <td>{{ item.jenis_barang }}</td>
            <td>{{ item.merk }}</td>
            <td>{{ item.jumlah }}</td>
            <td>{{ item.nama_peminjaman }}</td>
            <td>{{ item.bagian }}</td>
            <td>{{ item.dokumen }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PeminjamanView",
  data() {
    return {
      form: {
        tanggal_peminjaman: '',
        tanggal_pengembalian: '',
        kode_barang: '',
        jenis_barang: '',
        merk: '',
        jumlah: '',
        nama_peminjaman: '',
        bagian: '',
        dokumen: ''
      },
      peminjamanData: []
    };
  },
  methods: {
    async submitData() {
      try {
        await axios.post('http://localhost:8000/api/peminjaman/add', this.form);
        this.fetchData();
        this.resetForm();
        this.$refs.closeModalButton.click(); // Assuming there is a ref on the close button to close the modal
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/peminjaman');
        this.peminjamanData = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    resetForm() {
      this.form = {
        tanggalPinjaman: '',
        tanggalPengembalian: '',
        codeBarang: '',
        jenisBarang: '',
        merk: '',
        jumlah: '',
        namaPinjaman: '',
        bagian: '',
        dokumen: ''
      };
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
