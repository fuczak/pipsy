export default function schemaConverter(ev) {
  return {
    name: ev.name,
    address: {
      street: ev.addressStreet,
      number: ev.addressNumber
    },
    openingHours: {
      mon: [ev.oMon, ev.cMon],
      tue: [ev.oTue, ev.cTue],
      wed: [ev.oWed, ev.cWed],
      thu: [ev.oThu, ev.cThu],
      fri: [ev.oFri, ev.cFri],
      sat: [ev.oSat, ev.cSat],
      sun: [ev.oSun, ev.cSun]
    }
  };
}
