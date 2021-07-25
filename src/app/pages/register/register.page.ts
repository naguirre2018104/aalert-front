import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user';
import { NgForm } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userRegister: UserRegister = null;

  constructor(private restUser: RestUserService, private toastController: ToastController, private navController: NavController) {
    this.userRegister = {
      name: '',
      lastname: '',
      username: '',
      password: '',
      age: null,
      dpi: '',
      status: true,
      role: 'ROLE_CLIENT',
      phone: null
    };
  }

  ngOnInit() {
  }

  async onSubmit(register: NgForm){
    console.log(this.userRegister);
    let value = await this.restUser.register(this.userRegister);

    if(value){
      this.presentToast("Usuario creado correctamente", "success")
      .then(() => {
        register.reset();
        this.navController.navigateRoot("/");
      })
    }else {
      this.presentToast("Ocurrio un error.", "danger");
    }

  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: "top"
    });
    toast.present();
  }

}
