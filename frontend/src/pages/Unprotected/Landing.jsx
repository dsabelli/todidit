import { useNavigate } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
const Landing = () => {
  let navigate = useNavigate();
  return (
    <div>
      <UNavbar isLanding />
      <Hero
        onClick={() => {
          navigate("/register");
        }}
      />
    </div>
  );
};

export default Landing;
