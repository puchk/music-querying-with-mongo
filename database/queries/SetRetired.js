const Artist = require('../models/artist');

/**
 * Sets a group of Artists as retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
module.exports = (_ids) => {
	return Artist.update(
		{ _id: { $in: _ids } },
		{ retired: true },
		// needs this to update multiple records at once
		{ multi: true}
	);
};
