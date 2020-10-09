const Promise = require(`bluebird`);
const logger = require(`@geek/logger`).createLogger(`@geek/retry`, { meta: { filename: __filename } });

module.exports = {};

const retry = async (func, { retries = 5, delay = 1000, factor = 1 } = {}, { retries_max, retries_count } = {}) => {

	//TODO:  Add interval as an alternative to delay
	//TODO:  Add timeout option?
	//TODO:  Add error predicate option
	//TODO:  Add error handler
	//TODO:  Add forever option
	//TODO:  Add random delay option
	//TODO:  Add custom errors

	retries = parseInt(retries) || 0;
	factor = parseFloat(factor) || 0;
	delay = parseInt(delay) || 0;

	retries_max = retries_max || retries;
	retries_count = retries_count || 0;

	if (retries_count) {
		logger.debug(`🔁 function retry number: ${retries_count}`);
	}

	let error;
	const result = await Promise.try(func).catch(ex => { error = ex; });

	if (! error) {
		return result;
	}

	// console.error(error);
	logger.error(`🛑 error retrying function →`, error);

	if (retries) {
		logger.debug(`💤 delaying ${delay}ms before next retry`);
		await Promise.delay(delay);
		retries--;
		retries_count++;
		delay = parseInt(delay * factor);
		return retry(func, { retries, delay, backoff: factor }, { retries_max, retries_count });
	}

	throw new Error(`🛑 Max retries reached`);

};

module.exports.retry = retry;

