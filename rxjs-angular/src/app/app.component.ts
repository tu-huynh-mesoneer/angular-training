import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'rxjs-angular';
  users = [
    {id:'1', username: 'John', isActivate: true },
    {id:'2', username: 'Tu', isActivate: true },
    {id:'3', username: 'Huynh', isActivate: true },
  ]
  user$ = new BehaviorSubject<{id: string; username: string} | null>(null);
  users$ = of(this.users);
  usernames$ = this.users$.pipe(map((users) => users.map((user) => user.username)));
  filteredUsers$ = this.users$.pipe(filter((users) => users.every((user => user.isActivate))));

  data$ = combineLatest([
    this.users$,
    this.usernames$,
    this.filteredUsers$
  ]).pipe(
    map(([users, usernames, filteredUsers]) => ({
      users,
      usernames,
      filteredUsers,
    }))
  )

  ngOnInit(): void {
    // this.users$.subscribe()
    setTimeout(() => {
      this.user$.next({id: '1', username: 'John'});
    }, 2000);
  }
}
