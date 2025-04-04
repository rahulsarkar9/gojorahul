import Batchlistpage from "./pages/batchlistpage";
import Createbatchpage from "./pages/createbatchpage";
import Homepage from "./pages/homepage";
import Registrationpage from "./pages/registrationpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Updatepage from "./pages/updatepage";

import Studentlistpage from "./pages/studentlistpage";
import Updatestudentpage from "./pages/updatestudentpage";

import Loginpage from "./pages/loginpage";
import Studentdashboardpage from "./pages/studentdashboardpage";
import Trainerregistrationpage from "./pages/trainerregistrationpage";
import Trainerlistpage from "./pages/trainerlistpage";
import Updatetrainerpage from "./pages/updatetrainerpage";
import Trainerdashboardpage from "./pages/trainerdashboardpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registrationpage />} />
          <Route
            path="/trainer-register"
            element={<Trainerregistrationpage />}
          />

          <Route path="/createbatch" element={<Createbatchpage />} />
          <Route path="/batchlist" element={<Batchlistpage />} />
          <Route path="/update/:id" element={<Updatepage />} />
          <Route path="/studentlist" element={<Studentlistpage />} />
          <Route path="/updatestudent/:id" element={<Updatestudentpage />} />

          <Route path="/trainerlist" element={<Trainerlistpage />} />
          <Route path="/updatetrainer/:id" element={<Updatetrainerpage />} />

          <Route path="/login" element={<Loginpage />} />
          <Route path="/studentdashboard" element={<Studentdashboardpage />} />
          <Route path="/trainerdashboard" element={<Trainerdashboardpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
