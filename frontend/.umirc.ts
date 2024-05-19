import { defineConfig } from "umi";

export default defineConfig({
  npmClient: 'yarn',
  routes: [
    { path: '/login', component: 'login' },
    { path: '/register', component: 'register' },
    // {path: '/', redirect: '/login'}
    { path: "/", layout: 'index', routes: [
      { path: '/chat', component: 'chat' },
    ] },
  ],
});
