import React from "react";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Link, useSearchParams } from "react-router-dom";

const StudentList = () => {

	const students = JSON.parse(localStorage.getItem("Students"));
	const [availableStudents, setAvailabeleStudents] = useState(students);
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get('name') || '';

	const handleSearch = event => {
		const name = event.target.value;

		if(name){
			setSearchParams({name});
		}else{
			setSearchParams({});
		}
	}

	const removeStudent = (index) => {
		students.splice(index,1);
		localStorage.setItem("Students", JSON.stringify(students));
		setAvailabeleStudents(JSON.parse(localStorage.getItem("Students")));
	}

	
	if(!students.length){
		return(
			<div>
				<h1>Sorry, there are no students added</h1>
				<Link to="/"><span>Back to Register</span></Link>
			</div>
		);
	}else{
		return(
		<div className="st-list">
			<div className="box">
				<input 
					className="search"
					type="text" 
					defaultValue = {search}
					onChange={handleSearch}
				/>
				<i><FontAwesomeIcon icon={faSearch}/></i>
			</div>
			<div className="container">
				<ul>
					<li className="tableHeader">
						<li className="col col-1">Username</li>
						<li className="col col-2">Name</li>
						<li className="col col-3">Last name</li>
						<li className="col col-4">Email</li>
						<li className="col col-5">Password</li>
						<li className="col col-6">Edit</li>
						<li className="col col-7">Delete</li>
					</li>
					{availableStudents.filter((val) => {
						if(search == ""){
							return val
						}else if(val.studentFullName.toLowerCase().includes(search.toLowerCase())){
							return val
						}
					}).map((student, i) => (
					<li className="tableRow" key={i}>
						<li className="col col-1">{student.studentUserName}</li>
						<li className="col col-2">{student.studentName}</li>
						<li className="col col-3">{student.studentLastName}</li>
						<li className="col col-4">{student.studentEmail}</li>
						<li className="col col-5">{student.studentPassword}</li>
						<Link to={`/List/${student.studentID}`}><li className="col col-6"><span className="IconButton"><FontAwesomeIcon icon={faUserPen}/></span></li></Link>
						<li className="col col-7 delete-button" onClick={() => removeStudent(i)}><span className="IconButton"><FontAwesomeIcon icon={faTrash}/></span></li>
					</li>
					))}
				</ul>
			</div>
			<Link to="/"><span className="back-to-registration">Back to registration</span></Link>
		</div>
	);
	}
	
};

export default StudentList;