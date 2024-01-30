import React from 'react';
import { Link } from 'react-router-dom';
import {motion,AnimatePresence} from "framer-motion";


const List = ({ movie }) => {
    const img_url = "https://image.tmdb.org/t/p/w500";
    return (
        <div>
            {
                movie.length === 0 ? (<h1>Loading...</h1>) : (
                    <motion.div 
                    layout
                    animate={{opacity:1,scale:1}}
                    initial={{opacity:0,scale:0}}
                    exit={{opacity:0}}
                    
                    className='w-[70%] mx-auto grid grid-cols-5 gap-x-5 gap-y-10 py-5'>
                        <AnimatePresence>
                        {
                            movie.map((movies) => (
                                <Link to={"Detail/" + movies.id} key={movies.id}>
                                    <div className='h-[40vh] cursor-pointer group overflow-hidden'>
                                        <img src={img_url+movies.poster_path} alt='' className='
                    object-cover w-full rounded-lg h-[90%] group-hover:scale-105
                     transition duration-300 ease-in-out' />
                                        <h1 className='text-sm'>{movies.title}</h1>
                                    </div>
                                </Link>
                            ))
                        }
                        </AnimatePresence>
                    </motion.div >
                )}
        </div>

    )
}

export default List