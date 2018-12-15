let page = $.getJSON('http://allorigins.me/get?url=https%3A//ischool.uw.edu/events%3Ftype%3D%26aud%3D%26program%3D&callback=?', function(data){
	return $('#output').html(data.contents);
});

console.log(page);