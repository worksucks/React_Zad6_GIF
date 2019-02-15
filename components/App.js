
var GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';
var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'q1MLo0EO8pEkbEeimt8RaXsAHuttdlnt'

var styles = {
    margin: '0 auto',
    textAlign: 'center',
    width: '90%'
};

App = React.createClass({

      getInitialState() {
        return {
          loading: false,
          searchingText: '',
          gif: {}
        };
      },

      handleSearch: function(searchingText) {
          this.setState({loading: true});
          this.getGif(searchingText, function(gif) {
            this.setState({
              loading: false,
              gif: gif,
              searchingText: searchingText
            });
          })
        },

        getGif: function(searchingText) {

            return new Promise(function(resolve, reject) {

              var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
              var xhr = new XMLHttpRequest();
              xhr.onload = function() {
              if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif = {
                  url: data.fixed_width_downsampled_url,
                  sourceUrl: data.url
                };
                resolve(gif)
              } else reject()
              };
              xhr.send();

          })
      }

        render: function() {
        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
            <Gif
              loading={this.state.loading}
              url={this.state.gif.url}
              sourceUrl={this.state.gif.sourceUrl}/>
          </div>

        );
    }
});
