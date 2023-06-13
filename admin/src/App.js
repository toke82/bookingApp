import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, userColumns, roomColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtetedRoute = ({children}) => {
    const {user} = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route 
              index 
              element={
                <ProtetedRoute>
                  <Home />
                </ProtetedRoute>                
              } 
            />
            
            <Route path="users">
              <Route index element={ <ProtetedRoute>
                  <List columns={userColumns}/>  
                </ProtetedRoute>} />
              <Route path=":userId" element={ <ProtetedRoute>
                  <Single />
                </ProtetedRoute> } />
              <Route path="new" element={ <ProtetedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtetedRoute> } />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtetedRoute><List columns={hotelColumns} /></ProtetedRoute>} />
              <Route path=":productId" element={<ProtetedRoute>
                  <Single />
                </ProtetedRoute>} />
              <Route
                path="new"
                element={<ProtetedRoute>
                    <NewHotel />
                  </ProtetedRoute>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtetedRoute><List columns={roomColumns} /></ProtetedRoute>} />
              <Route path=":productId" element={<ProtetedRoute>
                  <Single />
                </ProtetedRoute>} />
              <Route
                path="new"
                element={<ProtetedRoute>
                    <NewRoom />
                  </ProtetedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
