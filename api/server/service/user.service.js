const db = require("../src/models");

const { User } = db;
const { Interest } = db;
const { Trip } = db;
const {UserInterest} = db;

const UserService = {

    //get user by email
    getOneUser: async (email) => {
        try {
            return await User.findOne({
                where: { email: email },
                include: [
                    {
                        model: Interest,
                        as: 'interests',
                        attributes: ['id', 'name', 'img']
                    },
                    {
                        model: Trip,
                        as: 'trips',
                    }
                ],

            });
        } catch (error) {
            return error;
        }
    },

    //create user
    createUser: async (newUser) => {
        try {
            return await User.create(newUser)
        } catch (error) {
            return error;
        }
    },

    //get user by id
    getUserInfo: async (id) => {
        try {
            return await User.findByPk(id, {
                include: [
                    {
                        model: Interest,
                        as: 'interests',
                        attributes: ['id', 'name', 'img']
                    },
                    {
                        model: Trip,
                        as: 'trips',
                    }
                ],

            });
        } catch (error) {
            return error;
        }
    },

    //delete UserInterest association
    removeUserInterest: async (user_id, interest_id) => {
        try {
            const userInterest = await UserInterest.findOne({
                where: { user_id: user_id, interest_id: interest_id },
            });

            if (userInterest) {
                const deletedUserInterest = await UserInterest.destroy({
                    where: { user_id: user_id, interest_id: interest_id },
                });
                return deletedUserInterest;
            }
            return null;
        } catch (error) {
            return error;
        }
    }
};

module.exports = UserService;