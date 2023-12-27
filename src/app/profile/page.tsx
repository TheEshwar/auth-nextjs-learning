"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
	const router = useRouter();
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
	return (
		<>
			<h1>Profile page</h1>
			<button onClick={handleLogout}>Logout</button>
		</>
	);
}
