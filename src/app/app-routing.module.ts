import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloworldComponent } from './helloworld/helloworld.component'
import { XyzComponent } from './xyz/xyz.component'


const routes: Routes = [
  { path: '', component: XyzComponent },
  { path: 'settings', component: HelloworldComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
