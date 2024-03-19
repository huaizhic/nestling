import { sampleHousesData } from "../sampleHousesData";

export const percentageMatchLogic = (
  location,
  roomCount,
  distance,
  firstAmenityChoice,
  secondAmenityChoice,
  thirdAmenityChoice,
  floorArea
) => {
  let distanceAsInt = parseInt(distance); // convert string type to integer type
  let roomCountAsInt = parseInt(roomCount);

  let currentPoints = 0;
  let maxPoints = 230;

  // since we don't want to modify sampleHousesData, we create a temp array instead
  let tempData = sampleHousesData.map((house) => {
    return { ...house, points: currentPoints, percentageMatch: 0 };
  });

  // console.log(tempData);

  tempData.forEach((house) => {
    if (house.location === location) {
      // house = { ...house, points: (house.points += 50) };
      house.points += 50;
    }

    house.amenities.forEach((amenity) => {
      if (amenity.distance <= distanceAsInt) {
        if (
          amenity.type === firstAmenityChoice ||
          amenity.type === secondAmenityChoice ||
          amenity.type === thirdAmenityChoice
        ) {
          // house = { ...house, points: (house.points += 30) };
          house.points += 30;
        }

        // house.points += 30;
      }
    });

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

    if (floorArea === house.grossFloorArea) {
      house.points += 50;
    } else if (floorArea > house.grossFloorArea) {
      // house = {
      //   ...house,
      //   points: (house.points += (house.floorArea / floorArea) * 100),
      // };
      house.points += (house.grossFloorArea / floorArea) * 50;
      // console.log("???");
    } else if (floorArea < house.grossFloorArea) {
      // house = {
      //   ...house,
      //   points: (house.points += (floorArea / house.floorArea) * 100),
      // };
      house.points += (floorArea / house.grossFloorArea) * 50;
      // console.log("!!!");
    }

    house.percentageMatch = (house.points / maxPoints) * 100;

    // house = {
    //   ...house,
    //   percentageMatch: 33,
    //   // (house.points / maxPoints) * 100,
    // };
  });

  // console.log("tempData:", tempData);
  return tempData;

  // sampleHousesData.map((house) => {
  //   if (house.location === location) {
  //     house = { ...house, points: (house.points += 50) };
  //     //   house.points += 50;
  //     //   console.log(house.points);
  //   }

  //   house.amenities.map((amenity) => {
  //     if (amenity.distance <= distanceAsInt) {
  //       if (
  //         amenity.type === firstAmenityChoice ||
  //         amenity.type === secondAmenityChoice ||
  //         amenity.type === thirdAmenityChoice
  //       ) {
  //         house = { ...house, points: (house.points += 30) };
  //       }

  //       // house.points += 30;
  //     }
  //     return amenity;
  //   });

  //   let roomCountDifference = Math.abs(roomCountAsInt - house.roomCount);
  //   if (roomCountDifference === 0) {
  //     house = { ...house, points: (house.points += 40) };

  //     //   house.points += 40;
  //   } else if (roomCountDifference === 1) {
  //     house = { ...house, points: (house.points += 20) };

  //     //   house.points += 20;
  //   } else if (roomCountDifference === 2) {
  //     house = { ...house, points: (house.points += 10) };

  //     //   house.points += 10;
  //   }

  //   if (floorArea > house.floorArea) {
  //     house = {
  //       ...house,
  //       points: (house.points += (house.floorArea / floorArea) * 100),
  //     };
  //     //   house.points += (house.floorArea / floorArea) * 100;
  //   } else if (floorArea < house.floorArea) {
  //     house = {
  //       ...house,
  //       points: (house.points += (floorArea / house.floorArea) * 100),
  //     };
  //     //   house.points += (floorArea / house.floorArea) * 100;
  //   }
  //   // let floorAreaDifference = Math.abs(floorArea - house.floorArea);
  //   // if (floorAreaDifference <= 100) {
  //   //   house.points += 100;
  //   // } else if (floorAreaDifference > 100 && floorAreaDifference <= 200) {
  //   // }

  //   house = {
  //     ...house,
  //     percentageMatch: (house.percentageMatch =
  //       (house.points / maxPoints) * 100),
  //   };

  //   console.log("house points:", house.points);
  //   console.log("percentage:", house.percentageMatch);
  //   // house.percentageMatch = (house.points / maxPoints) * 100;
  //   // return house;
  // });
};
