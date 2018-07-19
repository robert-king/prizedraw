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
    const prizes2 = [];
    let prizesGiven = 0;
    let prizesGiven2 = 0;
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

    const win2 = (P, Pg, e, T, Te, T3, e3) => {
      if (T <= Te || P === Pg) {
        return false;
      }
      if (T3 <= Te) {
        T3 = Te;
        e3 = e;
      }
      const Re = e / Te;
      const R3 = e3 / T3;
      const R = 0.2 * Re + 0.8 * R3; // rate is weighted
      const Tr = T - Te; // Time remaining
      const Er = R * Tr; // Entries remaining
      const Pr = P - Pg; // Prizes remaining
      const W = Pr / Er; // Win percent
      let chance = Math.random();
      if (boost) {
        chance = Math.pow(chance, 1.7);
      }
      if (chance <= W) {
        return true;
      }
      return false;
    };

    const oneDay = 60 * 60 * 24;
    const t3_ = oneDay * 2;
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
      }
      prizes.push({
        'name': entryTimeDay,
        'value': prizesGiven
      });
      let e3_ = 0;
      for (let j = i; j >= 0; j--) {
        const entryTimeSecondsJ = comp.Entries[j];
        if (entryTimeSeconds - entryTimeSecondsJ <= t3_) {
          e3_++; // count entries in last 3 days. In database this can be select count(*) where date < current date - 3
        } else {
          break;
        }
      }
      if (win2(comp.Prizes, prizesGiven2, entryCount, comp.EndTime - comp.StartTime, entryTimeSeconds, t3_, e3_)) {
        prizesGiven2 += 1;
      }
      prizes2.push({
        'name': entryTimeDay,
        'value': prizesGiven2
      });
    }

    const results = [
      {
        'name': 'Entries',
        'series': entries
      },
      {
        'name': 'Prizes2',
        'series': prizes2
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
        entries.push(Math.pow(Math.random(), 1.7) * duration);
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
