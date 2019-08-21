import React, { Component } from "react";
import { CSSTransitionGroup } from 'react-transition-group'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GiphyAPI from '../../api/giphy';

class GiphyGallery extends Component {
    constructor(props){
        super(props);

        this.state = {
            gallery: [],
            loading: false,
            loadCount: 8,
            error: ''
        }

        this.updateGallery = this.updateGallery.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.trendingGallery = this.trendingGallery.bind(this);
    }

    componentDidMount(){
        this.trendingGallery();
    }

    componentDidUpdate(oldProps){
        if (this.props.search !== oldProps.search){
            console.log('searching for:', this.props.search);
            this.setState({loading: true, gallery: []});
            this.updateGallery(this.props.search, 8);
        }
    }

    trendingGallery = async () => {
        try {
            const gallery = await GiphyAPI.trending(this.state.loadCount);
            console.log(gallery.data);
            this.setState({loading: false, gallery: gallery.data});
        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    updateGallery = async (searchTerm, gifQuantity) => {
        this.setState({loading: true});
        var gallery = undefined;
        try {
            if (this.props.search === ''){
                gallery = await GiphyAPI.trending(gifQuantity);
            } else{
                gallery = await GiphyAPI.search(searchTerm, gifQuantity);
            }
            this.setState({loading: false, gallery: gallery.data});
        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    loadMore = async () => {
        const oldCount = this.state.loadCount;
        const newCount = oldCount + 4;
        this.setState({loadCount: oldCount + 4});
        var gallery = undefined;
        if (this.props.search === ''){
            gallery = await GiphyAPI.trending(newCount);
        } else{
            gallery = await GiphyAPI.search(this.props.search, newCount);
        }
        this.setState({gallery: this.state.gallery.concat(gallery.data.slice(oldCount))});
    }

    render() {

        const gifGallery = this.state.gallery.map(item => (
            <div key={item.id} className="gif-item">
                <img src={item.images.original.url} />
            </div>
        ));

        return (
            <div>
                <Typography>
                    {this.state.error}
                </Typography>
                <Typography>
                    {this.state.loading ? 'Loading' : ''}
                </Typography>

                <div className="gif-gallery">
                    <CSSTransitionGroup
                      transitionName="example"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}>
                        {gifGallery}
                    </CSSTransitionGroup>
                </div>

                <div className="load-more-btn">
                    <Button onClick={this.loadMore} variant="contained">Load More</Button>
                </div>
            </div>
        );
    }
};

export default GiphyGallery;
