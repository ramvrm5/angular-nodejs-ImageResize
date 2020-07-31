import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) { }
  
/* IMAGE RESIZE API  */
  imageResize(link,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(`${environment.apiUrl}image/imgresize`, link, { headers: headers });
	}  
	
/* GET IMAGE API  */
  getImage(data,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(`${environment.apiUrl}image/getImage`, data, { headers: headers });
	  }

}