import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {

  @Input() typedWords = [];

  @Input() nextWord = '';

  @Input() upcomingSentence = '';

  constructor() { }

  ngOnInit(): void {
  }

}
