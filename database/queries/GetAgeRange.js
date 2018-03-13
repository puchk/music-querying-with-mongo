const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
	const min = Artist
		// finds all the records
		.find({})
		// sorts them by age in ascending order
		.sort({age:1})
		// returns the first artist
		.limit(1)
		// artists is still an array but only 1 inside
		// any subsequent .thens will give the minAge
		.then(artists => artists[0].age);

	const max = Artist
		.find({})
		.sort({age: -1})
		.limit(1)
		.then(artists => artists[0].age);

	return Promise.all([min, max])
		.then((age) => {
			return { min: age[0], max: age[1] }
		});
};
