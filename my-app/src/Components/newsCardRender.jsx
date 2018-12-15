import React from 'react';
import 'whatwg-fetch';
import CheckboxContainer from './CheckboxContainer';

class NewsCardRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            url: "https://newsapi.org/v2/top-headlines?"
        };
    }

    createApiCallURL() {
        this.state.url = "https://newsapi.org/v2/top-headlines?";
        this.countNum++;
        var apiKey = 'apiKey=6048dfa566834c39add3761dbb4b75c9';

        if(this.props.dataFromParent != null) {

            var keys = Array.from(this.props.dataFromParent.keys());
            var boolValues = Array.from(this.props.dataFromParent.values());

            for(let i = 0; i < keys.length; i++) {
                if(this.props.dataFromParent.get(keys[i])) {
                    this.state.url = this.state.url + 'sources=' + keys[i] + '&';
                } else {
                    this.state.url = this.state.url.replace('sources=' + keys[i] + '&', "");
                }
            }
            this.state.url = this.state.url + apiKey;
            this.fetchData();

        }
    }

    fetchData() {
        if(this.state.url != null && this.state.url.includes("sources=")) {
            fetch(this.state.url)
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.articles
                });
                },
                (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
                }
            )
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    renderAuthorInfo(author, objArticle) {
        if(author != null && author != "" && author != objArticle.source.name) {
            return (
                <p className="fa fa-pencil-square-o fa-sm author">{" " + author + ' (' + objArticle.source.name + ')'}</p>
            );
        } else {
            return (
                <p className="fa fa-pencil-square-o fa-sm author">{" " + objArticle.source.name}</p>
            );
        }
    }

    render() {
        this.createApiCallURL();
        const { error, isLoaded, items } = this.state;
        if (error) {

            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="choose">Choose a Channel...</div>;
        } else {
            return (
                <div>
                    {items.map(item => (
                        <div className="newsCard">
                            <a href={item.url} target="_blank">
                                <h2>{item.title}</h2>
                            </a>
                            {this.renderAuthorInfo(item.author, item)}
                            <p className="fa fa-calendar fa-sm date-published">{" " + item.publishedAt.slice(0, 10)}</p>
                            <p className="description">{item.description}</p>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default NewsCardRender;