const enhancer = require('./enhancer.js');
// test away!

const { expect, it } = require('@jest/globals');
const { repair, success, fail, get } = require('./enhancer.js');


const {
	itemOne,
	itemTwo,
	itemThree,
	itemFour,
	itemFive,
    itemSix,
    itemSeven,
    itemEight,
    itemNine,
    itemTen,
} = require('./items');


describe('repair(item)', () => {
	it('**returns a new item** with the durability restored to 100.', () => {
		const repairedItemOne = repair(itemOne);
		expect(repairedItemOne.durability).toBe(100);
	});

	it("doesn't raise beyond on item with 100 durability", () => {
		const repairedItemThree = repair(itemThree, itemEight, itemNine, itemTen);
		expect(repairedItemThree.durability).toBeLessThan(101);
	});
});

describe('success(item)', () => {
	it('The item enhancement is a number from 0 to 20', () => {
		const enhancedItemOne = success(itemOne);
		expect(enhancedItemOne.enhancement).toBe(13);
	});

	it("doesn't raise enhancement for items with an enhancement value of 20", () => {
		const enhancedItemTwo = success(itemTwo);
		expect(enhancedItemTwo.enhancement).not.toBe(21);
	});

	it("No efffect on durability", () => {
		const enhancedItemOne = success(itemOne);
		const enhancedItemTwo = success(itemTwo);
		expect(enhancedItemOne.durability).toBe(75);
		expect(enhancedItemTwo.durability).toBe(60);
	});
});

describe('fail(item)', () => {
	it('decrease by 5 when items enhancement value is less than 15', () => {
		const failedItemOne = fail(itemOne);
		expect(failedItemOne.durability).toBe(70);
	});

	it('decreases by 10 when items enhancement value is 15 or more', () => {
		const failedItemFour = fail(itemFour);
		expect(failedItemFour.durability).toBe(75);
	});

	it('decreases by 1 if items enhancement value is 16 or more', () => {
		const failedItemTwo = fail(itemTwo);
        const failedItemFive = fail(itemFive, itemSeven);
		expect(failedItemTwo.enhancement).toBe(19);
		expect(failedItemFive.enhancement).toBe(16);
	});

	it('doesnt decrease enhancement on items with value less than 17', () => {
		const failedItemThree = fail(itemThree);
		const failedItemFour = fail(itemFour);
		expect(failedItemThree.enhancement).toBe(4);
		expect(failedItemFour.enhancement).toBe(16);
	});
});

describe('get()', () => {
	it('returns item with new name showing enhancement', () => {
		const enhancedItemThree = get(itemThree);
		const enhancedItemFive = get(itemFive);

		expect(enhancedItemThree.name).toEqual('[+4] Iron Mail');
		expect(enhancedItemFive.name).toEqual('[+17] Long Bow');
	});

	it('returns original item name if item not enhanced', () => {
		const unchangedItem = get(itemSix);
		expect(unchangedItem.name).toBe('Item Six');
	});
});