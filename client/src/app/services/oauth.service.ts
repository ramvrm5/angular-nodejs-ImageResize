import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  constructor(private httpClient: HttpClient) { }
  
/* LOGIN API  */
  loginUser(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(`${environment.apiUrl}users/login`, data, { headers: headers });
	  }

}