import { Component } from '@angular/core';
import { DEFAULT_TIME } from './app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  paragraphs = [{
    text: 'A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper. Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble. Paragraph development begins with the formulation of the controlling idea. This idea directs the paragraph’s development. Often, the controlling idea of a paragraph will appear in the form of a topic sentence. In some cases, you may need more than one sentence to express a paragraph’s controlling idea.'
  }, {
    text: 'Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble. Paragraph development begins with the formulation of the controlling idea. This idea directs the paragraph’s development. Often, the controlling idea of a paragraph will appear in the form of a topic sentence. In some cases, you may need more than one sentence to express a paragraph’s controlling idea. A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper.'
  }, {
    text: 'Paragraph development begins with the formulation of the controlling idea. This idea directs the paragraph’s development. Often, the controlling idea of a paragraph will appear in the form of a topic sentence. In some cases, you may need more than one sentence to express a paragraph’s controlling idea. A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper. Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble.'
  }];

  upcomingSentence = '';
  nextWord = '';
  previousWords = [];
  allWords = [];
  selectedParagraph = '';
  startTyping = false;
  score = {
    wpm: 0,
    errors: 0,
    total: 0,
    accuracy: 0
  };
  records = {
    best: parseInt(localStorage.getItem('best') || '0', 10),
    last: parseInt(localStorage.getItem('last') || '0', 10)
  };

  defaultTime = DEFAULT_TIME;

  ngOnInit() {
    this.resetTest();
  }

  newWordEntered(e) {
    if (this.startTyping) {
      const typedWords = e.value.split(' ');
      const score = {
        wpm: 0,
        errors: 0,
        total: 0,
        accuracy: 0
      };
      this.previousWords = [];

      for (let i = 0; i < typedWords.length - 1; i++) {
        const typedWord = typedWords[i];
        const originalWord = this.allWords[i];
        const wordInfo = {
          hasError: false,
          word: originalWord
        };

        if (typedWord === originalWord) {
          score.total += 10;
        } else {
          score.total -= 5;
          wordInfo.hasError = true;
          score.errors++;
        }

        this.previousWords.push(wordInfo);
      }

      this.nextWord = this.allWords[typedWords.length - 1];
      this.upcomingSentence = this.allWords.slice(typedWords.length).join(' ');

      this.score = score;
    }
  }

  startTimer() {
    if (this.previousWords.length) {
      this.resetTest();
      this.records.last = parseInt(localStorage.getItem('last') || '0', 10);
    }
    if (!this.startTyping) {
      this.score = { // Resetting scores
        wpm: 0,
        errors: 0,
        total: 0,
        accuracy: 0
      };
      this.startTyping = true;
    }
  }

  stopTimer() {
    if (this.startTyping) {
      this.startTyping = false;
    }
  }

  resetTest() {
    this.previousWords = [];
    this.selectedParagraph = this.paragraphs[Math.floor(Math.random() * this.paragraphs.length)].text;
    const firstSpaceIndex = this.selectedParagraph.indexOf(' ');

    this.upcomingSentence = this.selectedParagraph.substr(firstSpaceIndex + 1);
    this.nextWord = this.selectedParagraph.substr(0, firstSpaceIndex);

    this.allWords = this.selectedParagraph.split(' ');
  }

  timesUp(timeInSeconds) {
    this.startTyping = false;
    this.score.wpm = this.previousWords.length / ((this.defaultTime - timeInSeconds) / 60);
    this.score.accuracy = this.previousWords.length ? parseFloat((((this.previousWords.length - this.score.errors) / this.previousWords.length) * 100).toFixed(2)) : 0;

    if (this.score.total > this.records.best) {
      localStorage.setItem('best', this.score.total.toString());
      this.records.best = this.score.total;
    }

    localStorage.setItem('last', this.score.total.toString());
    this.resetTest();
  }
}
