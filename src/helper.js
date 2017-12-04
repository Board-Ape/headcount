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
    let locationObj = this.findByName(location);
    let data = Object.keys(locationObj.data);
    let average = data.reduce((accu, year) => {
      accu += locationObj.data[year];
      return accu;
    }, 0);

    return Math.round((average / data.length) * 1000) / 1000;
  }

  compareDistrictAverages(locOne, locTwo) {
    let location1 = this.findAverage(locOne);
    let location2 = this.findAverage(locTwo);
    let result = Math.round((location1 / location2) * 1000) / 1000;

    return {
      loc1: locOne.toUpperCase(),
      avg1: location1,
      loc2: locTwo.toUpperCase(),
      avg2: location2,
      compare: result
    };
  }
}
