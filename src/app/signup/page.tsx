"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
	const router = useRouter();
	const [user, setUser] = useState({
		email: "",
		password: "",
		username: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const signup = async () => {
		try {
			setLoading(true);
			const response = axios.post("/api/users/signup", user);
			console.log("Sign up process :- ", response);
			router.push("/login");
		} catch (error: any) {
			console.log("Sign up error :- ", error);

			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.username.length > 0 &&
			user.password.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex">
			<h1 className="text-center bg-purple-200">
				{loading ? "Saving" : "Sign up"}
			</h1>
			<h1></h1>

			<label htmlFor="username">Username</label>
			<input
				type="text"
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder="user name"
			/>
			<br />
			<label htmlFor="email">Email</label>
			<input
				type="text"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				placeholder="Email"
			/>
			<br />
			<label htmlFor="password">Password</label>
			<input
				type="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder="Password"
			/>

			<br />

			<button onClick={signup}>
				{buttonDisabled ? "No sign up" : "Sign up"}
			</button>
			<Link href="/login">Login</Link>
		</div>
	);
}
