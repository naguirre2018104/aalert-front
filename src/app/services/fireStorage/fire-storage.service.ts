import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private fireStorage: AngularFireStorage) { }

  async uploadImage(file: any, path: string, name: string): Promise<string>{
    return new Promise(resolve =>{
      console.log(JSON.stringify(file));
      var filePath = path + "/" + name;
      var ref = this.fireStorage.ref(filePath);
      var task = ref.put(file);
      task.snapshotChanges().pipe(finalize(()=> {
        ref.getDownloadURL().subscribe(res =>{
          const downloadURL = res;
          resolve(downloadURL);
          return;
        })
      })).subscribe();
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

}
