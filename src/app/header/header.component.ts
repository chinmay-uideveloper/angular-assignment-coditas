import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() query = new EventEmitter<string>();
  @Output() sortOption = new EventEmitter<string>();
  searchString: string;
  selectedSortOption = 'Name (A - Z)';

  constructor() { }

  ngOnInit() {
  }

  onKey(event: KeyboardEvent) { // with type info
    this.searchString = (event.target as HTMLInputElement).value;
    this.query.emit(this.searchString);
    console.log(this.searchString);
  }

  setSortOption(sortOption: string) {
    this.selectedSortOption = sortOption;
    this.sortOption.emit(this.selectedSortOption);
  }

}
