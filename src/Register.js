import {useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {v4 as uuid} from "uuid";

const USER_REGEX = /^[A-z][A-z0-9-_]{0,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

const Register = () => {
	
	const userRef = useRef();
	const errRef = useRef();

	const [student, setStudent] = useState([]);
	
	const [userName, setUserName] = useState('');
	const [validUserName,setValidUserName] = useState(false);
	const [userNameFocus, setUserNameFocus] = useState(false);

	const [user, setUser] = useState('');
	const [validName,setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [lastName, setLastName] = useState('');
	const [validLastName,setValidLastName] = useState(false);
	const [lastNameFocus, setLastNameFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail,setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd,setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch,setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		const result = USER_REGEX.test(userName);
		setValidUserName(result);
	}, [userName])

	useEffect(() => {
		const result = USER_REGEX.test(user);
		setValidName(result);
	}, [user])

	useEffect(() => {
		const result = USER_REGEX.test(lastName);
		setValidLastName(result);
	})

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	})

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
		const match = pwd === matchPwd;
		setValidMatch(match);
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg('');
	}, [user, lastName, email, pwd, matchPwd])

	useEffect(() => {
		if(localStorage.getItem("Students") !== null){
			if(student.length !== 0){
				const existingStudentData = JSON.parse(localStorage.getItem("Students"));
				existingStudentData.push(student);
				localStorage.setItem("Students", JSON.stringify(existingStudentData));
			}else{
				return;
			}
		}else{
			if(student !== undefined){
				const studentData = JSON.stringify(student);
				localStorage.setItem("Students", studentData );
			}else{
				return;
			}
			
		}

		
	}, [student])

	const addStudent = (e) => {
		e.preventDefault();
		const newStudent = {
			studentID: uuid(),
			studentUserName: e.target.username.value,
			studentName: e.target.name.value,
			studentLastName: e.target.userlastname.value,
			studentFullName: e.target.name.value + " " + e.target.userlastname.value, 
			studentEmail: e.target.useremail.value,
			studentPassword: e.target.password.value,
		}
		setStudent(newStudent);
		
		e.target.username.value ="";
		e.target.name.value ="";
		e.target.userlastname.value = "";
		e.target.useremail.value = "";
		e.target.password.value = "";
		e.target.confirm_pwd.value = "";
		setUserName("");
		setUser("");
		setLastName("");
		setEmail("");
		setPwd("");
		setMatchPwd("");
		
		//hack check
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		const v3 = EMAIL_REGEX.test(email);
		if(!v1 || !v2 || !v3) {
			setErrMsg("Invalid entry");
			return;
		}
	}

	

	return(
		<div className="register">
			<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

			<h1>Student Registration</h1>
			<form onSubmit={addStudent}>

				<label htmlFor="username">
					Username: 
					<span className={validUserName ? "valid" : "hide"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validUserName || !userName ? "hide" : "invalid"}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					className="inputArea textInput"
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setUserName(e.target.value)}required
					aria-invalid={validName ? "false" : "true"}
					aria-describedby="uidnote"
					onFocus={() => setUserNameFocus(true)}
					onBlur={() => setUserNameFocus(false)}
				/>
				<p id="uidnote" className={userNameFocus && userName && !validUserName ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters.<br/>
					Must begin with a letter.<br/>
					Letters, numbers, underscores, hyphens allowed.
				</p>
				
				<label htmlFor="name">
					First name: 
					<span className={validName ? "valid" : "hide"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validName || !user ? "hide" : "invalid"}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					className="inputArea textInput"
					type="text"
					id="name"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setUser(e.target.value)}required
					aria-invalid={validName ? "false" : "true"}
					aria-describedby="uidnote"
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
				/>
				<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters.<br/>
					Must begin with a letter.<br/>
					Letters, numbers, underscores, hyphens allowed.
				</p>

				<label htmlFor="userlastname">
					Last name: 
					<span className={validLastName ? "valid" : "hide"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validLastName || !lastName ? "hide" : "invalid"}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					className="inputArea textInput"
					type="text"
					id="userlastname"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setLastName(e.target.value)}required
					aria-invalid={validLastName ? "false" : "true"}
					aria-describedby="uidnote"
					onFocus={() => setLastNameFocus(true)}
					onBlur={() => setLastNameFocus(false)}
				/>
				<p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters.<br/>
					Must begin with a letter.<br/>
					Letters, numbers, underscores, hyphens allowed.
				</p>

				<label htmlFor="useremail">
					Email: 
					<span className={validEmail ? "valid" : "hide"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validEmail || !email ? "hide" : "invalid"}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					className="inputArea"
					type="email"
					id="useremail"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setEmail(e.target.value)}required
					aria-invalid={validEmail ? "false" : "true"}
					aria-describedby="emailnote"
					onFocus={() => setEmailFocus(true)}
					onBlur={() => setEmailFocus(false)}
				/>
				<p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					More than 2 characters.<br/>
					Must include at symbol(@) and a domain.<br/>
					Letters, numbers, underscores, hyphens allowed.
				</p>

				<label htmlFor="password">
					Password: 
					<span className={validPwd ? "valid" : "hide"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validPwd || !pwd ? "hide" : "invalid"}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					className="inputArea"
					type="password"
					id="password"
					onChange={(e) => setPwd(e.target.value)}required
					aria-invalid={validPwd ? "false" : "true"}
					aria-describedby="pwdnote"
					onFocus={() => setPwdFocus(true)}
					onBlur={() => setPwdFocus(false)}
				/>
				<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					8 to 24 characters.<br/>
					Must include uppercase and lowercase letters,<br/> a number and a special character.<br/>
					Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span>  <span aria-label="hashtag">#</span>  <span aria-label="percent">%</span>
				</p>

				
				<label htmlFor="confirm_pwd">
					Confirm password: 
					<span className={validMatch && matchPwd ? "valid" : "hide"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validMatch || !matchPwd ? "hide" : "invalid"}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					className="inputArea"
					type="password"
					id="confirm_pwd"
					onChange={(e) => setMatchPwd(e.target.value)}required
					aria-invalid={validMatch ? "false" : "true"}
					aria-describedby="confirmnote"
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
				/>
				<p id="pwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					Must match the first password input field.
				</p>

				<button type="Submit" disabled={!validName || !validPwd || !validMatch ? true : false}>Submit</button>
			</form>
			<Link to="/list"><span><FontAwesomeIcon className="ListLink" icon={faList}/></span></Link>
		</div>
	)
}

export default Register