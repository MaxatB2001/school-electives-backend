const getDaysArray = (start, end, requiredDays) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    if (requiredDays.includes(dt.getDay())) {
      arr.push(new Date(dt));
    }
  }
  return arr;
};

module.exports = {getDaysArray}