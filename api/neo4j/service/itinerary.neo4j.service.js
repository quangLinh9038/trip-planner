const neode = require("../index");

/* 
  Import utils
*/
const generateCypherToFindRoute = require("../../server/utils/generateCypherToFindRoute");

const placeLabel = "Place";
const accommodationLabel = "Accommodation";
const cuisineLabel = "Cuisine";

const ItineraryNeo4jService = {
  /**
   * This method takes Place {unique_point} and list of Accommodation {unique_point} as parameters
   * and returns the shortest Accommodation from Place with exact distance
   */
  getFirstPlaceAndShortestAccommodation: async (
    placeUniquePoint,
    accommodationUniquePointList
  ) => {
    try {
      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 21 ~ placeUniquePoint",
      // placeUniquePoint
      // );

      const _accommodationUniquePointList = accommodationUniquePointList.map(
        (item) => `"${item}"`
      );
      // console.log(
      //   "🚀 ~ file: itinerary.neo4j.service.js ~ line 30 ~ _accommodationUniquePointList",
      //   _accommodationUniquePointList.length
      // );

      const cypher = generateCypherToFindRoute(
        _accommodationUniquePointList,
        placeUniquePoint,
        placeLabel,
        accommodationLabel
      );

      const firstPlaceAndShortestAccommodation = await neode.cypher(cypher);
      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 43 ~ firstPlaceAndShortestAccommodation",
      // firstPlaceAndShortestAccommodation.records[1].length
      // );

      /**
       * Return the shortest Accomms data only
       */
      return firstPlaceAndShortestAccommodation.records[1]._fields;
    } catch (error) {
      return error;
    }
  },

  getShortestLunchCuisine: async (
    cuisineUniquePoints,
    shortestAccommodationUniquePoint
  ) => {
    try {
      const listOfLunchCuisine = [];
      const _cuisineUniquePoints = cuisineUniquePoints.map(
        (item) => `"${item}"`
      );
      // console.log(
      //   "🚀 ~ file: itinerary.neo4j.service.js ~ line 70 ~ _cuisineUniquePoints",
      //   _cuisineUniquePoints
      // );

      const cypher = generateCypherToFindRoute(
        _cuisineUniquePoints,
        shortestAccommodationUniquePoint,
        accommodationLabel,
        cuisineLabel
      );
      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 81 ~ cypher",
      // cypher
      // );

      const result = await neode.cypher(cypher);

      for (const record of result.records) {
        await listOfLunchCuisine.push(record._fields[1]);
      }

      return listOfLunchCuisine;
    } catch (error) {
      return error;
    }
  },

  getMainPlacesForOneItinerary: async (
    shortestCuisineUniquePoint,
    placeUniquePoints
  ) => {
    try {
      const mainPlaceUniquePoints = [];

      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 98 ~ shortestCuisineUniquePoint",
      // shortestCuisineUniquePoint
      // );

      const _placeUniquePoints = placeUniquePoints.map((item) => `"${item}"`);

      const cypher = generateCypherToFindRoute(
        _placeUniquePoints,
        shortestCuisineUniquePoint,
        cuisineLabel,
        placeLabel
      );
      // console.log(
      // "🚀 ~ file: trip.neo4j.service.js ~ line 78 ~ cypher",
      // cypher
      // );

      const mainPlacesForOneItinerary = await neode.cypher(cypher);
      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 119 ~ mainPlacesForOneItinerary",
      // mainPlacesForOneItinerary.records.length
      // );

      await mainPlacesForOneItinerary.records.forEach((place) =>
        mainPlaceUniquePoints.push(place._fields[1])
      );
      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 128 ~ mainPlaceUniquePoints",
      // mainPlaceUniquePoints
      // );

      return mainPlaceUniquePoints;
    } catch (error) {
      return error;
    }
  },

  getShortestDinnerCuisine: async (cuisineUniquePoints, placeUniquePoint) => {
    try {
      const listOfDinnerCuisine = [];

      const _cuisineUniquePoints = cuisineUniquePoints.map(
        (item) => `"${item}"`
      );
      // console.log(
      //   "🚀 ~ file: itinerary.neo4j.service.js ~ line 137 ~ getShortestDinnerCuisine: ~ _cuisineUniquePoints",
      //   _cuisineUniquePoints
      // );

      const cypher = generateCypherToFindRoute(
        _cuisineUniquePoints,
        placeUniquePoint,
        placeLabel,
        cuisineLabel
      );
      // console.log(
      // "🚀 ~ file: itinerary.neo4j.service.js ~ line 145 ~ getShortestDinnerCuisine: ~ cypher",
      // cypher
      // );

      const result = await neode.cypher(cypher);

      for (const record of result.records) {
        await listOfDinnerCuisine.push(record._fields[1]);
      }

      /* 
        Return the shortest dinner Cuisine only
      */
      return listOfDinnerCuisine;
    } catch (error) {
      return error;
    }
  },
};

module.exports = ItineraryNeo4jService;
