import { Injectable } from '@angular/core';
import { Candidate} from '../shared/candidate';

import { Observable} from 'rxjs/Observable';
import { Http, Response, RequestOptions, RequestMethod , Headers} from '@angular/http';


import { RestangularModule, Restangular } from 'ngx-restangular';


import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CandidateService {
  headers : Headers;
  candidatecopy : Candidate;
  options: RequestOptions;
  constructor(private restangular: Restangular,private http : Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
   }
  cp = null;  
  getAll(): Observable<Candidate[]> {
    return this.restangular.all('candidates').getList();
  }

  getById(id: number) : Observable<Candidate> {
    return this.restangular.one('candidates', id);
  }

  create(candidate : Candidate): Observable<any>
  {
    this.candidatecopy = new Candidate();
    this.candidatecopy.date = candidate.date;
    this.candidatecopy.id = candidate.id;
    this.candidatecopy.name = candidate.name;
    this.candidatecopy.number = candidate.number;
    this.candidatecopy.skills = candidate.skills;

    return this.restangular.all('candidates').post(this.candidatecopy);
  }

  update (candidate : Candidate):Observable<any>
  {
    this.candidatecopy = new Candidate();
    this.candidatecopy.date = candidate.date;
    this.candidatecopy.id = candidate.id;
    this.candidatecopy.name = candidate.name;
    this.candidatecopy.number = candidate.number;
    this.candidatecopy.skills = candidate.skills;   
//     this.headers = new Headers({'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS, HEAD',
// 'Access-Control-Allow-Headers' : 'Content-Type'});
//     this.options =new RequestOptions({headers: this.headers});
//    // return this.restangular.all('candidates',  this.candidatecopy.id ).post(this.candidatecopy);
//      return this.http.put("http://localhost:60824/api/candidates/" +  this.candidatecopy.id,JSON.stringify(this.candidatecopy),this.options);
  
return this.restangular.all('candidates').post(this.candidatecopy);
  }

  

  delete (id: number): Observable<any>
  {
    return this.http
        .delete("http://localhost:60824/api/candidates"+ "/?" + "id" + "=" + id, this.options)
        .map(this.extractData)
        .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}
}


