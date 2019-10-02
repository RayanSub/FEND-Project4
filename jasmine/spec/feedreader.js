/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("has URL and URL is not empty", function() {
            for(let feed of allFeeds) { //loop through allfeeds.
                expect(feed.url).toBeDefined; //url should be defined.
                expect(feed.url).not.toBe(""); //url should not be empty.
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("has name and name is not empty", function() {
            for(let feed of allFeeds) { //loop through allfeeds.
                expect(feed.name).toBeDefined; //name should be defined.
                expect(feed.name).not.toBe(""); //name should not be empty.
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("should be hidden", function() {
            let menu = document.querySelector("body");
            expect(menu.classList.contains('menu-hidden')).toBe(true); //menu should be hidden.
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it("toggle menu visibility", function() {
            let menu = document.querySelector("body");
            let menuIcon = document.querySelector(".menu-icon-link"); 
            
            simulateClick(menuIcon); //simulating a click on menu icon.
            expect(menu.classList.contains('menu-hidden')).toBe(false); //menu should appear

            simulateClick(menuIcon); //simulating a click on menu icon.
            expect(menu.classList.contains('menu-hidden')).toBe(true); //menu should disappear
        });
    }); 

        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("at least a single entry", function(done) { 
            let cont = document.querySelector(".feed");
            expect(cont.hasChildNodes()).toBe(true);
            done();
        });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let content1;
        beforeEach(function(done) { 
            loadFeed(0, function() {
                content1 = document.querySelector(".feed").innerHTML; //select the old feed
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it("feed container should change", function(done) { 
            const content2 = document.querySelector(".feed").innerHTML; //select the new feed
            expect(content2).not.toBe(content1); //the content of the old feed should be different than the new feed.
            done();
        });
    });
        
}());

//source: https://gomakethings.com/how-to-simulate-a-click-event-with-javascript/
var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};
