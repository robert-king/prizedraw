import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CompetitionService} from '../competition.service';

@Component({
  selector: 'app-prize-draw-sim',
  templateUrl: './prize-draw-sim.component.html',
  styleUrls: ['./prize-draw-sim.component.css']
})
export class PrizeDrawSimComponent implements OnInit, OnChanges {
  @Input() boost: boolean;
  @Input() stack: boolean;
  @Input() entryCount: number;
  @Input() prizeCount: number;
  @Input() days: number;

  public multi = [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Days';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(private competitionService: CompetitionService) {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.run();
  }

  ngOnChanges() {
    this.run();
  }

  run() {
    this.multi = this.competitionService.runCompetition(
      this.boost,
      this.stack,
      this.entryCount,
      this.prizeCount,
      this.days
    );
  }

}
