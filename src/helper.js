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
      const dataKeys = Object.keys(this.data)
      const matchLocation = dataKeys.find( district => {
        return district.toUpperCase() === location.toUpperCase();
      })
      return this.data[matchLocation];
    }
  }

}
