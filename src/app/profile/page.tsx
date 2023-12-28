"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
	const router = useRouter();
	const [userData, setUserData] = useState({})

	const handleLogout = async () => {
		try {
			const response = await axios.get("/api/users/logout");
			toast.success("Logout successfully");
			router.push("/login")
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const getUserDetails = async () =>{
		const res = await axios.get('/api/users/me');
		console.log("getuserDetails() res :- ", res.data.data.username);
		setUserData(res.data.data);
	}
	return (
		<>
			<h1>Profile page</h1>
			<h3>{userData 
			? <Link href={`/profile/${userData._id}`} >{userData.username}</Link> 
			: "no data found"}</h3>

			<button onClick={handleLogout}>Logout</button>
			<button onClick={getUserDetails}>User Details</button>
		</>
	);
}
