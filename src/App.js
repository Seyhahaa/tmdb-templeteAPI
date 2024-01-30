import {Link,Route,Routes} from 'react-router-dom';
import List from './Components/List';
import Detail from './Components/Detail';
import { useEffect, useState } from 'react';

function App() {

  const [movie,setMovie] = useState([]);
  const [searchKeyWord,setSearchKeyWord] = useState("");

  const getAllMovie = async (searchKeyWord)=> { 

    const url = searchKeyWord ? "https://api.themoviedb.org/3/search/movie" : "https://api.themoviedb.org/3/discover/movie";
    const key = "50b6adc5e66a2375cbd8189fbba26e37";

    const res =await fetch(`${url}?api_key=${key}&&query=${searchKeyWord}`);
    const movie = await res.json();
    setMovie(movie.results);
    console.log(searchKeyWord);
  }

  useEffect(()=>{
    getAllMovie(searchKeyWord);
  },[])

  return (
    <div className="App">
      <div className="p-2 flex justify-center fixed z-20 w-full">
        <input placeholder="Search movie..." className="rounded-lg px-2 py-1" value={searchKeyWord} onChange={e => setSearchKeyWord(e.target.value)} />
        <button className="rounded-lg px-2 py-1" onClick={()=>{
          getAllMovie(searchKeyWord);
          setSearchKeyWord("");
        }}>Search</button>
      </div>

      {/* Navbar */}

      <div className="pt-10">
{
  <Routes>
    <Route path='/' element={<List movie={movie} />} />
    <Route path='/detail/:id' element={<Detail />} />
  </Routes>
}
      </div>

    </div>
  );
}

export default App;
