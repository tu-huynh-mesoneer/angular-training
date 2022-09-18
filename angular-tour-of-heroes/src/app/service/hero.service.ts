import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { MessageStatus } from '../enums/MessageStatus.enum';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient, private messageService: MessageService) { }
  heroUrl = 'https://5d6973ee8134fd001430c6b7.mockapi.io/api/test1/hero';

  getHeroes(): Observable<Hero[]> {
    const heroesReq = this.http.get<Hero[]>(this.heroUrl).pipe(
      retry(3), // retry a failed request up to 3 times
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError) // then handle the error
    );
    return heroesReq;
  }

  getHeroesById(id: Number): Observable<Hero> {
    const heroesReq = this.http.get<Hero>(`${this.heroUrl}/${id}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    return heroesReq;
  }

  postHeroes(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  putHeroesById(id: Number, hero: Hero): Observable<any> {
    console.log(`putHeroesById: ${hero.id}`);
    return this.http.put(`${this.heroUrl}/${id}`, hero, httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  deleteHero(id: number): Observable<unknown> {
    const url = `${this.heroUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {  
    this.messageService.add(`HeroService: ${message}`, MessageStatus.success);
  }

}
