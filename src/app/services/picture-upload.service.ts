import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';
import { finalize, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureUploadService {

  constructor(private fireStorage:AngularFireStorage, private authService: AuthService) { }
  uploadImage(image:File){
    const filePath = `$'profile_images/${image.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    const uploadTask = this.fireStorage.upload(filePath, image);
    return uploadTask.snapshotChanges().pipe(
      finalize(() => {
         storageRef.getDownloadURL()
         .subscribe((data)=> {
            this.authService.userState$.pipe(take(1)).subscribe((user)=> {
              if(user){
                user?.updateProfile( {
                  photoURL: data 

                })
              }
             
            });
         });
      }));
  }
  }

