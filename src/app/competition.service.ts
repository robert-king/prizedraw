import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor() {
  }

  runCompetition(boost, stack, entryCountTot, prizeCount, days): any {
    const comp = this.defaultCompetition(stack, entryCountTot, prizeCount, days);
    const entries = [];
    const prizes = [];
    let prizesGiven = 0;
    const win = (P, Pg, e, T, Te) => {
      if (T <= Te || P === Pg) {
        return false;
      }
      const W = (P - Pg) / (e * (T / Te - 1));
      let chance = Math.random();
      if (boost) {
        chance = Math.pow(chance, 1.5);
      }
      if (chance <= W) {
        return true;
      }
      return false;
    };

    for (let i = 0; i < comp.Entries.length; i++) {
      const entryTimeSeconds = comp.Entries[i];
      const entryTimeDay = entryTimeSeconds / 60 / 60 / 24;
      const entryCount = i + 1;
      entries.push({
        'name': entryTimeDay,
        'value': entryCount
      });
      if (win(comp.Prizes, prizesGiven, entryCount, comp.EndTime - comp.StartTime, entryTimeSeconds)) {
        prizesGiven += 1;
        prizes.push({
          'name': entryTimeDay,
          'value': prizesGiven
        });
      }
    }

    const results = [
      {
        'name': 'Entries',
        'series': entries
      },
      {
        'name': 'Prizes',
        'series': prizes
      },
    ];

    return results;
  }

  defaultCompetition(stack: boolean, entryCount, prizeCount, days): Competition {
    const numEntries = entryCount;
    const numPrizes = prizeCount;
    const oneDay = 60 * 60 * 24;
    const startTime = 0;
    const endTime = days * oneDay;
    const duration = endTime - startTime;
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
      if (stack) {
        entries.push(Math.pow(Math.random(), 1.5)  * duration);
      } else {
        entries.push(Math.random() * duration);
      }
    }
    entries.sort((n1, n2) => n1 - n2);
    return {
      Entries: entries,
      StartTime: 0,
      EndTime: endTime,
      Prizes: numPrizes,
    };
  }
}

interface Competition {
  Entries: number[]; // sorted, seconds since epoch, unix
  StartTime: number; // seconds since epoch, unix
  EndTime: number; // seconds since epoch, unix
  Prizes: number;
}
