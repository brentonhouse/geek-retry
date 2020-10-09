
const Promise = require(`bluebird`);
const { retry } = require(`../retry.js`);

const test1 = async () => {

	const func = async () => {
		await Promise.delay(50);
		throw new Error(`func failure`);
	};

	return await retry(func).catch(error => { console.error(error); });

};

const test2 = async () => {

	let i = 0;
	const func = async () => {
		await Promise.delay(50);
		if (i > 10) {
			return true;
		}
		i++;
		throw new Error(`func failure`);
	};

	return await retry(func, { retries: 20, factor: 1, delay: 50 }).catch(error => { console.error(error); });

};

(async () => {

	console.debug(`🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`);
	const test_result_1 = await test1();
	console.debug(`🦠  test_result_1: ${JSON.stringify(test_result_1, null, 2)}`);
	console.debug(`🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`);
	const test_result_2 = await test2();
	console.debug(`🦠  test_result_2: ${JSON.stringify(test_result_2, null, 2)}`);

})(this);

