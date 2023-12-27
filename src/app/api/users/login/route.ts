import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		console.log("req body :- ", reqBody);

		// check if user exists
		const user = await User.findOne({ email });
        console.log("found user :- ", user);
		if (!user) {
			return NextResponse.json(
				{ error: "User does not exists" },
				{ status: 400 }
			);
		}

		// check if password is correct
		const validatePassword = await bcryptjs.compare(
			password,
			user.password
		);

		if (!validatePassword) {
			return NextResponse.json(
				{ error: "Invalid password" },
				{ status: 400 }
			);
		}

		// create token data
		const tokenData = {
			id: user.id,
			username: user.username,
			email: user.email,
		};

		//create token
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json({
			message: "Login successful",
			success: true,
		});

		response.cookies.set("token", token, { httpOnly: true});

        return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
