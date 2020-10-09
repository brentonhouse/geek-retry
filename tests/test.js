
const Promise = require(`bluebird`);
const { retry } = require(`../retry.js`);

const test1 = async () => {

	const func = async () => {
		await Promise.delay(200);
		throw new Error(`func failure`);
	};

	await retry(func).catch(error => { console.error(error); });

};

const test2 = async () => {

	let i = 0;
	const func = async () => {
		await Promise.delay(500);
		if (i > 10) {
			return true;
		}
		i++;
		throw new Error(`func failure`);
	};

	await retry(func, { retries: 20 }).catch(error => { console.error(error); });

};

(async () => {

	console.debug(`🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`);
	await test1();
	console.debug(`🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`);
	await test2();

})(this);

