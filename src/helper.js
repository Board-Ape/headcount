export default class DistrictRepository {
  constructor(dataPassedIn) {
    this.data = this.cleanUpData(dataPassedIn);
    // console.log(this.data);
  }

  cleanUpData(rawData) {
    return rawData.reduce( (acc, dataObject) => {
      // console.log(dataObject);
      if(!acc[dataObject.Location]) {
        acc[dataObject.Location] = [];
      }
      acc[dataObject.Location].push(dataObject)
      return acc;
    }, {})
  }
}
