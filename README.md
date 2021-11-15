<br />
<p align="center">
  <a href="https://fslashr.herokuapp.com/">
    <img src="https://cdn.discordapp.com/attachments/906292935765667874/906293015436492840/RH-link.png" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">NotRobinhood</h3>

  <p align="center">
    <a href="https://fslashr.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li>
      <a href="#interesting-issues">Interesting Issues</a>
    </li>
    <li>
      <a href="#features-to-implement-next">Features to Implement Next</a>
    <li><a href="#contact">Contact</a></li>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project 
[Back to top](#table-of-contents)

<br>

### [NotRobinhood](https://notrobinhood.herokuapp.com/)

NotRobinhood is a web application built for investors to monitor, buy/sell stocks, and get the latest news in tech. NotRobinhood eases the creation, exploration, and organization of different stocks through the use of watchlists. A user will be able to view their profits or losses on their dashboard page, as well as the gains or losses on each individual stock. NotRobinhood also offers a way to see immediate results through the use of color on the charts and the entire page either in red or green depending on losses/profits.

### Built With 
[Back to top](#table-of-contents)
* [Finnhub - Stock API](https://finnhub.io/)
* [AWS - Amazon Web Services](https://aws.amazon.com/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Usage
Users have the ability switch between a light and dark mode. The accent colors are reactive to the current stock price. If the stock is in the negatives, the accents will be red. If the stock is doing well, the colors will be green for lightmode, and blue for dark mode.

<br>

![l-d](./gifs/mode.gif)

<br>

Users can buy and sell stocks on the stocks assets page.

<br>

![b-s](./gifs/buy-sell.gif)

<br>

Users can switch between resolutions to see how the stock is doing throughout different time frames.

<br>

![res](./gifs/resolution.gif)

<br>

Users can create and delete Watchlists. They may also add/remove companies to/from the watchlists.

<br>

![wl](./gifs/l-d-mode.gif)

## Interesting Issues:
### Dynamic Algorithm to turn API response into graphable points.
[Back to top](#table-of-contents) 

<b>Issue</b>: We are using multiple APIs to get up to date information on stocks. The information we are getting back needs to be turned into an object that we can use to feed data to the Recharts library to allow for the graph to be presented on each page. We also needed to be able to do it for just one stock, or a user's entire portfolio

<b>Solution</b>: We created a dynamic alogrithm that is able to to take any resolution (timeframe), figure out whether it's a weekend or not (unable to get information from the API for weekends because the stock market is closed), take one or 100 stock symbols, translate UNIX timestamps (what was being given from the API) into user friendly times, and match all of the stock candles data to those times. We were able to package all of this into one function which we used from our redux stores to gather all of the information we needed, all while keeping our redux stores clean and readable.
## Features to Implement Next
[Back to top](#table-of-contents)

<b>Overview</b>:

### <b>Feature</b>: Trending Lists
<b>How I would do it</b>: Trending Lists are on the dashboard/portfolio page to display the most popular lists on the site. This component will house links to other lists that contain the most popular stocks. Each list's name will act as a button that will redirect users to another page containing those stocks.

### <b>Feature</b>: Key statistics
<b>How I would do it</b>: We would use the Finnhub API to pull the relavent information and present a new component on the individual stock page to show its information. This information includes Market Cap, Price-Earnings ratio, Divident yield, average volume, High-Today, Low-Today, open price, volume, 52 week high, and 52 week low fields in an organized grid format.

### <b>Feature</b>: Related lists
<b>How I would do it</b>: Related lists would act as a tag of sorts to make it easier to find stocks in the same industry, location, or other groups. These lists can be displayed in their own component on the stock page under the key statistics to allow users to find other similar stocks. Each related list will act as button that will redirect the user to another page containing those stocks.

<!-- CONTACT -->
## Contact
[Back to top](#table-of-contents)

Jordan Guevara - [LinkedIn](https://www.linkedin.com/in/jordan-guevara-a9370521a/) - jordansacct@gmail.com

Project Repo Link: [https://github.com/Jguevara1208/fslashr](https://github.com/Jguevara1208/fslashr)

Project Link: [https://fslashr.herokuapp.com/](https://fslashr.herokuapp.com/)


<!-- ACKNOWLEDGEMENTS --

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-url]: https://linkedin.com/in/
