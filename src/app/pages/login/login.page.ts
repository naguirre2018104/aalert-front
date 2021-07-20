import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLogin: UserLogin;

  constructor(private restUser: RestUserService, private toastController: ToastController, private navController: NavController) {
     this.userLogin = {
      _id: '',
      username: '',
      password: '',
      gettoken: true,
    };
  }

  ngOnInit() {
  }

  async onSubmit(login: NgForm){
    let value = await this.restUser.login(this.userLogin)

    if(value){
      // this.presentToast("Login Correcto", "success")
      // .then( () => {
      //   login.reset()
        this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
      // })
    }else {
      this.presentToast("Datos incorrectoss", "danger")
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

}
