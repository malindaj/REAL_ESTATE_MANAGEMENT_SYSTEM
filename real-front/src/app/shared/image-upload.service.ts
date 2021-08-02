import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  imageUpload(image: FormData): Observable<any> {
    return this.http.post('http://localhost:8000/api/uploads', image);
  }
}
