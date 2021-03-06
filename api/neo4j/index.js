const Neode = require('neode');
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const PlaceNeo4j = require('./models/Place.neo4j');
const AccommodationNeo4j = require('./models/Accommodation.neo4j');
const CuisineNeo4j = require('./models/Cuisine.neo4j');

/* 
  Define a Neode Instance
  Use configuration from .env
*/
const neode = new Neode(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)
  // Include models in neo4j-models directory
  .with({
    Place: PlaceNeo4j,
    Accommodation: AccommodationNeo4j,
    Cuisine: CuisineNeo4j,
  });

module.exports = neode;
