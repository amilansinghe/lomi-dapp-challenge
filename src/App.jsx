import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CampaignDetail from "./Pages/CampaignDetail";
import CreateCampaign from "./Pages/CreateCampaign";
import About from "./Pages/About";
import Campaigns from "./Pages/Campaigns";
import HowItWorks from "./Pages/HowItWorks";
import MyCampaigns from "./Pages/MyCampaigns";
import ScrollToTop from "./Components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { MainProvider } from "./Context/MainContext"; // <-- import your provider

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <div className="bg-gray-950">
          <Navbar />
          <ScrollToTop />
          <Toaster position="top-center" /> {/* <- Add Toaster here */}
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/my-campaigns" element={<MyCampaigns />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </MainProvider>
  );
}

export default App;
