<template>
  <div class="row w-100 overflow-hidden" style="height: 100vh; padding: 0 !important">
    <div class="col-md-2 bg-white border-right border py-4 px-4 sidebar">
      <div class="alert alert-primary" role="alert">
        <h4>Dashboard</h4>
        <hr class="p-0 m-0" />
        <small>Kondisi Teknis</small>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <routerLink style="text-decoration: none" class="text-dark navi" to="/"> <i class="fa-solid fa-computer me-2"></i> Spektek </routerLink>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <routerLink style="text-decoration: none" class="text-dark navi" to="/konis"> <i class="fa-solid fa-laptop-medical me-2"></i>Konis </routerLink>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <routerLink style="text-decoration: none" class="text-dark navi" to="/pemin"> <i class="fa-solid fa-handshake me-2"></i>Peminjaman </routerLink>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <routerLink style="text-decoration: none" class="text-dark navi" to="/pemeliharaan"> <i class="fa-solid fa-screwdriver-wrench me-2"></i>Pemeliharaan </routerLink>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <routerLink style="text-decoration: none" class="text-dark navi" to="/perOut"> <i class="fa-solid fa-satellite-dish me-2"></i>Peralatan diluar </routerLink>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <router-link style="text-decoration: none" class="text-dark navi" to="/in"> <i class="fa-solid fa-envelope me-2"></i>Telegram Masuk </router-link>
      </div>
      <div class="alert alert-light m-0 p-3 border-bottom" role="alert">
        <router-link style="text-decoration: none" class="text-dark navi" to="/out"> <i class="fa-solid fa-envelope-open me-2"></i>Telegram Keluar </router-link>
      </div>
    </div>
    <div class="col-md-10 content" style="padding: 0 !important">
      <nav class="navbar navbar-expand-lg bg-white border-0 border-bottom px-5 d-flex align-items-center">
        <div class="container">
          <a class="navbar-brand" href="#">
            <h5>Konis<span class="fw-light">app</span></h5>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/">Home</router-link></li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <div class="d-flex">
              <h6>user <span class="mx-2">|</span> <i class="fa-solid fa-address-card"></i></h6>
            </div>
          </div>
        </div>
      </nav>

      <div class="container p-5 pt-3">
        <small class="text-muted d-inline-block mb-5" style="text-transform: capitalize !important; width: 150px">CV. JAYA MAKMUR SENTOSA ABADI JAYA</small>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.sidebar {
  height: 100vh;
  overflow-y: auto;
}

.content {
  height: 100vh;
  overflow-y: auto;
}

.navi:hover {
  color: #084298 !important;
}
</style>
