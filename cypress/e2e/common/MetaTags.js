/// <reference types="Cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('the page contains meta tags with the following names', (dataTable) => {
	for (const { name, content } of dataTable.hashes()) {
		const locator = `meta[name='${name}']`;
		//find element, ensure it has attribute content
		//compare content's value with expected one
		cy.get(locator).should('have.attr', 'content').and('be.eq', content);
	}
});

Then(
	'the page contains meta tags with the following properties',
	(dataTable) => {
		for (const { property, content } of dataTable.hashes()) {
			if (property === 'robots') {
				const locator = `META[name='${property}']`;
				//find element, ensure it has attribute content
				//compare content's value with expected one
				cy.get(locator).should('have.attr', 'content').and('be.eq', content);
			} else {
				const locator = `META[property='${property}']`;
				//find element, ensure it has attribute content
				//compare content's value with expected one
				cy.get(locator).should('have.attr', 'content').and('be.eq', content);
			}
		}
	}
);

Then('there is a canonical link with the href {string}', (href) => {
	cy.get("link[rel='canonical']")
		//verify there is only one link
		.should('have.length', 1)
		//verify it has attribute 'href
		.and('have.attr', 'href')
		//href attr contains expected url
		.and('be.eq', href);
});

Then('the title tag should be {string}', (expectedTitle) => {
	cy.title({ timeout: 7000 }).should('include', expectedTitle);
});

Then('there are alternate links with the following', (dataTable) => {
	const locator = "[rel='alternate']";
	//convert data table into the object of type
	//{ header 1: row 1 col 1, header 2: row 1 col 2 },
	// { header 1: row 2 col 1, header 2: row 2 col 2 },
	for (const { href, hreflang } of dataTable.hashes()) {
		//find element with concatenated attributes (rel=alternate and href=foo)
		cy.get(`${locator}[href='${href}']`)
			//assert it has the hreflang attr
			.should('have.attr', 'hreflang')
			//hreflang value is matching expected
			.and('be.eq', hreflang);
	}
});

Then('there are no alternate links', () => {
	cy.get("[rel='alternate']").should('not.exist');
});
