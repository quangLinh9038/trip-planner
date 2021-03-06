const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");

/* 
  Import models
*/
const db = require("../src/models");
const { Accommodation } = db;
const { City } = db;

/* 
  Import utils
*/
const generateSubQuery = require("../utils/generateSubQuery");

const AccommodationService = {
  getAllAccommodations: async () => {
    try {
      return await Accommodation.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getConditionalAccommodation: async (conditions) => {
    try {
      return await Accommodation.findAll({
        where: {
          [Op.or]: [conditions],
        },
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getOneAccommodationById: async (id) => {
    try {
      return await Accommodation.findByPk(id, {
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },
  // get a accommodation by name
  getOneAccommodationByName: async (checkedName) => {
    try {
      return await Accommodation.findOne({
        where: { name: checkedName },
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },
  getOneAccommodationByUniquePoint: async (unique_point) => {
    try {
      return await Accommodation.findOne({
        where: { unique_point: unique_point },
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },
  getOneAccommodationByName: async (checkedName) => {
    try {
      return await Accommodation.findOne({
        where: { name: checkedName },
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  getMainAccommodation: async (params, price, limit) => {
    try {
      const model = "Accommodation";

      const subQuery = generateSubQuery(params);

      const sql = `SELECT *, ${subQuery} AS point
      FROM "${model}" 
      WHERE price<=${price}
      ORDER BY point DESC LIMIT ${limit};`;

      const mainAccommodation = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      const result = !mainAccommodation.length ? null : mainAccommodation;

      return result;
    } catch (error) {
      return error;
    }
  },

  createAccommodations: async (newAccommodations) => {
    try {
      return await Accommodation.bulkCreate(newAccommodations);
    } catch (error) {
      return error;
    }
  },

  deleteAccommodationById: async (id) => {
    try {
      const accommodationToDelete = await Accommodation.findByPk(id);

      return await accommodationToDelete.destroy();
    } catch (error) {
      return error;
    }
  },

  deleteAllAccommodations: async () => {
    try {
      return await Accommodation.destroy({ where: {} });
    } catch (error) {
      return error;
    }
  },

  updateAccommodation: async (id, updateAccommodation) => {
    try {
      const accommodationToUpdate = await Accommodation.findByPk(id);

      if (accommodationToUpdate) {
        const updatedAccommodation = await Accommodation.update(
          updateAccommodation,
          { where: { id } }
        );
        return updatedAccommodation;
      }
      return null;
    } catch (error) {
      return error;
    }
  },
};

module.exports = AccommodationService;
