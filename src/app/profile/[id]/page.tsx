import Link from "next/link";

export default function UserProfile({ params }: any) {
	return (
		<>
			<h1>User Profile</h1>
            <h3>Params id :- {params.id}</h3>
			<Link href={'/profile'} >Back</Link>
		</>
	);
}
