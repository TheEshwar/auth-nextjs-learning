"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
	const router = useRouter();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log("after login response :- ", response);
			toast.success("Login success");
			router.push("/profile");
		} catch (error: any) {
			console.log("Login failed :- ", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex">
			<h1 className="text-center bg-purple-200">Login</h1>
			<h1></h1>

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

			<button onClick={onLogin}>Login</button>
			<Link href="/signup">Sign up</Link>
		</div>
	);
}
