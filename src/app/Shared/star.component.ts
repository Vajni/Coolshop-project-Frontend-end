import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-star',
    templateUrl: 'star.component.html',
    styleUrls: ['star.component.css']
})
export class StarComponent implements OnChanges{
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter;
    
    ngOnChanges(): void {
        this.starWidth = this.rating * 86/5;
    }

    onclick(): void {
        this.ratingClicked.emit('The rating {$this.rating} was clicked!' );
    }
     
}