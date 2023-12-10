import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import OktaSignInWidget from "./OktaSignInWidget";

// sử dụng destructuring assignment để rút gọn cú pháp 
//và lấy giá trị từ thuộc tính cụ thể của đối tượng được truyền vào.
const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (error) => {
        console.log('Sign in error', error);
    }

    if(!authState){
        return (
            <SpinnerLoading/>
        )
    }

    return authState.isAuthenticated ?
    <Redirect to={ {pathname: '/'}}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
};

export default LoginWidget;