import { useSelector } from "react-redux";
import { AuthState } from "../../state/auth/authTypes";
import { stateType } from "../../state/store";

export const WelcomeBanner = () => {
    const authState: AuthState = useSelector((state: stateType) => state.auth);
    return (
        <div className="jumbotron bg-white p-3">
            <h1 className="display-4">Hello, {authState.first_name?.toLocaleUpperCase()}!</h1>
            <p className="lead">This is a simple Online Shopping System.</p>
            <hr className="my-4" />
            <p>Select Categories from left panel or search.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg btn-warning" href="#" role="button">Learn more</a>
            </p>
        </div>
    )
}