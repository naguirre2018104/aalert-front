import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardUserGuard } from './guards/guardUser/guard-user.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [GuardUserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // canLoad: [GuardUserGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/tab1'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
