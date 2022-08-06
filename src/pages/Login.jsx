import React from "react";
import {
  emailValidator,
  passwordValidator,
} from "../components/regexValidator";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import axios from 'axios';
const Login = () => {
  const history = useHistory();

  const [input, setInput] = React.useState({ name: "", message: "", link: "" });
  const [date, setDate]	= React.useState(new Date("2020-06-13T00:00:00"));
  const [errorMessage, seterrorMessage] = React.useState("");
  const [successMessage, setsuccessMessage] = React.useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (e) => {
    setDate(e);
  };

  React.useEffect(() => {
    if (localStorage.getItem("auth")) history.push("/");
  }, []);

  const formSubmitter = (e) => {
    e.preventDefault();
    setsuccessMessage("");
    if (!input.name)
      return seterrorMessage("Please enter name");
	if (!input.message)
	  return seterrorMessage("Please enter message");
	if (!input.link)
	  return seterrorMessage("Please enter url link");
	  const user = {
		name: input.name,
		message: input.message,
		timeStart: date,
		link: input.link
	  };
	  try{
	  let header ={
		'Access-Control-Allow-Origin': '*'
	
	  

	  }
	  axios.post(`https://api.secretspage.com/api/user/create`, { user }, {
		headers: header
	  })
		.then(res => {

			window.location.href = "https://www.secretspage.com?link=" + input.link;
		})

	}catch(err){
		return seterrorMessage(err)
		
	}
    // if (!passwordValidator(input.password))
    //   return seterrorMessage(
    //     "Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters"
    //   );
    // setsuccessMessage('Successfully Validated');
    // if (input.email !== "admin@a.com" || input.password !== "Password@1")
    //   return seterrorMessage("Invalid email or password");

    // history.push("/");
    // localStorage.setItem("auth", true);
  };

  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("images/bg-01.jpg")' }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form
              className="login100-form validate-form"
              onSubmit={formSubmitter}
            >
              <span className="login100-form-title p-b-49">Setup</span>
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
                data-validate="nhập tên đi má"
              >
                <span className="label-input100">Name</span>
                <input
                  className="input100"
                  type="text"
				  name="name"
                  placeholder="Vd: em iuu"
                  onChange={handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Có gì muốn nhắn gửi không"
              >
                <span className="label-input100">Message</span>
                <textarea
					rows="4"
                  className="input100 text-area-input"
                  name="message"
                  placeholder="Vd: anh yeu em"
                  onChange={handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div
                className="wrap-input100 validate-input"
				
              >
	
				<br />
                <LocalizationProvider dateAdapter={AdapterDateFns} className="input-date">
                  <DateTimePicker
				  	className="input-date"
                    label="Time start loving"
                    value={input.timeStart}
                    onChange={handleChangeDate}
					name="timeStart"
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </LocalizationProvider>

              </div>
			  <br />
			  <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="Nhập url"
              >
		
                <span style={{ marginTop: "20px" }} className="label-input100 ">URL Link(secretspage.com/link)</span>
                <input
                  className="input100"
                  type="text"
				  name="link"
                  placeholder="Vd: emiu  ---> secretspage.com/emiu"
                  onChange={handleChange}
                />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div className="text-right p-t-8 p-b-31">
                <a href="#">...</a>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn">Xác nhận</button>
                </div>
              </div>
              <div className="txt1 text-center p-t-54 p-b-20">
                <span>Donate</span>
              </div>
              <div className="flex-c-m">
                <a href="#" className="login100-social-item bg1">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#" className="login100-social-item bg2">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#" className="login100-social-item bg3">
                  <i className="fa fa-google" />
                </a>
              </div>
              <div className="flex-col-c p-t-155">
                {/* <span className="txt1 p-b-17">Or Sign Up Using</span>
                <a href="#" className="txt2">
                  Sign Up
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1" />
    </div>
  );
};

export default Login;
