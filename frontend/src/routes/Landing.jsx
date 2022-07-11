import { useNavigate, Outlet } from "react-router-dom";
import Button from "../components/UI/Button";
import Hero from "../components/UI/Hero";
const Landing = () => {
  let navigate = useNavigate();
  return (
    <div>
      <nav className="navbar bg-base-100 flex px-4">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">toDidit</a>
        </div>
        <div className="flex gap-4">
          <Button
            text={"Login"}
            onClick={() => {
              navigate("login");
            }}
          />
        </div>
      </nav>
      <Hero
        onClick={() => {
          navigate("/register");
        }}
      />
      <Outlet />
    </div>
  );
};

export default Landing;
