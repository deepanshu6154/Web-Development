import React, { Component } from 'react'
import { getMovies } from './MovieSevice'
import './Movie.css'

export default class Movie extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            movies:getMovies() ,
            currSearchText: '' ,
            limit: '4' ,
            currPage: '1'}
     }
    onDelete=(id)=>{

        let filterMovies = this.state.movies.filter(movieObj=>{
            return id!=movieObj._id    ;
        });
        this.setState({movies:filterMovies});
    }

    handleChange=(e)=>{
        let task = e.target.value;
        this.setState({currSearchText:task}) ;
    }

    handlePageChange=(pageNumber)=>{
        this.setState({currPage:pageNumber});
    }

    handleLimit=(e)=>{
        let num = Number(e.target.value);
        this.setState({limit:num})
    }
    sortByRate=(e)=>{
        let className = e.target.className;
        let sortedArr = [];
        if(className=='fas fa-sort-up')
        {
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieA.dailyRentalRate - movieB.dailyRentalRate;
            })
        }
        else
        {
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieB.dailyRentalRate - movieA.dailyRentalRate;
            })
        }

        this.setState({
            movies:sortedArr
        })
    }

    sortByStock=(e)=>{
        let className = e.target.className;
        let sortedArr = [];
        if(className=='fas fa-sort-up')
        {
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieA.numberInStock - movieB.numberInStock;
            })
        }
        else
        {
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieB.numberInStock - movieA.numberInStock;
            })
        }

        this.setState({
            movies:sortedArr
        })
    }


    render() {
        let {movies,currSearchText,limit,currPage} = this.state ;
        let filteredMovieArr = [];
        if(currSearchText!='')
        {
             filteredMovieArr = movies.filter(movieObj=>{
                let title = movieObj.title.trim().toLowerCase();
                return title.includes(currSearchText.toLowerCase());
            })

        }
        else
        {
            filteredMovieArr = movies ;
        }
        
        //  Pagination & limit
        let numberOfPages = Math.ceil(filteredMovieArr.length/limit) ;
        let pageNumArr = [];
        for(let i=0;i<numberOfPages;i++)
        {
            pageNumArr[i] = i+1;
        }
        let ei = Number(this.state.currPage) * Number(this.state.limit) ;
        let si = ei - this.state.limit ;
        filteredMovieArr = filteredMovieArr.slice(si,ei);


        return (
            
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <h1>Title</h1>
                        <h1>Genre</h1>
                        <h1>Stock</h1>
                        <h1>Rating</h1>
                    </div>
                    <input onChange={this.handleChange} value={this.state.currSearchText} type='text'></input>
                    <input type='number' value={this.state.limit>filteredMovieArr.length?filteredMovieArr.length:this.state.limit} min='1' max={this.state.movies.length} onChange={this.handleLimit}></input>
                    <div className='col-9'>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                            <th scope='col'>#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">
                                <i className="fas fa-sort-up" onClick={this.sortByStock} ></i>
                                 Stock
                                <i className="fas fa-sort-down" onClick={this.sortByStock}></i>
                            </th>
                            <th scope="col">
                                <i className="fas fa-sort-up" onClick={this.sortByRate}></i>
                                 Rate
                                <i className="fas fa-sort-down" onClick={this.sortByRate}></i>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                filteredMovieArr.map(movieObj =>(
                                    <tr scope='movie-item' key={movieObj._id}>
                                    <td></td>
                                    <td>{movieObj.title}</td>
                                    <td>{movieObj.genre.name}</td>
                                    <td>{movieObj.numberInStock}</td>
                                    <td>{movieObj.dailyRentalRate}</td>
                                    <button type="button" className="btn btn-danger" onClick={()=>this.onDelete(movieObj._id)}>Delete</button>
                                    </tr>
                                ))
                                
                            }
                        </tbody>           
                    </table>
                        <nav aria-label="...">
                        <ul className="pagination pagination-lg">
                            {
                                pageNumArr.map(pageNumber=>{
                                    let classStyleName = pageNumber==currPage?'page-item active':'page-item' ;
                                    return(
                                        <li onClick={()=>this.handlePageChange(pageNumber)} className={classStyleName} aria-current="page" key={pageNumber}>
                                            <span className='page-link'>{pageNumber}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </nav>
                    </div>
                </div>
            </div>




)
}
}


/* <li class="page-item active" aria-current="page">
<span class="page-link">
    1
    <span class="sr-only">(current)</span>
</span>
</li>
<li class="page-item"><a class="page-link" href="#">2</a></li>
<li class="page-item"><a class="page-link" href="#">3</a></li> */