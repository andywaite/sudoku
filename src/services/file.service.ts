import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
	constructor(private http: HttpClient) { }

	async load(fileName: string): Promise<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const get = this.http.get(fileName, { headers })
    const promise = new Promise((resolve, reject) => {
      get.subscribe(data => {
        const results: any = []
        Object.assign(results, data)
        resolve(results)
      })
    })

    return promise;
  }
}