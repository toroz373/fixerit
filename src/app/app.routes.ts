import { Routes } from '@angular/router';

export const routes: Routes = [

  // Redirección por defecto al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login')
        .then(c => c.Login)
  },

  // USUARIO
  {
    path: 'usuario',
    loadComponent: () =>
      import('./features/usuario/usuario/usuario')
        .then(c => c.Usuario)
  },

  // INFORMÁTICO
  {
    path: 'informatico',
    loadComponent: () =>
      import('./features/informatico/informatico/informatico')
        .then(c => c.Informatico)
  },

  // EMPRESA
  {
    path: 'empresa',
    loadComponent: () =>
      import('./features/empresa/empresa/empresa')
        .then(c => c.Empresa)
  }

];
