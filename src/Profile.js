import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";

export function Profile() {
    const database = ref(getDatabase());
    const [user, setuser] = useState("");
    const params = useParams();

        useEffect(() => {
            async  function getUser() {   
                get(child(database, `data/Users/` + params.userId )).then((snapshot) => {
                    if (snapshot.exists()) {
                        setuser(snapshot.val());
                    }
                })
               
            }
            getUser();
           
        }, [database, params.userId, user]);
console.log(user);
    
    return (
        user &&
        <><div className="notification">
        <div className="section">
              <img src="/images/apple-touch-icon@2.png" alt="logo"/>
            <h1 className="title is-1 has-text-centered ">{ user.username }'s Profile</h1>
        </div>
        <div class="card">
            <div class="card-content">
                <div className="field">
                
                    <div className="control has-icons-left">
                    <label className="label" htmlFor="email">Join Date : { user.createAt } </label>
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        
                    </div>
                    
                    &nbsp;
                    {user.author  &&
                    <><div className="control has-icons-left">
                                <label className="label" htmlFor="email">This user is an author.</label>

                                <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>

                            </div>

                            &nbsp;
                            
                            {user.mangas.length !== 0  &&
                            <div className="control has-icons-left">
                           
                            <label className="label" htmlFor="email">Mangas authored:</label>
                            {Object.keys(user.mangas).map((key) => (
                                 <><Link to={`/mangas/${user.mangas[key].mangaId}`}>
                                    <label className="label" htmlFor="email" key={key}>{user.mangas[key].name}</label>
                                    </Link>
                                <Link to={`/edit/${user.mangas[key].mangaId}`}>
                                <label className="label" htmlFor="email">Edit manga</label>
                                </Link>
                                &nbsp;</>))}
                                    <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                                </div>}
                                </>
                                
  }
            {!user.author  &&
                    <div className="control has-icons-left">
                    <label className="label" htmlFor="email">This user is a reader.</label>
                 
                  <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                   
               </div>
  }
                </div>
                &nbsp;
                
                <div>
                <button className="button is-dark is-rounded">
                        Update Profile
                    </button>
                    
                    &nbsp;
                    <button className="button is-rounded is-danger">
                        Delete Profile
                    </button>
                    &nbsp;
                    <Link to={`/ForgotPassword`}>
                    <button className="button is-rounded is-dark">
                        Reset Password
                    </button>
                    </Link>
                    &nbsp;
                    <button className="button is-dark is-rounded">
                        Go Back
                    </button>    
                </div>
            </div>
        </div>
    </div></>
    );

}
