export default class DistrictRepository {
  constructor(dataPassedIn) {
    this.data = this.cleanUpData(dataPassedIn);
  }

  cleanUpData(rawData) {
    return rawData.reduce( (acc, dataObject) => {
      if(!acc[dataObject.Location]) {
        acc[dataObject.Location] = { location: dataObject.Location.toUpperCase(), data: {} };
      }
      acc[dataObject.Location].data[dataObject.TimeFrame] = Math.round(1000 * dataObject.Data) / 1000 || 0;
      return acc;
    }, {})
  }

  findByName(location = undefined) {
    if(location) {
      const matchLocation = Object.keys(this.data).find( district => {
        return district.toUpperCase() === location.toUpperCase();
      })
      return this.data[matchLocation];
    }
  }

  findAllMatches(locationString) {
    const allDistrictData = Object.keys(this.data).map( district => this.data[district]);

    if(locationString) {
      return allDistrictData.filter( districts =>
        districts.location.includes(locationString.toUpperCase()));
    }

    return allDistrictData;
  }

  findAverage(location) {
    const locationObject = this.findByName(location);
    const locationKeys = Object.keys(locationObject.data);
    const average = locationKeys.reduce((accu, year) => {
      accu += locationObject.data[year]
      return accu;
    }, 0);
    return Math.round((average / locationKeys.length)*1000) / 1000
  }

  compareDistrictAverages(locationOne, locationTwo) {
    const location1 = this.findAverage(locationOne);
    const location2 = this.findAverage(locationTwo);
    const result = Math.round((location1 / location2) * 1000) / 1000;

    return { [locationOne.toUpperCase()]: location1,
              [locationTwo.toUpperCase()]: location2,
              compared: result }
  }

}
