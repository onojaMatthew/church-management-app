export const chartData = (data) => {
  const currentYear = new Date().getFullYear();
  let jan = [], feb = [], mar = [], apr = [], may = [], jun = [], jul = [], aug = [], sep = [], oct = [], nov = [], dec = [];
  let f_jan = [], f_feb = [], f_mar = [], f_apr = [], f_may = [], f_jun = [], f_jul = [], f_aug = [], f_sep = [], f_oct = [], f_nov = [], f_dec = [];

  const male_members = data.male_members, female_members = data.female_members;
  for (let i = 0; i < male_members.length; i++) {
    let elem = male_members[i];
    if (elem && new Date(elem.createdAt).getFullYear === currentYear && new Date(elem.createdAt).getMonth() === 0) {
      jan.push(elem);
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 1) {
      feb.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 2) {
      mar.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 3) {
      apr.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 4) {
      may.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 5) {
      jun.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 6) {
      jul.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 7) {
      aug.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 8) {
      sep.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 9) {
      oct.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 10) {
      nov.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 11) {
      dec.push(elem)
    }
  };

  for (let i = 0; i < female_members.length; i++) {
    let elem = female_members[i];
    if (elem && new Date(elem.createdAt).getFullYear === currentYear && new Date(elem.createdAt).getMonth() === 0) {
      f_jan.push(elem);
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 1) {
      f_feb.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 2) {
      f_mar.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 3) {
      f_apr.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 4) {
      f_may.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 5) {
      f_jun.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 6) {
      f_jul.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 7) {
      f_aug.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 8) {
      f_sep.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 9) {
      f_oct.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 10) {
      f_nov.push(elem)
    } else if (elem && new Date(elem.createdAt).getFullYear() === currentYear && new Date(elem.createdAt).getMonth() === 11) {
      f_dec.push(elem)
    }
  };

  const male_chart_arr = [jan.length, feb.length, mar.length, apr.length, may.length, jun.length, jul.length, aug.length, sep.length, oct.length, nov.length, dec.length ];
  const female_chart_arr = [f_jan.length, f_feb.length, f_mar.length, f_apr.length, f_may.length, f_jun.length, f_jul.length, f_aug.length, f_sep.length, f_oct.length, f_nov.length, f_dec.length ];
  return { male_chart_arr, female_chart_arr };
}