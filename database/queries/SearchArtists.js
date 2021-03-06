const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 10) => {

	const query = Artist.find(createQuery(criteria))
		// const sortOrder = {};
		// sortOrder[sortProperty] = 1;
		// same thing ^
		.sort({ [sortProperty]: 1 })
		.skip(offset)
		.limit(limit);

	return Promise.all([query, Artist.find(createQuery(criteria)).count()])
		.then((results) => {
			return {
				all: results[0],
				count: results[1],
				offset: offset,
				limit: limit
			};
		});
};

// helper function
const createQuery = (criteria) => {
	const query = {};

	if (criteria.name) {
		query.$text = { $search: criteria.name }
	}

	// criteria defaults with only the name available
	// adjusting the age range adds criteria.age
	if (criteria.age) {
		query.age = {
			$gte: criteria.age.min,
			$lte: criteria.age.max
		}
	}

	if (criteria.yearsActive) {
		query.yearsActive = {
			$gte: criteria.yearsActive.min,
			$lte: criteria.yearsActive.max
		}
	}

	return query;
};