import {Component, OnInit} from '@angular/core';
import {single} from './data';
import {CompetitionService} from '../competition.service';

@Component({
  selector: 'app-prize-draw-sim',
  templateUrl: './prize-draw-sim.component.html',
  styleUrls: ['./prize-draw-sim.component.css']
})
export class PrizeDrawSimComponent implements OnInit {
  public multi = [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

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
    this.multi = this.competitionService.runCompetition();
  }

}
