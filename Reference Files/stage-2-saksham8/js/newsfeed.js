
var apiKey = 'apiKey=6048dfa566834c39add3761dbb4b75c9';
var url = 'https://newsapi.org/v2/top-headlines?';

var newsChannels = ['abc-news', 'bbc-news', 'bbc-sport', 'business-insider', 
					'buzzfeed', 'cbc-news', 'cnbc', 'cnn', 'daily-mail', 
					'the-new-york-times', 'the-washington-post', 'the-washington-times'];

var newsType = ['top-headlines', 'everything'];

function checkboxClick() {
	for(let i = 0; i < newsChannels.length; i++) {
		url = url.replace('sources=' + newsChannels[i] + '&', "");
	}
	for(let i = 0; i < newsChannels.length; i++) {
		let newsChannel = $('#' + newsChannels[i]);
		if(newsChannel[0].checked == true) {
			url = url + 'sources=' + newsChannels[i] + '&';
		} else {
			url = url.replace('sources=' + newsChannels[i] + '&', "");
		}
	}
	console.log(url + apiKey);
	fetchData(url + apiKey);
}

var searched = [];

function searchCheckbox() {
	$('#news-articles').empty();
	let searchTag = $('#search');
	let searchKeyword = searchTag[0].value;
	searched.push(searchKeyword);

	for(let j = 0; j < searched.length; j++) {
		url = url.replace('q=' + searched[j] + '&', "");
	}

	let newsT = $("#" + newsType[0]);
	let newsE = $("#" + newsType[1]);
	if(newsT[0].checked == true && newsE[0].checked == false) {
		if(url.includes("everything?")) {
			url = url.replace('everything?', 'top-headlines?') + 'q=' + searchKeyword + '&';
		} else {
			url = url + 'q=' + searchKeyword + '&';
		}
	} else if(newsE[0].checked == true && newsT[0].checked == false) {
		url = url.replace('top-headlines?', 'everything?') + 'q=' + searchKeyword + '&';
	}
	fetchData(url + apiKey);
}

function fetchData(url) {
	var req = new Request(url);
	fetch(req)
	    .then(function(response) {
			return response.json();})
	    .then(function(data) {
			renderArticles(data);})
	    .catch(function(error) {
			renderError(error);})
}

function renderArticle(articleObj) {

	let containerElement = $('#news-articles')
	let card = $('<div />');
	card.addClass('card');

	let articleTitle = $('<h2 />');
	let textNode = document.createTextNode(articleObj.title);

	let articleLink = document.createElement("A");
	articleLink.setAttribute("href", articleObj.url);
	articleLink.setAttribute("target", "_blank");
	articleLink.append(textNode);
	articleTitle.append(articleLink);
	card.append(articleTitle);

	if(articleObj.author != null && articleObj.author != "" && articleObj.author != articleObj.source.name) {
		let articleAuthor = $('<p />');
		articleAuthor.addClass('fa fa-pencil-square-o fa-sm');
		articleAuthor.addClass('author');
		articleAuthor.text(articleObj.author + '(' + articleObj.source.name + ')');
		card.append(articleAuthor);
	} else {
		let articleSource = $('<p />');
		articleSource.addClass('fa fa-pencil-square-o fa-sm');
		articleSource.addClass('author');
		articleSource.text(articleObj.source.name);
		card.append(articleSource);
	}

	let publishedAt = $('<p />');
	publishedAt.addClass('fa fa-calendar fa-sm');
	publishedAt.addClass('date-published');
	publishedAt.text(articleObj.publishedAt.slice(0, 10));
	card.append(publishedAt);

	let paragraphElement = $('<p />');
	paragraphElement.text(articleObj.description);
	card.append(paragraphElement);

	containerElement.append(card);
}

function renderArticles(obj) {
  let articlesArray = obj.articles;
  // $('#news-articles').empty();
  if(articlesArray.length == 0) {
    renderError(new Error("No results found"));
  }
  console.log(articlesArray);
  articlesArray.forEach(renderArticle);
}

function renderError(errorObj) {
    let errorMessage = errorObj.message;
    let errorMessageTag = $('<p />');
    errorMessageTag.addClass('alert alert-danger');
    errorMessageTag.text(errorMessage);
    $('#records').append(errorMessageTag);
}
