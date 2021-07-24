import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { UserLogged } from '../../interfaces/user';
import { ToastController, NavController } from '@ionic/angular';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public isReadOnly: boolean = true;
  public isButtonVisible: boolean = false;
  userLogged: UserLogged;

  constructor(private router: Router, private storage: Storage,
              private restUser: RestUserService,  private toastController: ToastController,
              private navController: NavController) {
    this.userLogged = {
      _id: '',
      name: '',
      lastname: '',
      username: '',
      password: '',
      phone: null
    }
  }

  ngOnInit(): void {
    this.isReadOnly = true;
    this.storage.get('userLogged').then((result) => {
      this.userLogged._id = result._id;
      this.userLogged.username = result.username;
      this.userLogged.name = result.name;
      this.userLogged.lastname = result.lastname;
      this.userLogged.phone = result.phone;
    });
  }


  logOut(){
    this.storage.clear();
    this.router.navigateByUrl("login");
  }

  changeButton(){
    return this.isReadOnly = !this.isReadOnly;
  }

  async update(){
    delete this.userLogged.password;
    let value = await this.restUser.modifyUser(this.userLogged, this.userLogged._id);

    if(value){
      this.presentToast("Datos actualizados correctamente", "success")
      .then(() => {
        return this.isReadOnly = !this.isReadOnly;
      })
    }else{
      this.presentToast("Ocurrio un error.", "danger");
    }
  }

  getData(){

  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000,
      color,
    });
    toast.present();
  }

}
