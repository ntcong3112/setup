import React from "react";
import {
  emailValidator,
  passwordValidator,
} from "../components/regexValidator";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
const Login = () => {
  const history = useHistory();

  const [input, setInput] = React.useState({
    nuber: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = React.useState(1);
  const [user, setUser] = React.useState({});
  const [errorMessage, seterrorMessage] = React.useState("");
  const [successMessage, setsuccessMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (localStorage.getItem("auth")) history.push("/");
  }, []);

  const formSubmitterStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .get("https://api.secretspage.com/api/user?number=" + input.number)
      .then((data) => {
        if (data.data.firstLogin) {
          setStep(3);
          setLoading(false);
          seterrorMessage("");
          setsuccessMessage(
            `Cảm ơn ${data.data.number} đã mua hàng, hãy tạo mật khẩu mới cho lần đăng nhập tiếp theo`
          );
        } else {
          setStep(2);
          setLoading(false);
          seterrorMessage("");
          setsuccessMessage("Vui lòng nhập mật khẩu");
        }
      })
      .catch(function (error) {
        setLoading(false);
        seterrorMessage("Số điện thoại mua hàng không tồn tại");
      });
  };

  const formSubmitterStep2 = (e) => {
    e.preventDefault();
	if(input.password.length <6){
		seterrorMessage("Mật khẩu có ít nhất 6 ký tự");
		return;
	}
	setLoading(true);
	axios.post("https://api.secretspage.com/api/user/login", {
		number: input.number,
		password: input.password,
	}).then(function (res) {
		setLoading(false);
		history.push({
			pathname: '/setup',
			state: res.data
		});
	}).catch(function (res) {
		setLoading(false);
		seterrorMessage("Mật khẩu không đúng!");
	})
  };

  const formSubmitterStep3 = (e) => {
    e.preventDefault();
	if(input.password.length <6){
		seterrorMessage("Mật khẩu phải có ít nhất 6 ký tự");
		return;
	}
    if (input.password !== input.confirmPassword) {
      seterrorMessage("Mật khẩu không khớp");
      return;
    } else {
      setLoading(true);
      axios
        .post("https://api.secretspage.com/api/user/update-password", {
          number: input.number,
          password: input.password,
          firstLogin: false,
        })
        .then((data) => {
          setLoading(false);
          setsuccessMessage("Tạo tài khoản thành công");
            history.push({
				pathname: '/setup',
				state: data.data
			});
        })
        .catch(function (error) {
          setLoading(false);
          seterrorMessage("Vui lòng tạo lại mật khẩu");
        });
    }
  };

  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("images/bg-01.jpg")' }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress/>
              </Box>
            ) : step === 1 ? (
              <form
                className="login100-form validate-form"
                onSubmit={formSubmitterStep1}
              >
                <span className="login100-form-title p-b-49">Login</span>
                {errorMessage.length > 0 && (
                  <div style={{ marginBottom: "10px", color: "red" }}>
                    {errorMessage}
                  </div>
                )}
                {successMessage.length > 0 && (
                  <div style={{ marginBottom: "10px", color: "green" }}>
                    {successMessage}
                  </div>
                )}
                <div
                  className="wrap-input100 validate-input m-b-23"
                  data-validate="email is required"
                >
                  <span className="label-input100">
                    Số điện thoại mua hàng:
                  </span>
                  <input
                    className="input100"
                    type="text"
                    name="number"
                    placeholder="0123456789"
                    onChange={handleChange}
                  />
                  <span className="focus-input100" data-symbol="" />
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn">Xác nhận</button>
                  </div>
                </div>
                <div className="txt1 text-center p-t-54 p-b-20">
                  <span>Support</span>
                </div>
                <div className="flex-c-m">
                <a href="https://www.facebook.com/ntcongg/" className="login100-social-item bg1">
                  <i className="fa fa-facebook" />
                </a>
                <a href="https://www.instagram.com/_augustine.ng/" className="login100-social-item bg2">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#" className="login100-social-item bg3">
                  <i className="fa fa-google" />
                </a>
              </div>
                {/* <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">Or Sign Up Using</span>
                <a href="#" className="txt2">
                  Sign Up
                </a>
              </div> */}
              </form>
            ) : step === 2 ? (
              <form
                className="login100-form validate-form"
                onSubmit={formSubmitterStep2}
              >
                <span className="login100-form-title p-b-49">Login</span>
                {errorMessage.length > 0 && (
                  <div style={{ marginBottom: "10px", color: "red" }}>
                    {errorMessage}
                  </div>
                )}
                {successMessage.length > 0 && (
                  <div style={{ marginBottom: "10px", color: "green" }}>
                    {successMessage}
                  </div>
                )}
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span className="label-input100">Password</span>
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    onChange={handleChange}
                  />
                  <span className="focus-input100" data-symbol="" />
                </div>
                <div className="text-right p-t-8 p-b-31">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn">Xác nhận</button>
                  </div>
                </div>
                <div className="txt1 text-center p-t-54 p-b-20">
                  <span>Or Sign Up Using</span>
                </div>
                <div className="flex-c-m">
                <a href="https://www.facebook.com/ntcongg/" className="login100-social-item bg1">
                  <i className="fa fa-facebook" />
                </a>
                <a href="https://www.instagram.com/_augustine.ng/" className="login100-social-item bg2">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#" className="login100-social-item bg3">
                  <i className="fa fa-google" />
                </a>
              </div>
                {/* <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">Or Sign Up Using</span>
                <a href="#" className="txt2">
                  Sign Up
                </a>
              </div> */}
              </form>
            ) : (
              <form
                className="login100-form validate-form"
                onSubmit={formSubmitterStep3}
              >
                <span className="login100-form-title p-b-49">Login</span>
                {errorMessage.length > 0 && (
                  <div style={{ marginBottom: "10px", color: "red" }}>
                    {errorMessage}
                  </div>
                )}
                {successMessage.length > 0 && (
                  <div style={{ marginBottom: "10px", color: "green" }}>
                    {successMessage}
                  </div>
                )}
                <div
                  className="wrap-input100 validate-input m-b-23"
                  data-validate="Password is required"
                >
                  <span className="label-input100">Password</span>
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    onChange={handleChange}
                  />
                  <span className="focus-input100" data-symbol="" />
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span className="label-input100">Confirm Password</span>
                  <input
                    className="input100"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                  <span className="focus-input100" data-symbol="" />
                </div>

                <div className="text-right p-t-8 p-b-31">
                  {/* <a href="#">Forgot password?</a> */}
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn">Xác nhận</button>
                  </div>
                </div>
                <div className="txt1 text-center p-t-54 p-b-20">
                  <span>Support</span>
                </div>
                <div className="flex-c-m">
                <a href="https://www.facebook.com/ntcongg/" className="login100-social-item bg1">
                  <i className="fa fa-facebook" />
                </a>
                <a href="https://www.instagram.com/_augustine.ng/" className="login100-social-item bg2">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#" className="login100-social-item bg3">
                  <i className="fa fa-google" />
                </a>
              </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div id="dropDownSelect1" />
    </div>
  );
};

export default Login;
