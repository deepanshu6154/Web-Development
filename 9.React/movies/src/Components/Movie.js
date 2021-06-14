import React, { Component } from 'react'
import { getMovies } from './MovieSevice'

export default class Movie extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            movies:getMovies() ,
            currSearchText: '' , }
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


    render() {
        let {movies,currSearchText} = this.state ;
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
        // this.setState({movies:filteredMovieArr});


        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <h1>Hello</h1>
                    </div>
                    <input onChange={this.handleChange} value={this.state.currSearchText} type='text'></input>
                    <div className='col-9'>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope='col'>#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
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
                    </div>
                </div>
                
            </div>
        )
    }
}

