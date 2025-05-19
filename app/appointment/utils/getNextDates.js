// utils/getNextDates.ts
export function getNext30DaysFor(days) {
    const result = [];
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
  
    let date = new Date();
    for (let i = 0; result.length < 30 && i < 60; i++) {
      const d = new Date();
      d.setDate(date.getDate() + i);
      if (days.includes(d.toLocaleDateString('en-US', { weekday: 'long' }))) {
        result.push(d);
      }
    }
  
    return result;
  }
  