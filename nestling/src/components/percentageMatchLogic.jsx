// import { sampleHousesData } from "../sampleHousesData";

export const percentageMatchLogic = (
  currentList,
  location,
  roomCount,
  distance,
  firstAmenityChoice,
  secondAmenityChoice,
  thirdAmenityChoice,
  floorArea,
  housePrice
) => {
  let distanceAsInt = parseInt(distance); // convert string type to integer type
  let roomCountAsInt = parseInt(roomCount);
  let grossFloorAreaAsInt = parseInt(floorArea);
  let housePriceAsInt = parseInt(housePrice);

  let currentPoints = 0;
  let maxPoints = 280;

  // since we don't want to modify the housing data itself, we create a temp array instead
  // we will add new temporary attributes to each house object, namely points and percentageMatch
  let tempData = currentList.map((house) => {
    return { ...house, points: currentPoints, percentageMatch: 0 };
  });

  // console.log(tempData);

  tempData.forEach((house) => {
    if (house.districtGroup === location) {
      // house = { ...house, points: (house.points += 50) };
      house.points += 50;
    }

    switch (firstAmenityChoice) {
      case "Schools":
        if (distanceAsInt >= house.nearestSchoolDistance) {
          house.points += 30;
        }
        break;
      case "Primary schools":
        if (distanceAsInt >= house.nearestPriSchDistance) {
          house.points += 30;
        }
        break;
      case "Secondary schools":
        if (distanceAsInt >= house.nearestSecSchDistance) {
          house.points += 30;
        }
        break;
      case "Supermarkets":
        if (distanceAsInt >= house.nearestMarketDistance) {
          house.points += 30;
        }
        break;
      case "Parks":
        if (distanceAsInt >= house.nearestParkDistance) {
          house.points += 30;
        }
        break;
      case "Stations":
        if (distanceAsInt >= house.nearestMRTDistance) {
          house.points += 30;
        }
        break;
      case "Malls":
        if (distanceAsInt >= house.nearestMallDistance) {
          house.points += 30;
        }
        break;
      default:
        // console.log("no amenities matched for option 1");
        break;
    }

    switch (secondAmenityChoice) {
      case "Schools":
        if (distanceAsInt >= house.nearestSchoolDistance) {
          house.points += 30;
        }
        break;
      case "Primary schools":
        if (distanceAsInt >= house.nearestPriSchDistance) {
          house.points += 30;
        }
        break;
      case "Secondary schools":
        if (distanceAsInt >= house.nearestSecSchDistance) {
          house.points += 30;
        }
        break;
      case "Supermarkets":
        if (distanceAsInt >= house.nearestMarketDistance) {
          house.points += 30;
        }
        break;
      case "Parks":
        if (distanceAsInt >= house.nearestParkDistance) {
          house.points += 30;
        }
        break;
      case "Stations":
        if (distanceAsInt >= house.nearestMRTDistance) {
          house.points += 30;
        }
        break;
      case "Malls":
        if (distanceAsInt >= house.nearestMallDistance) {
          house.points += 30;
        }
        break;
      default:
        // console.log("no amenities matched for option 1");
        break;
    }

    switch (thirdAmenityChoice) {
      case "Schools":
        if (distanceAsInt >= house.nearestSchoolDistance) {
          house.points += 30;
        }
        break;
      case "Primary schools":
        if (distanceAsInt >= house.nearestPriSchDistance) {
          house.points += 30;
        }
        break;
      case "Secondary schools":
        if (distanceAsInt >= house.nearestSecSchDistance) {
          house.points += 30;
        }
        break;
      case "Supermarkets":
        if (distanceAsInt >= house.nearestMarketDistance) {
          house.points += 30;
        }
        break;
      case "Parks":
        if (distanceAsInt >= house.nearestParkDistance) {
          house.points += 30;
        }
        break;
      case "Stations":
        if (distanceAsInt >= house.nearestMRTDistance) {
          house.points += 30;
        }
        break;
      case "Malls":
        if (distanceAsInt >= house.nearestMallDistance) {
          house.points += 30;
        }
        break;
      default:
        // console.log("no amenities matched for option 1");
        break;
    }

    let roomCountDifference = Math.abs(roomCountAsInt - house.roomCount);
    if (roomCountDifference === 0) {
      // house = { ...house, points: (house.points += 40) };
      house.points += 40;
    } else if (roomCountDifference === 1) {
      // house = { ...house, points: (house.points += 20) };
      house.points += 20;
    } else if (roomCountDifference === 2) {
      // house = { ...house, points: (house.points += 10) };
      house.points += 10;
    }

    if (grossFloorAreaAsInt === house.GFA) {
      house.points += 50;
    } else if (grossFloorAreaAsInt > house.GFA) {
      // house = {
      //   ...house,
      //   points: (house.points += (house.floorArea / floorArea) * 100),
      // };
      house.points += (house.GFA / grossFloorAreaAsInt) * 50;
      // console.log("???");
    } else if (grossFloorAreaAsInt < house.GFA) {
      // house = {
      //   ...house,
      //   points: (house.points += (floorArea / house.floorArea) * 100),
      // };
      house.points += (grossFloorAreaAsInt / house.GFA) * 50;
      // console.log("!!!");
    }

    // console.log(house.price);
    if (housePriceAsInt === house.price) {
      house.points += 50;
    } else if (housePriceAsInt > house.price) {
      house.points += (house.price / housePriceAsInt) * 50;
    } else if (housePriceAsInt < house.price) {
      house.points += (housePriceAsInt / house.price) * 50;
    }

    house.percentageMatch = (house.points / maxPoints) * 100;
  });

  // console.log("tempData:", tempData);
  return tempData;
};
