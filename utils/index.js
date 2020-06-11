const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const getMonth = (month, hemisphere) => {
  if (hemisphere === 'northern') return month;
  const firstHalf = [...months].splice(0, 6);
  const secondHalf = [...months].splice(6);

  if (firstHalf.indexOf(month) !== -1)
    return secondHalf[firstHalf.indexOf(month)];
  if (secondHalf.indexOf(month) !== -1)
    return firstHalf[secondHalf.indexOf(month)];
  return 'N/A';
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatNameToImage = (name) =>
  name.replace(/[" "-.]/g, '').toLowerCase();
