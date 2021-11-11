import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general' 
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props);
        console.log("Hello from news compo construcctor");
        this.state = {
            articles:[],
            totalResults:0,
            loading: false ,
            page: 1
        };
        document.title = `NewsJedi | ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({articles: parseData.articles, totalResults: parseData.totalResults,loading:false});
        this.props.setProgress(100);
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93c519550f0f4fa5bd5185a7105f2faa&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({articles: parseData.articles, totalResults: parseData.totalResults,loading:false});
        this.updateNews();
    } 

    handlePrevClick = async()=> {
        // console.log("Prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93c519550f0f4fa5bd5185a7105f2faa&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
        //     loading:false
        // });
        this.setState({page:this.state.page -1});
        this.updateNews();
    }
    handleNextClick = async()=> {
        console.log("Next");
        if(this.state.page+1 > Math.ceil(this.state.articles.totalResults/this.props.pageSize)){

        }
         else{
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93c519550f0f4fa5bd5185a7105f2faa&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true});
            // let data = await fetch(url);
            // let parseData = await data.json();
            // this.setState({
            //     page: this.state.page + 1,
            //     articles: parseData.articles,
            //     loading:false
            // });
            this.setState({page: this.state.page + 1});
            this.updateNews();
        }
    }

    fetchMoreData = async() => {
        this.setState({page:this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93c519550f0f4fa5bd5185a7105f2faa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
       
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles: this.state.articles.concat(parseData.articles),
                         totalResults: parseData.totalResults});
      };

    render() {
        return (
            <>
                <h2 className="text-center" style={{margin : '30px 0px'}}>NewsJedi- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                    >
                <div className="container">
                <div className="row mx-3">
                {/* !this.state.loading && */}
                {this.state.articles.map((element)=>(
                        <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} 
                                description={element.description?element.description.slice(0,88):""} 
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                source={element.source.name}/>
                        </div>
                    ))} 
                </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News
