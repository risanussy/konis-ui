import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TeleInView from "@/views/TeleInView.vue";
import TeleOutView from "@/views/TeleOutView.vue";
import SpektekView from "@/views/SpektekView.vue";
import KonisView from "@/views/KonisView.vue";
import PeminjamanView from "@/views/PeminjamanView.vue";
import PemeliharaanView from "@/views/PemeliharaanView.vue";
import PeralatanOutView from "@/views/PeralatanOutView.vue";

const routes = [
  {
    path: "/",
    name: "Spektek",
    component: SpektekView,
  },
  {
    path: "/konis",
    name: "Konis",
    component: KonisView,
  },
  {
    path: "/pemin",
    name: "Peminjaman",
    component: PeminjamanView,
  },
  {
    path: "/pemeliharaan",
    name: "Pemeliharaan",
    component: PemeliharaanView,
  },
  {
    path: "/perOut",
    name: "PeralatanOut",
    component: PeralatanOutView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/in",
    name: "TeleIn",
    component: TeleInView,
  },
  {
    path: "/out",
    name: "TeleOut",
    component: TeleOutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
