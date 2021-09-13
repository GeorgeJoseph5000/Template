import React, { createContext, useState, useEffect } from 'react';
import NavigationBar from './components/ui/NavigationBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { auth, db } from './firebase'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import About from './components/pages/About'
import Profile from './components/pages/Profile'
import './styles/style.css'
import CompleteRegister from './components/pages/CompleteRegister'
import Loading from './components/ui/Loading';
import Footer from './components/ui/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext(null)
export const LangContext = createContext("en")

function App() {
  
  const [userPackage, setUserPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState("en")

  const changeLang = (lang) => {
    setLang(lang)
  } 

  const addCompleteRegister = (user, data) => {
    setUserPackage({user, data})
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        db.collection("users").doc(authUser.uid).onSnapshot((doc) => {
          if(doc.exists){
            setUserPackage({user: authUser, data: doc.data()})
            setLoading(false)
          } else {
            setLoading(false)
            if(window.location.href != "http://localhost:3000/completeregister") {
              window.location.href = "http://localhost:3000/completeregister"
            }
          }
        })
      }else{
        setUserPackage(null)
        setLoading(false)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (  
      <div className="App" dir={lang == "ar" ? "rtl" : "ltl"}>
        <BrowserRouter>
          <LangContext.Provider value={{ lang, changeLang }}>
            <UserContext.Provider value={{userPackage, addCompleteRegister}}>
              {loading ? (<Loading/>) : (
                <>
                  <NavigationBar/>
                  <main>
                    <Switch>
                      <Route path="/" exact>
                        <Home/>
                      </Route>
                
                      <Route path="/about" exact>
                        <About/>
                      </Route>
                      
                      <Route path="/profile" exact>
                        <Profile/>
                      </Route>
                
                      <Route path="/register" exact>
                        <Register/>
                      </Route>
                
                      <Route path="/login" exact>
                        <Login/>
                      </Route>
                
                      <Route path="/completeregister" exact>
                        <CompleteRegister/>
                      </Route>
                
                    </Switch>
                  </main>
                  <Footer/>
                </>
              )}
            </UserContext.Provider>
          </LangContext.Provider>
        </BrowserRouter>
      </div>
)


}

export default App;
