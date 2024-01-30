import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {motion,AnimatePresence} from "framer-motion";


const Detail = () => {
    const id = useParams().id;

    const [SingleMovie,setSingleMovie] = useState({});
    const [trailerKey,setTrailerKey] = useState("");
    const [dispalay,setDisplay] = useState(false);

    const getMovie = async () => {


        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=50b6adc5e66a2375cbd8189fbba26e37&&append_to_response=videos`
        const res = await fetch(url);
        const movie = await res.json();
        console.log(movie);
        setSingleMovie(movie);
    }
    useEffect(() => {
        getMovie();
    }, [])

    const playtrailer = () =>{
        const trailer = SingleMovie.videos.results.find((video)=> video.name === "Official Trailer");
        setTrailerKey(trailer.key);
        setDisplay(!dispalay);
    }

    const img_url = "https://image.tmdb.org/t/p/w500";

    return (
        SingleMovie ? (
        <div>

            <img src={img_url+SingleMovie.backdrop_path}
                className='fixed w-full h-screen object-cover blur-sm -z-10' alt="" />
            <div className='w-[70%] mx-auto'>
                <div className='flex justify-between'>
                    <div className='mt-20'>
                    <AnimatePresence>
                        <motion.div 
                        layout
                        animate={{opacity:1,x:0}}
                        initial={{opacity:0,x:50}}
                        exit={{opacity:0,x:0}}>
                        
                        <img src={img_url+SingleMovie.poster_path} className='w-48 h-72 rounded-lg' alt="" />
                        <button className='mt-4 px-3 py-1 rounded-lg' onClick={playtrailer}>{dispalay ? "Close trailer" : "Play trailer"}</button>

                        {
                            dispalay && (
                                <iframe title='Play trailer' width={420} height={315} allowFullScreen frameborder="0" 
                        className='mt-2 w-80 h-52 rounded-lg'
                            src={`https://www.youtube.com/embed/${trailerKey}`} >

                        </iframe>
                            )
                        }
                        </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className='
            fixed right-0 backdrop-blur-lg h-screen w-[50vw] top-0 flex flex-col p-10 overflow-hidden'>
                    <motion.div layout>
                        <h1 className='mt-10 text-2xl font-bold tracking-wide'>{SingleMovie.title}</h1>
                    </motion.div>
                        <p className='mt-2'>{SingleMovie.vote_average}</p>
                        <p className='mt-2'>{SingleMovie.release_date}</p>
                        <hr className='mt-2' />
                        <p className='mt-2 text-sm'>{SingleMovie.overview}</p>
                        <hr className='mt-2' />

                         {
                            SingleMovie.genres?.map((gen)=>(
                                <p className='mt-2' key={gen.id}>{gen.name}</p>
                            ))
                         }   
                        <hr className='mt-2' />
                        {
                            SingleMovie.production_countries?.map((coun)=>(
                                <h1 className='text-md mt-2 uppercase font-bold' key={coun.id}>{coun.name}</h1>
                            ))
                        }
                        <hr className='mt-2' />
                        {
                            SingleMovie.production_companies?.map((com)=>(
                                <p className='mt-2 text-sm' key={com.id}>{com.name}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        ) :(
            <>
                <h1>Loading...</h1>
            </>
        )
    )
}

export default Detail;