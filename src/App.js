import "./App.css";
import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Login.js";
import {Menu} from "./Menu";
import {ForgotPassword} from "./ForgotPassword";
import {Upload} from "./Upload";
import NoMatch from "./NoMatch";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { Edit } from "./Edit";
import { UploadChapter } from "./UploadChapter";
import  Pages  from "./Pages";
import Chapitres from "./Chapitres";
import Favorites from "./Favorites";
import {TokenContexte} from "./ContextToken";
import {IdContexte} from "./ContextId";

function App() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const tokenGlobal = {token, setToken};
    const [Id, setId] = useState(sessionStorage.getItem("id"));
    const IdGlobal = {Id, setId};

  return (
      <div className="App">
          <TokenContexte.Provider value={tokenGlobal}>
          <IdContexte.Provider value={IdGlobal}>
          <BrowserRouter>
            <Menu />
            <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path="/Login" element={<Login/>}/>
                <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
                  <Route path="/upload" element={<Upload/>}/>
                   <Route path="/manga/:mangaId/uploadChapter" element={<UploadChapter/>}/>
                   <Route path="/profile/:userId" element={<Profile/>}/>
                <Route path="*" element={<NoMatch />} />
                <Route path="/mangas/:mangaId" element={<Chapitres/>}/> 
                <Route path="/edit/:mangaId" element={<Edit/>}/> 
                <Route path="/mangas/:mangaId/chapters/:chapterId" element={<Pages/>}/>
                <Route path="/favoris" element={<Favorites/>}/>

            </Routes>
          </BrowserRouter>
          </IdContexte.Provider>
          </TokenContexte.Provider>
      </div>
  );
}

export default App;
