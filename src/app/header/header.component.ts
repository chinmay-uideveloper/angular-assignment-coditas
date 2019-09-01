import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() query = new EventEmitter<string>();
  searchString: string;

  constructor() { }

  ngOnInit() {
  }

  onKey(event: KeyboardEvent) { // with type info
    this.searchString = (event.target as HTMLInputElement).value;
    this.query.emit(this.searchString);
    console.log(this.searchString);
  }

}
