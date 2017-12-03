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

}
