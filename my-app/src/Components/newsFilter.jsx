import React, { Component } from 'react';
import CheckboxContainer from './CheckboxContainer';

class NewsFilter extends Component {
    render() {
        return (
            <div className="rightcolumn">
                <div class="newsCard">
                    <h3 id="news-channels">News Channels</h3>
                    <CheckboxContainer />
                    <br />
                </div>
            </div>
        );
    }
}

export default NewsFilter