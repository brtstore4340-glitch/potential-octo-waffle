import { Injectable } from '@nestjs/common';

@Injectable()
export class CardSelectorUtil {

  /**
   * Calculates card index (1-7) based on Day of Month.
   * Formula: ((Day - 1) % 7) + 1
   */
  getCardIndex(date: Date): number {
    const day = date.getDate(); // 1-31
    return ((day - 1) % 7) + 1;
  }

  /**
   * Returns MM-DD strings to query for birthdays.
   * Handles Feb 28 on non-leap years (includes Feb 29 birthdays).
   */
  getTargetDates(date: Date): string[] {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const targets = [${mm}-];

    // Feb 28 (month index 1) on non-leap year -> include 02-29 birthdays
    const isFeb = (date.getMonth() === 1);
    const isFeb28 = isFeb && (date.getDate() === 28);
    if (isFeb28 && !this.isLeapYear(date.getFullYear())) {
      targets.push('02-29');
    }
    return targets;
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}

