import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanLoad {

  constructor(private restUser: RestUserService){}

  canLoad(): Promise<boolean> | Observable<boolean> | boolean{
    return this.restUser.validateToken();
  }
  
}
