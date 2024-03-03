import { useNavigate } from "react-router-dom";
import { ILogin} from "../../interfaces"
import './SignUp.css'

const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const { Name:{value:Name},Email: { value: Email }, Password: { value: Password } } = e.target as typeof e.target & ILogin

    {localStorage.setItem('Name',Name)
    localStorage.setItem("Email",Email)
    localStorage.setItem("Password",Password)}

    navigate("/userPage")
    };

    return (
        <div className="mainSignUp">
            <form onSubmit={handleSubmit} className="container">
                <h1>Sign Up</h1>
                <div className="inputs">
                    <input type="text" name="Name" placeholder="Name" className="inputItem"/>
                    <input type="email" name="Email" placeholder="Email"  className="inputItem"/>
                    <input type="password" name="Password" placeholder="Password"  className="inputItem"/>
                </div>
                <button className="signUpButton">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;