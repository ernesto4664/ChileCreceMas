import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'choice',
    loadChildren: () => import('./choice/choice.module').then(m => m.ChoicePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home-guest',
    loadChildren: () => import('./guest-home/guest-home.module').then(m => m.GuestHomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'mifamilia',
    loadChildren: () => import('./mifamilia/mifamilia.module').then( m => m.MifamiliaPageModule)
  },
  { path: 'noticia/:id', loadChildren: () => import('./noticia/noticia.module').then(m => m.NoticiaPageModule) },
  {
    path: 'noticias-all',
    loadChildren: () => import('./noticias-all/noticias-all.module').then( m => m.NoticiasAllPageModule)
  },
  {
    path: 'beneficios-all',
    loadChildren: () => import('./beneficios-all/beneficios-all.module').then( m => m.BeneficiosAllPageModule)
  },
  {
    path: 'beneficios-user',
    loadChildren: () => import('./beneficios-user/beneficios-user.module').then( m => m.BeneficiosUserPageModule)
  },
  {
    path: 'beneficio-detalle/:id',
    loadChildren: () => import('./beneficio-detalle/beneficio-detalle.module').then( m => m.BeneficioDetallePageModule)
  },
  {
    path: 'beneficio-detalle-user/:id',
    loadChildren: () => import('./beneficio-detalle-user/beneficio-detalle-user.module').then( m => m.BeneficioDetalleUserPageModule)
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}